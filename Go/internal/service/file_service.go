package service

import (
	"io"
	"mime"
	"path"
	"strconv"
	"strings"

	"gorm.io/gorm"
	"mime/multipart"
	"os"

	"share-go/internal/cache"
	"share-go/internal/model"
	"share-go/internal/utils"
)

// FileService 对齐 Spring FileRepositoryInLocalDiskImpl + FileController 相关业务
type FileService struct {
	DB      *gorm.DB
	AesKey  string
	IpCache *cache.IpCache
	MaxFileMB int64
}

// DiskMessage 返回单例磁盘信息，对齐 fileRepository.diskMessage()
func (s *FileService) DiskMessage() (*model.DiskMessage, error) {
	var dm model.DiskMessage
	if err := s.DB.First(&dm, 1).Error; err != nil {
		return nil, err
	}
	return &dm, nil
}

// LoadAll 分页查询文件列表，对齐 fileRepository.loadAll
func (s *FileService) LoadAll(page, size int) (*model.PageResult, error) {
	if page <= 0 {
		page = 1
	}
	if size <= 0 {
		size = 20
	}
	if size > 100 {
		size = 100
	}
	q := s.DB.Model(&model.FileMessage{})
	var total int64
	if err := q.Count(&total).Error; err != nil {
		return nil, err
	}
	var content []model.FileMessage
	if err := q.Order("create_time DESC").Offset((page - 1) * size).Limit(size).Find(&content).Error; err != nil {
		return nil, err
	}
	return &model.PageResult{
		Content: content,
		Page: model.PageMeta{
			Size:          size,
			Number:        page - 1,
			TotalElements: total,
			TotalPages:    totalPages(total, size),
		},
	}, nil
}

// Save 上传文件，对齐 FileRepositoryInLocalDiskImpl.save，返回 VditorFiles
func (s *FileService) Save(files []*multipart.FileHeader) model.VditorFiles {
	succMap := map[string]string{}
	errFiles := []string{}
	for _, fh := range files {
		dir := utils.FilePath()
		filename := utils.NewFilename(fh.Filename)
		if err := utils.MkdirAll(dir); err != nil {
			errFiles = append(errFiles, fh.Filename)
			continue
		}
		src, err := fh.Open()
		if err != nil {
			errFiles = append(errFiles, fh.Filename)
			continue
		}
		dstPath := utils.OsPath(path.Join(dir, filename))
		dst, err := os.Create(dstPath)
		if err != nil {
			src.Close()
			errFiles = append(errFiles, fh.Filename)
			continue
		}
		if _, err := copyFile(dst, src); err != nil {
			src.Close()
			dst.Close()
			errFiles = append(errFiles, fh.Filename)
			continue
		}
		src.Close()
		dst.Close()

		url := "/api/upload/" + path.Join(dir, filename)
		now := utils.NowMillis()
		size := fh.Size
		fm := model.FileMessage{
			CreateTime:     &now,
			Path:           url,
			Filename:       filename,
			Size:           &size,
			UploadFilename: fh.Filename,
			Date:           utils.FileDate(),
		}
		// 更新磁盘占用
		var dm model.DiskMessage
		if err := s.DB.First(&dm, 1).Error; err == nil {
			if dm.AvailableDisk != nil {
				*dm.AvailableDisk -= size
			}
			if dm.UserDisk != nil {
				*dm.UserDisk += size
			} else {
				dm.UserDisk = &size
			}
			s.DB.Save(&dm)
		}
		s.DB.Create(&fm)
		succMap[fh.Filename] = url
	}
	return model.VditorFiles{
		Msg:  "上传成功",
		Code: 0,
		Data: map[string]interface{}{"succMap": succMap, "errFiles": errFiles},
	}
}

// Load 打开磁盘文件，对齐 fileRepository.load（location.resolve(filePath)，ROOT 根目录）
func (s *FileService) Load(relPath string) (*os.File, error) {
	return os.Open(utils.OsPath(path.Join(utils.ROOT, relPath)))
}

// ContentType 根据文件名推断 MIME，对齐 request.getServletContext().getMimeType
func ContentType(filename string) string {
	ext := path.Ext(filename)
	if ext == "" {
		return "application/octet-stream"
	}
	if t := mime.TypeByExtension(ext); t != "" {
		return t
	}
	return "application/octet-stream"
}

// Delete 删除文件，对齐 fileRepository.delete
func (s *FileService) Delete(fm *model.FileMessage) int {
	if fm.ID == nil {
		return model.StatusErrorFileId
	}
	var sys model.FileMessage
	if err := s.DB.First(&sys, *fm.ID).Error; err != nil {
		return model.StatusErrorFileId
	}
	size := int64(0)
	if sys.Size != nil {
		size = *sys.Size
	}
	s.DB.Delete(&model.FileMessage{}, *fm.ID)
	relPath := path.Join(utils.ROOT, sys.Date, sys.Filename)
	if err := os.Remove(utils.OsPath(relPath)); err == nil {
			var dm model.DiskMessage
			if err := s.DB.First(&dm, 1).Error; err == nil {
				if dm.AvailableDisk != nil {
					*dm.AvailableDisk += size
				}
				if dm.UserDisk != nil {
					*dm.UserDisk -= size
				}
				s.DB.Save(&dm)
			}
			// 删除空文件夹
			dir := utils.OsPath(path.Join(utils.ROOT, sys.Date))
			entries, err := os.ReadDir(dir)
			if err == nil && len(entries) == 0 {
				os.Remove(dir)
			}
	}
	return model.StatusSuccess
}

// Rename 重命名，对齐 fileRepository.rename
func (s *FileService) Rename(fm *model.FileMessage) int {
	if fm.ID == nil {
		return model.StatusErrorFileId
	}
	var sys model.FileMessage
	if err := s.DB.First(&sys, *fm.ID).Error; err != nil {
		return model.StatusErrorFileId
	}
	suffix := utils.GetFileSuffix(fm.UploadFilename)
	if suffix == "" {
		sys.UploadFilename = fm.UploadFilename + utils.GetFileSuffix(sys.Filename)
	} else {
		sys.UploadFilename = fm.UploadFilename
	}
	s.DB.Save(&sys)
	return model.StatusSuccess
}

// UploadFileMax 修改上传限制/编辑器类型，对齐 fileRepository.uploadFileMax
func (s *FileService) UploadFileMax(dm *model.DiskMessage) string {
	if dm.UploadFileMax == nil {
		return "提交数据错误，请检查后重试！"
	}
	max := *dm.UploadFileMax
	if max <= 0 {
		return "文件大小限制不能小于 0, 修改失败！"
	}
	if s.MaxFileMB > 0 && max > s.MaxFileMB {
		return "超过后台设置最大值！修改失败！"
	}
	if dm.EditType == nil || (*dm.EditType != 0 && *dm.EditType != 1) {
		return "提交编辑器格式错误，请检查后重试！"
	}
	var cur model.DiskMessage
	if err := s.DB.First(&cur, 1).Error; err != nil {
		return "修改失败！"
	}
	cur.UploadFileMax = &max
	cur.EditType = dm.EditType
	s.DB.Save(&cur)
	return "修改成功！"
}

// CheckSeePower 下载鉴权，对齐 FileController.checkSeePower
func (s *FileService) CheckSeePower(key, ip string, loggedIn bool) bool {
	if key != "" {
		de := utils.Decrypt(key, s.AesKey)
		if de == "" {
			return false
		}
		sp := strings.SplitN(de, "#", 2)
		if len(sp) != 2 {
			return false
		}
		start, err := strconv.ParseInt(sp[0], 10, 64)
		if err != nil {
			return false
		}
		if utils.NowMillis()-start <= model.OneHour && ip == sp[1] {
			return true
		}
		return false
	}
	if _, ok := s.IpCache.Get(ip); ok {
		return true
	}
	return loggedIn
}

func copyFile(dst *os.File, src multipart.File) (int64, error) {
	return io.Copy(dst, src)
}
