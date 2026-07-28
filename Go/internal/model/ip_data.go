package model

// IpData 对齐 Spring com.buguagaoshu.share.domain.IpData（表 ip_table，ip 为主键）
type IpData struct {
	Ip         string `gorm:"primaryKey;column:ip" json:"ip"`
	CreateUser string `gorm:"column:create_user" json:"createUser"`
	CreateTime *int64 `gorm:"column:create_time" json:"createTime"`
	ModifyTime *int64 `gorm:"column:modify_time" json:"modifyTime"`
	HasEnable  *int   `gorm:"column:has_enable" json:"hasEnable"`
}

func (IpData) TableName() string { return "ip_table" }
