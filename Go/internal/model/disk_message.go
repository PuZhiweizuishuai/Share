package model

// DiskMessage 对齐 Spring com.buguagaoshu.share.domain.DiskMessage（表 disk_message，单例 id=1）
type DiskMessage struct {
	ID             int   `gorm:"primaryKey;column:id" json:"id"`
	UserDisk       *int64 `gorm:"column:user_disk" json:"userDisk"`
	AvailableDisk  *int64 `gorm:"column:available_disk" json:"availableDisk"`
	UploadFileMax  *int64 `gorm:"column:upload_file_max" json:"uploadFileMax"`
	EditType       *int   `gorm:"column:edit_type" json:"editType"`
}

func (DiskMessage) TableName() string { return "disk_message" }
