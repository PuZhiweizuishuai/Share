package utils

import (
	"bytes"
	"crypto/aes"
	"crypto/sha256"
	"encoding/base64"
)

// 对齐 Spring com.buguagaoshu.share.utils.AesUtil：
// 密钥经 SHA-256 后取前 16 字节，AES/ECB/PKCS5Padding，Base64 输出。

// aesKey 由 secret 派生 16 字节密钥（SHA-256 截前 16 字节）
func aesKey(secret string) []byte {
	h := sha256.Sum256([]byte(secret))
	return h[:16]
}

// Encrypt 加密，对齐 AesUtil.encrypt
func Encrypt(strToEncrypt, secret string) string {
	key := aesKey(secret)
	block, err := aes.NewCipher(key)
	if err != nil {
		return ""
	}
	src := pkcs5Pad([]byte(strToEncrypt), block.BlockSize())
	dst := make([]byte, len(src))
	bs := block.BlockSize()
	for i := 0; i < len(src); i += bs {
		block.Encrypt(dst[i:i+bs], src[i:i+bs])
	}
	return base64.StdEncoding.EncodeToString(dst)
}

// Decrypt 解密，对齐 AesUtil.decrypt
func Decrypt(strToDecrypt, secret string) string {
	key := aesKey(secret)
	ciphertext, err := base64.StdEncoding.DecodeString(strToDecrypt)
	if err != nil {
		return ""
	}
	block, err := aes.NewCipher(key)
	if err != nil {
		return ""
	}
	if len(ciphertext)%block.BlockSize() != 0 {
		return ""
	}
	dst := make([]byte, len(ciphertext))
	bs := block.BlockSize()
	for i := 0; i < len(ciphertext); i += bs {
		block.Decrypt(dst[i:i+bs], ciphertext[i:i+bs])
	}
	out, err := pkcs5Unpad(dst)
	if err != nil {
		return ""
	}
	return string(out)
}

// pkcs5Pad PKCS#5/PKCS#7 填充
func pkcs5Pad(src []byte, blockSize int) []byte {
	pad := blockSize - len(src)%blockSize
	return append(src, bytes.Repeat([]byte{byte(pad)}, pad)...)
}

// pkcs5Unpad 去除填充
func pkcs5Unpad(src []byte) ([]byte, error) {
	n := len(src)
	if n == 0 {
		return nil, errInvalidPadding
	}
	pad := int(src[n-1])
	if pad <= 0 || pad > n {
		return nil, errInvalidPadding
	}
	return src[:n-pad], nil
}

var errInvalidPadding = &paddingError{}

type paddingError struct{}

func (e *paddingError) Error() string { return "invalid padding" }
