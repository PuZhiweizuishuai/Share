package service

import (
	"gorm.io/gorm"

	"share-go/internal/model"
	"share-go/internal/utils"
)

// ViewCountService 对齐 Spring ViewCountServiceImpl
type ViewCountService struct {
	DB            *gorm.DB
	SearchIp      func(string) string
	OpenIpAddress bool
}

// FindByShareViewLog 分页查询访问日志，对齐 findByShareViewLog
func (s *ViewCountService) FindByShareViewLog(targetId int64, logType, page, size int) (*model.PageResult, error) {
	if page <= 0 {
		page = 1
	}
	if size <= 0 {
		size = 20
	}
	if size > 100 {
		size = 100
	}
	q := s.DB.Model(&model.ViewCountLog{}).Where("target_id = ? AND type = ?", targetId, logType)
	var total int64
	if err := q.Count(&total).Error; err != nil {
		return nil, err
	}
	var content []model.ViewCountLog
	if err := q.Order("view_time DESC").Offset((page - 1) * size).Limit(size).Find(&content).Error; err != nil {
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

// AddViewCountLog 记录访问日志，对齐 addViewCountLog
func (s *ViewCountService) AddViewCountLog(logType int, targetId int64, ip, ua string) {
	log := model.ViewCountLog{
		Type:     &logType,
		Ip:       ip,
		Ua:       ua,
		TargetId: &targetId,
		ViewTime: utils.Int64Ptr(utils.NowMillis()),
	}
	if s.OpenIpAddress && s.SearchIp != nil {
		if city := s.SearchIp(ip); city != "" {
			log.City = city
		}
	}
	s.DB.Create(&log)
}
