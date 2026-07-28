package service

import (
	"errors"
	"fmt"

	"gorm.io/gorm"

	"share-go/internal/model"
	"share-go/internal/utils"
)

// ShareService 对齐 Spring ShareServiceImpl
type ShareService struct {
	DB *gorm.DB
}

// FindShareList 分页查询分享列表，对齐 findShareList
func (s *ShareService) FindShareList(page, size int, key string) (*model.PageResult, error) {
	if page <= 0 {
		page = 1
	}
	if size <= 0 {
		size = 20
	}
	if size > 100 {
		size = 100
	}
	q := s.DB.Model(&model.Share{})
	if key != "" {
		q = q.Where("data LIKE ?", "%"+key+"%")
	}
	var total int64
	if err := q.Count(&total).Error; err != nil {
		return nil, err
	}
	var content []model.Share
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

// GetShareById 按 id 查询
func (s *ShareService) GetShareById(id int64) (*model.Share, error) {
	var sh model.Share
	err := s.DB.First(&sh, id).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}
	return &sh, nil
}

// GetShareByUrl 按 url 查询
func (s *ShareService) GetShareByUrl(url string) (*model.Share, error) {
	var sh model.Share
	err := s.DB.Where("url = ?", url).First(&sh).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}
	return &sh, nil
}

// Save 新建分享，对齐 ShareServiceImpl.save（id 必须为空，editType 必须 0 或 1）
func (s *ShareService) Save(sh *model.Share) error {
	if sh.ID != nil {
		return fmt.Errorf("保存失败！")
	}
	et := -1
	if sh.EditType != nil {
		et = *sh.EditType
	}
	if et != 0 && et != 1 {
		return fmt.Errorf("编辑器格式设置错误！")
	}
	now := utils.NowMillis()
	sh.CreateTime = &now
	return s.DB.Create(sh).Error
}

// Delete 删除分享，对齐 ShareServiceImpl.delete
func (s *ShareService) Delete(sh *model.Share) int {
	if sh.ID == nil || *sh.ID < 0 {
		return model.StatusErrorShareId
	}
	s.DB.Delete(&model.Share{}, *sh.ID)
	return model.StatusSuccess
}

// Update 更新分享，对齐 ShareServiceImpl.update
func (s *ShareService) Update(sh *model.Share) error {
	return s.DB.Save(sh).Error
}

func totalPages(total int64, size int) int {
	if size <= 0 {
		return 0
	}
	p := int(total) / size
	if int(total)%size != 0 {
		p++
	}
	return p
}
