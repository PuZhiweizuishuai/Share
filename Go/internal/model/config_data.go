package model

// ConfigData 对齐 Spring com.buguagaoshu.share.domain.ConfigData（表 config_table）
type ConfigData struct {
	ID            *int64 `gorm:"primaryKey;autoIncrement;column:id" json:"id"`
	Name          string `gorm:"column:name" json:"name"`
	ConfigMessage string `gorm:"column:config_message" json:"configMessage"`
	Type          *int   `gorm:"column:type" json:"type"`
	CreateTime    *int64 `gorm:"column:create_time" json:"createTime"`
	UpdateTime    *int64 `gorm:"column:update_time" json:"updateTime"`
}

func (ConfigData) TableName() string { return "config_table" }
