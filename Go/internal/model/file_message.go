package model

// FileMessage 对齐 Spring com.buguagaoshu.share.domain.FileMessage（表 file_table）
type FileMessage struct {
	ID                     *int64 `gorm:"primaryKey;autoIncrement;column:id" json:"id"`
	UploadFilename         string `gorm:"column:upload_filename" json:"uploadFilename"`
	Filename               string `gorm:"column:filename" json:"filename"`
	Size                   *int64 `gorm:"column:size" json:"size"`
	Path                   string `gorm:"column:path" json:"path"`
	Date                   string `gorm:"column:date" json:"date"`
	CreateTime             *int64 `gorm:"column:create_time" json:"createTime"`
	PublicUser             *bool  `gorm:"column:public_user" json:"publicUser"`
	Url                    string `gorm:"column:url" json:"url"`
	UserSeeKey             string `gorm:"column:user_see_key" json:"userSeeKey"`
	HaveUserSeeKey         bool   `gorm:"column:have_user_see_key;default:false" json:"haveUserSeeKey"`
	CreatePublicShareUserId *int64 `gorm:"column:create_public_share_user_id" json:"createPublicShareUserId"`
}

func (FileMessage) TableName() string { return "file_table" }
