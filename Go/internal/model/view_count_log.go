package model

// ViewCountLog 对齐 Spring com.buguagaoshu.share.domain.ViewCountLog（表 view_table）
type ViewCountLog struct {
	ID       *int64 `gorm:"primaryKey;autoIncrement;column:id" json:"id"`
	// 0 share, 1 file, 2 ai
	Type     *int   `gorm:"column:type" json:"type"`
	Ip       string `gorm:"column:ip" json:"ip"`
	City     string `gorm:"column:city" json:"city"`
	Ua       string `gorm:"column:ua" json:"ua"`
	TargetId *int64 `gorm:"column:target_id" json:"targetId"`
	ViewTime *int64 `gorm:"column:view_time" json:"viewTime"`
}

func (ViewCountLog) TableName() string { return "view_table" }
