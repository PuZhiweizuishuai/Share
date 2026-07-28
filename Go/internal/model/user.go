package model

// User 对齐 Spring com.buguagaoshu.share.domain.User（表 user_table）
type User struct {
	ID         int64  `gorm:"primaryKey;autoIncrement;column:id" json:"id"`
	Username   string `gorm:"column:username" json:"username"`
	Password   string `gorm:"column:password" json:"password"`
	Nickname   string `gorm:"column:nickname" json:"nickname"`
	Email      string `gorm:"column:email" json:"email"`
	CreateTime *int64 `gorm:"column:create_time" json:"createTime"`
	// OldPassword 对齐 @Transient，不持久化但出现在 JSON 响应中
	OldPassword string `gorm:"-" json:"oldPassword"`
}

func (User) TableName() string { return "user_table" }
