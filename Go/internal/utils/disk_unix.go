//go:build !windows

package utils

import "golang.org/x/sys/unix"

// DiskFreeSpace 返回指定路径所在分区的可用字节数，对齐 Java new File(path).getFreeSpace()
func DiskFreeSpace(path string) int64 {
	if path == "" {
		path = "."
	}
	var stat unix.Statfs_t
	if err := unix.Statfs(path, &stat); err != nil {
		return 0
	}
	return int64(stat.Bavail) * int64(stat.Bsize)
}
