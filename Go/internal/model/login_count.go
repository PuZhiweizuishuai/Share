package model

// LoginCount 对齐 Spring com.buguagaoshu.share.domain.LoginCount（非持久化，仅内存）
type LoginCount struct {
	Ip       string
	Count    int
	StartTime int64
}
