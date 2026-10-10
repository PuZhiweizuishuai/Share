package utils

import (
	"fmt"
	"os"
	"path"
	"path/filepath"
	"regexp"
	"strings"
	"time"

	"github.com/google/uuid"
)

// 对齐 Spring com.buguagaoshu.share.utils.FilePathUtils
// ROOT 为文件存储根目录名
const ROOT = "file"

const dateFormat = "2006-01-02"

// dateDirPattern 限定上传目录名只能是 yyyy-MM-dd，杜绝 date 参数携带 ../ 等穿越片段
var dateDirPattern = regexp.MustCompile(`^\d{4}-\d{2}-\d{2}$`)

// IsValidDateDir 判断路径片段是否为合法的日期目录名
func IsValidDateDir(s string) bool { return dateDirPattern.MatchString(s) }

// ResolveUnderRoot 将 elem... 拼接并解析为绝对路径，保证结果仍位于 ROOT 目录内。
// 若发生路径穿越（如包含 ../ 逃逸出 ROOT）则返回 error，用于安全地按用户输入定位磁盘文件。
func ResolveUnderRoot(elem ...string) (string, error) {
	rootAbs, err := filepath.Abs(ROOT)
	if err != nil {
		return "", err
	}
	parts := append([]string{ROOT}, elem...)
	abs, err := filepath.Abs(filepath.Join(parts...))
	if err != nil {
		return "", err
	}
	if abs != rootAbs && !strings.HasPrefix(abs, rootAbs+string(os.PathSeparator)) {
		return "", fmt.Errorf("非法路径: %s", filepath.Join(elem...))
	}
	return abs, nil
}

// FilePath 返回相对存储目录（始终用 / 分隔），对齐 FilePathUtils.filePath() = ROOT/yyyy-MM-dd
func FilePath() string {
	return path.Join(ROOT, time.Now().Format(dateFormat))
}

// FileDate 返回当前日期字符串，对齐 FilePathUtils.fileDate()
func FileDate() string {
	return time.Now().Format(dateFormat)
}

// NewFilename 生成新文件名（uuid 去横线 + 原后缀小写），对齐 FilePathUtils.newFilename()
func NewFilename(original string) string {
	return strings.ReplaceAll(uuid.New().String(), "-", "") + GetFileSuffix(original)
}

// GetFileSuffix 取最后一个 . 及之后的小写后缀，无则空，对齐 FilePathUtils.getFileSuffix()
func GetFileSuffix(filename string) string {
	idx := strings.LastIndex(filename, ".")
	if idx <= 0 {
		return ""
	}
	return strings.ToLower(filename[idx:])
}

// OsPath 将 / 分隔的相对路径转为操作系统路径，用于实际磁盘读写
func OsPath(p string) string {
	return filepath.FromSlash(p)
}

// MkdirAll 按相对路径创建目录
func MkdirAll(rel string) error {
	return os.MkdirAll(OsPath(rel), 0o755)
}
