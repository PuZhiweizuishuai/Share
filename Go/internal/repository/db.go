package repository

import (
	"fmt"
	"os"
	"path/filepath"

	"github.com/glebarez/sqlite"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"

	"share-go/internal/config"
	"share-go/internal/model"
)

// InitDB 根据配置初始化 GORM DB 并执行 AutoMigrate
func InitDB(cfg *config.Config) (*gorm.DB, error) {
	var db *gorm.DB
	var err error
	gormCfg := &gorm.Config{
		Logger: logger.Default.LogMode(logger.Warn),
	}
	switch cfg.Database.Driver {
	case "mysql":
		db, err = gorm.Open(mysql.Open(cfg.Database.MySQL.DSN), gormCfg)
	default:
		// 确保 sqlite 数据目录存在
		if dir := filepath.Dir(cfg.Database.SQLite.Path); dir != "" && dir != "." {
			if mkErr := os.MkdirAll(dir, 0o755); mkErr != nil {
				return nil, fmt.Errorf("创建 sqlite 目录失败: %w", mkErr)
			}
		}
		// WAL 模式 + busy_timeout 提升并发
		dsn := cfg.Database.SQLite.Path + "?_pragma=journal_mode(WAL)&_pragma=busy_timeout(5000)"
		db, err = gorm.Open(sqlite.Open(dsn), gormCfg)
	}
	if err != nil {
		return nil, fmt.Errorf("打开数据库失败: %w", err)
	}

	sqlDB, err := db.DB()
	if err != nil {
		return nil, err
	}
	if cfg.Database.Driver != "mysql" {
		// SQLite 写串行，单连接避免 SQLITE_BUSY
		sqlDB.SetMaxOpenConns(1)
	} else {
		sqlDB.SetMaxIdleConns(10)
		sqlDB.SetMaxOpenConns(100)
	}

	if err := db.AutoMigrate(
		&model.User{},
		&model.Share{},
		&model.FileMessage{},
		&model.DiskMessage{},
		&model.IpData{},
		&model.Tag{},
		&model.ConfigData{},
		&model.ViewCountLog{},
	); err != nil {
		return nil, fmt.Errorf("数据库迁移失败: %w", err)
	}
	return db, nil
}
