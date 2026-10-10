package utils

import (
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"crypto/sha256"
	"encoding/base64"
	"io"
)

// 下载令牌/IP 绑定 key 的加解密。
// AES-256-GCM 认证加密：随机 12 字节 nonce，密文自带完整性校验（篡改即解密失败）。
// 密钥每次进程启动随机、令牌短时有效，故无需兼容历史密文，可安全替换旧 ECB 实现。

// aesKey 由 secret 派生 32 字节密钥（SHA-256 全量），对应 AES-256
func aesKey(secret string) []byte {
	h := sha256.Sum256([]byte(secret))
	return h[:]
}

// Encrypt 加密，返回 Base64(nonce||ciphertext||tag)
func Encrypt(strToEncrypt, secret string) string {
	block, err := aes.NewCipher(aesKey(secret))
	if err != nil {
		return ""
	}
	gcm, err := cipher.NewGCM(block)
	if err != nil {
		return ""
	}
	nonce := make([]byte, gcm.NonceSize())
	if _, err := io.ReadFull(rand.Reader, nonce); err != nil {
		return ""
	}
	sealed := gcm.Seal(nonce, nonce, []byte(strToEncrypt), nil)
	return base64.StdEncoding.EncodeToString(sealed)
}

// Decrypt 解密，任何解码/认证失败一律返回空串
func Decrypt(strToDecrypt, secret string) string {
	raw, err := base64.StdEncoding.DecodeString(strToDecrypt)
	if err != nil {
		return ""
	}
	block, err := aes.NewCipher(aesKey(secret))
	if err != nil {
		return ""
	}
	gcm, err := cipher.NewGCM(block)
	if err != nil {
		return ""
	}
	ns := gcm.NonceSize()
	if len(raw) < ns {
		return ""
	}
	nonce, ciphertext := raw[:ns], raw[ns:]
	plain, err := gcm.Open(nil, nonce, ciphertext, nil)
	if err != nil {
		return ""
	}
	return string(plain)
}
