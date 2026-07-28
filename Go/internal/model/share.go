package model

// Share 对齐 Spring com.buguagaoshu.share.domain.Share（表 share_table）
type Share struct {
	ID         *int64 `gorm:"primaryKey;autoIncrement;column:id" json:"id"`
	Data       string `gorm:"column:data;type:longtext" json:"data"`
	CreateTime *int64 `gorm:"column:create_time" json:"createTime"`
	TagId      *int64 `gorm:"column:tag_id" json:"tagId"`
	// Boolean 装箱可空
	Lock       *bool  `gorm:"column:lock" json:"lock"`
	Password   string `gorm:"column:password" json:"password"`
	EditType   *int   `gorm:"column:edit_type" json:"editType"`
	PublicUser *bool  `gorm:"column:public_user" json:"publicUser"`
	Url        string `gorm:"column:url" json:"url"`
	// boolean 基本类型不可空
	HaveUserSeeKey bool `gorm:"column:have_user_see_key;default:false" json:"haveUserSeeKey"`
	UserSeeKey     string `gorm:"column:user_see_key" json:"userSeeKey"`
	CreatePublicShareUserId *int64 `gorm:"column:create_public_share_user_id" json:"createPublicShareUserId"`
	// Tag 对齐 @Transient
	Tag *Tag `gorm:"-" json:"tag"`
}

func (Share) TableName() string { return "share_table" }
