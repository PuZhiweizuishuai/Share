package service

import (
	"errors"

	"gorm.io/gorm"

	"share-go/internal/model"
	"share-go/internal/utils"
)

// UserService 对齐 Spring UserServiceImpl
type UserService struct {
	DB *gorm.DB
}

// Save 新建用户（密码加密），对齐 UserServiceImpl.save
func (s *UserService) Save(u *model.User) error {
	u.Password = utils.Encode(u.Password)
	return s.DB.Create(u).Error
}

// FindByUsername 按用户名查找，未找到返回 nil
func (s *UserService) FindByUsername(username string) (*model.User, error) {
	var u model.User
	err := s.DB.Where("username = ?", username).First(&u).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}
	return &u, nil
}

// Login 登录校验，成功返回 password 置空的用户
func (s *UserService) Login(u *model.User) (*model.User, error) {
	sys, err := s.FindByUsername(u.Username)
	if err != nil {
		return nil, err
	}
	if sys == nil {
		return nil, nil
	}
	if utils.JudgePassword(u.Password, sys.Password) {
		sys.Password = ""
		return sys, nil
	}
	return nil, nil
}

// ChangePassword 修改密码，需校验旧密码，对齐 UserServiceImpl.changePassword
func (s *UserService) ChangePassword(u *model.User) (*model.User, error) {
	if u.Password == "" {
		return nil, nil
	}
	sys, err := s.FindByUsername(u.Username)
	if err != nil {
		return nil, err
	}
	if sys == nil {
		return nil, nil
	}
	if utils.JudgePassword(u.OldPassword, sys.Password) {
		sys.Password = utils.Encode(u.Password)
		if err := s.DB.Save(sys).Error; err != nil {
			return nil, err
		}
		sys.Password = ""
		return sys, nil
	}
	return nil, nil
}
