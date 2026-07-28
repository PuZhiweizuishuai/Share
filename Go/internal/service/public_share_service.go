package service

import (
	"errors"

	"gorm.io/gorm"

	"share-go/internal/model"
	"share-go/internal/utils"
)

// PublicShareService 对齐 Spring PublicShareServiceImpl
type PublicShareService struct {
	DB           *gorm.DB
	ShareService *ShareService
	ViewCount    *ViewCountService
	AesKey       string
}

// PublicShare 创建公开分享，对齐 publicShare
func (s *PublicShareService) PublicShare(sh *model.Share, user *model.User) (*model.Share, error) {
	shareById, err := s.ShareService.GetShareById(*sh.ID)
	if err != nil {
		return nil, err
	}
	if shareById == nil {
		return nil, nil
	}
	shareById.CreatePublicShareUserId = &user.ID
	shareById.PublicUser = utils.BoolPtr(true)
	if sh.HaveUserSeeKey {
		shareById.UserSeeKey = sh.UserSeeKey
		shareById.HaveUserSeeKey = true
	} else {
		shareById.HaveUserSeeKey = false
	}
	shareById.Url = utils.NewUUID()
	if err := s.ShareService.Update(shareById); err != nil {
		return nil, err
	}
	shareById.UserSeeKey = ""
	return shareById, nil
}

// PublicFile 创建公开文件分享，对齐 publicFile
func (s *PublicShareService) PublicFile(fm *model.FileMessage, user *model.User) (*model.FileMessage, error) {
	var file model.FileMessage
	if err := s.DB.First(&file, *fm.ID).Error; err != nil {
		return nil, err
	}
	file.PublicUser = utils.BoolPtr(true)
	file.CreatePublicShareUserId = &user.ID
	if fm.HaveUserSeeKey {
		file.UserSeeKey = fm.UserSeeKey
		file.HaveUserSeeKey = true
	} else {
		file.HaveUserSeeKey = false
	}
	file.Url = utils.NewUUID()
	if err := s.DB.Save(&file).Error; err != nil {
		return nil, err
	}
	file.UserSeeKey = ""
	return &file, nil
}

// GetPublicShare 获取公开分享，对齐 getPublicShare
func (s *PublicShareService) GetPublicShare(url, password, ip, ua string) (*model.Share, error) {
	sh, err := s.ShareService.GetShareByUrl(url)
	if err != nil {
		return nil, err
	}
	if sh == nil || sh.PublicUser == nil || !*sh.PublicUser {
		return nil, nil
	}
	if sh.HaveUserSeeKey {
		if sh.UserSeeKey == password {
			s.ViewCount.AddViewCountLog(model.ViewLogTypeShare, idOf(sh.ID), ip, ua)
			sh.ID = nil
			sh.UserSeeKey = utils.Encrypt(utils.NowMillisStr()+"#"+ip, s.AesKey)
			return sh, nil
		}
		return nil, nil
	}
	s.ViewCount.AddViewCountLog(model.ViewLogTypeShare, idOf(sh.ID), ip, ua)
	sh.UserSeeKey = utils.Encrypt(utils.NowMillisStr()+"#"+ip, s.AesKey)
	sh.ID = nil
	return sh, nil
}

// GetPublicFile 获取公开文件，对齐 getPublicFile
func (s *PublicShareService) GetPublicFile(url, password, ip, ua string) (*model.FileMessage, error) {
	var file model.FileMessage
	err := s.DB.Where("url = ?", url).First(&file).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}
	if file.PublicUser == nil || !*file.PublicUser {
		return nil, nil
	}
	if file.HaveUserSeeKey {
		if password == file.UserSeeKey {
			s.ViewCount.AddViewCountLog(model.ViewLogTypeFile, idOf(file.ID), ip, ua)
			file.UserSeeKey = utils.Encrypt(utils.NowMillisStr()+"#"+ip, s.AesKey)
			file.ID = nil
			return &file, nil
		}
		return nil, nil
	}
	file.UserSeeKey = utils.Encrypt(utils.NowMillisStr()+"#"+ip, s.AesKey)
	s.ViewCount.AddViewCountLog(model.ViewLogTypeFile, idOf(file.ID), ip, ua)
	file.ID = nil
	return &file, nil
}

// CheckShare 检查公开分享是否存在，对齐 checkShare
func (s *PublicShareService) CheckShare(url string) (*model.Share, error) {
	sh, err := s.ShareService.GetShareByUrl(url)
	if err != nil {
		return nil, err
	}
	if sh == nil || sh.PublicUser == nil || !*sh.PublicUser {
		return nil, nil
	}
	return sh, nil
}

// CheckFile 检查公开文件是否存在，对齐 checkFile
func (s *PublicShareService) CheckFile(url string) (*model.FileMessage, error) {
	var file model.FileMessage
	err := s.DB.Where("url = ?", url).First(&file).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}
	if file.PublicUser == nil || !*file.PublicUser {
		return nil, nil
	}
	return &file, nil
}

// CancelPublicShare 取消公开分享，对齐 cancelpublicShare
func (s *PublicShareService) CancelPublicShare(sh *model.Share, user *model.User) (bool, error) {
	shareById, err := s.ShareService.GetShareById(*sh.ID)
	if err != nil {
		return false, err
	}
	if shareById == nil {
		return false, nil
	}
	shareById.PublicUser = utils.BoolPtr(false)
	shareById.Url = ""
	shareById.HaveUserSeeKey = false
	shareById.CreatePublicShareUserId = &user.ID
	shareById.UserSeeKey = ""
	if err := s.ShareService.Update(shareById); err != nil {
		return false, err
	}
	return true, nil
}

// CancelPublicFile 取消公开文件，对齐 cancelpublicFile
func (s *PublicShareService) CancelPublicFile(fm *model.FileMessage, user *model.User) (bool, error) {
	var file model.FileMessage
	if err := s.DB.First(&file, *fm.ID).Error; err != nil {
		return false, err
	}
	file.PublicUser = utils.BoolPtr(false)
	file.Url = ""
	file.HaveUserSeeKey = false
	file.CreatePublicShareUserId = &user.ID
	file.UserSeeKey = ""
	if err := s.DB.Save(&file).Error; err != nil {
		return false, err
	}
	return true, nil
}

func idOf(p *int64) int64 {
	if p == nil {
		return 0
	}
	return *p
}
