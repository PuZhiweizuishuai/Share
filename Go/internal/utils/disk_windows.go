//go:build windows

package utils

import (
	"syscall"
	"unsafe"
)

// DiskFreeSpace 返回指定路径所在分区的可用字节数，对齐 Java new File(path).getFreeSpace()
func DiskFreeSpace(path string) int64 {
	if path == "" {
		path = "."
	}
	// Windows 下需要根目录或卷根路径，GetDiskFreeSpaceEx 也接受任意目录路径
	var freeBytes uint64
	rootPtr, err := syscall.UTF16PtrFromString(path)
	if err != nil {
		return 0
	}
	// GetDiskFreeSpaceExEx: lpDirectoryName, lpFreeBytesAvailable, lpTotalNumberOfBytes, lpTotalNumberOfFreeBytes
	ret, _, _ := syscall.NewLazyDLL("kernel32.dll").NewProc("GetDiskFreeSpaceExW").Call(
		uintptr(unsafe.Pointer(rootPtr)),
		uintptr(unsafe.Pointer(&freeBytes)),
		uintptr(unsafe.Pointer(new(uint64))),
		uintptr(unsafe.Pointer(new(uint64))),
	)
	if ret == 0 {
		return 0
	}
	return int64(freeBytes)
}
