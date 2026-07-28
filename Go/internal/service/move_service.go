package service

import (
	"fmt"

	"gorm.io/gorm"
	"gorm.io/gorm/clause"

	"share-go/internal/model"
)

// MoveService 统一全表数据迁移，Spring 与 Go 两端对等
type MoveService struct {
	DB *gorm.DB
}

// ExportAll 导出全部数据库表，对齐 GET /api/admin/move/all
func (s *MoveService) ExportAll() (*model.MoveAllData, error) {
	data := &model.MoveAllData{}
	if err := s.DB.Find(&data.Users).Error; err != nil {
		return nil, err
	}
	if err := s.DB.Find(&data.Tags).Error; err != nil {
		return nil, err
	}
	if err := s.DB.Find(&data.Configs).Error; err != nil {
		return nil, err
	}
	if err := s.DB.Find(&data.Whitelist).Error; err != nil {
		return nil, err
	}
	if err := s.DB.Find(&data.ViewLogs).Error; err != nil {
		return nil, err
	}
	var dm model.DiskMessage
	if err := s.DB.First(&dm, 1).Error; err == nil {
		data.Disk = &dm
	}
	if err := s.DB.Find(&data.Share).Error; err != nil {
		return nil, err
	}
	if err := s.DB.Find(&data.File).Error; err != nil {
		return nil, err
	}
	return data, nil
}

// ImportAll 导入全部数据库表（upsert），整包事务；file 表导入后重算 userDisk。
// 对齐 POST /api/admin/move/all/save
func (s *MoveService) ImportAll(data *model.MoveAllData) error {
	return s.DB.Transaction(func(tx *gorm.DB) error {
		if len(data.Users) > 0 {
			if err := tx.Clauses(clause.OnConflict{UpdateAll: true}).Create(&data.Users).Error; err != nil {
				return fmt.Errorf("users: %w", err)
			}
		}
		if len(data.Tags) > 0 {
			if err := tx.Clauses(clause.OnConflict{UpdateAll: true}).Create(&data.Tags).Error; err != nil {
				return fmt.Errorf("tags: %w", err)
			}
		}
		if len(data.Configs) > 0 {
			if err := tx.Clauses(clause.OnConflict{UpdateAll: true}).Create(&data.Configs).Error; err != nil {
				return fmt.Errorf("configs: %w", err)
			}
		}
		if len(data.Whitelist) > 0 {
			if err := tx.Clauses(clause.OnConflict{UpdateAll: true}).Create(&data.Whitelist).Error; err != nil {
				return fmt.Errorf("whitelist: %w", err)
			}
		}
		if len(data.ViewLogs) > 0 {
			if err := tx.Clauses(clause.OnConflict{UpdateAll: true}).Create(&data.ViewLogs).Error; err != nil {
				return fmt.Errorf("viewlogs: %w", err)
			}
		}
		if data.Disk != nil {
			if err := tx.Clauses(clause.OnConflict{UpdateAll: true}).Create(data.Disk).Error; err != nil {
				return fmt.Errorf("disk: %w", err)
			}
		}
		if len(data.Share) > 0 {
			if err := tx.Clauses(clause.OnConflict{UpdateAll: true}).Create(&data.Share).Error; err != nil {
				return fmt.Errorf("share: %w", err)
			}
		}
		if len(data.File) > 0 {
			if err := tx.Clauses(clause.OnConflict{UpdateAll: true}).Create(&data.File).Error; err != nil {
				return fmt.Errorf("file: %w", err)
			}
		}
		// 重算 DiskMessage.userDisk = 全部文件 size 之和，对齐 /api/admin/move/file/save
		var sum int64
		for _, f := range data.File {
			if f.Size != nil {
				sum += *f.Size
			}
		}
		var dm model.DiskMessage
		if err := tx.First(&dm, 1).Error; err == nil {
			dm.UserDisk = &sum
			tx.Save(&dm)
		}
		return nil
	})
}

// RecomputeUserDisk 重新计算磁盘已用空间（全表 size 求和）
func (s *MoveService) RecomputeUserDisk() error {
	var sum int64
	var files []model.FileMessage
	if err := s.DB.Find(&files).Error; err != nil {
		return err
	}
	for _, f := range files {
		if f.Size != nil {
			sum += *f.Size
		}
	}
	var dm model.DiskMessage
	if err := s.DB.First(&dm, 1).Error; err != nil {
		return err
	}
	dm.UserDisk = &sum
	return s.DB.Save(&dm).Error
}
