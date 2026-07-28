package model

// Tag 对齐 Spring com.buguagaoshu.share.domain.Tag（表 tag_table）
type Tag struct {
	ID       *int64 `gorm:"primaryKey;autoIncrement;column:id" json:"id"`
	Title    string `gorm:"column:title" json:"title"`
	Lock     *bool  `gorm:"column:lock" json:"lock"`
	Password string `gorm:"column:password" json:"password"`
}

func (Tag) TableName() string { return "tag_table" }
