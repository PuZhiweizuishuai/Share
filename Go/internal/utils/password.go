package utils

import "golang.org/x/crypto/bcrypt"

// 对齐 Spring com.buguagaoshu.share.utils.PasswordUtil（BCryptPasswordEncoder，默认 cost 10）
// 与 Java BCrypt 生成的哈希互通。

// Encode 加密密码
func Encode(password string) string {
	b, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return ""
	}
	return string(b)
}

// JudgePassword 校验明文与哈希
func JudgePassword(rawPassword, encodedPassword string) bool {
	return bcrypt.CompareHashAndPassword([]byte(encodedPassword), []byte(rawPassword)) == nil
}
