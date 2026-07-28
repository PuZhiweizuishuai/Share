package config

import (
	"os"

	"gopkg.in/yaml.v3"
)

// Config 全局配置，对齐 Spring application.yml 的 share.* 段
type Config struct {
	Server struct {
		Port int `yaml:"port"`
	} `yaml:"server"`
	Share struct {
		IsTheProxyConfigured bool   `yaml:"is-the-proxy-configured"`
		MaxLoginCount        int    `yaml:"max-login-count"`
		OpenIpAddress        bool   `yaml:"open-ip-address"`
		IpDbPath             string `yaml:"ip-db-path"`
		MaxFileSizeMB        int64  `yaml:"max-file-size-mb"`
	} `yaml:"share"`
	Database struct {
		Driver string `yaml:"driver"`
		SQLite struct {
			Path string `yaml:"path"`
		} `yaml:"sqlite"`
		MySQL struct {
			DSN string `yaml:"dsn"`
		} `yaml:"mysql"`
	} `yaml:"database"`
	Session struct {
		CookieName string `yaml:"cookie-name"`
	} `yaml:"session"`
}

// Load 从路径加载配置，path 为空时使用默认值
func Load(path string) (*Config, error) {
	c := defaultConfig()
	if path != "" {
		data, err := os.ReadFile(path)
		if err != nil {
			return nil, err
		}
		if err := yaml.Unmarshal(data, c); err != nil {
			return nil, err
		}
	}
	// 对齐 Spring MyConfigProperties 的 null 默认值逻辑
	if c.Share.MaxLoginCount <= 0 {
		c.Share.MaxLoginCount = 3
	}
	if c.Server.Port == 0 {
		c.Server.Port = 8081
	}
	if c.Session.CookieName == "" {
		c.Session.CookieName = "SHARE_SESSION"
	}
	if c.Share.MaxFileSizeMB <= 0 {
		c.Share.MaxFileSizeMB = 1024000000000
	}
	if c.Database.Driver == "" {
		c.Database.Driver = "sqlite"
	}
	if c.Database.SQLite.Path == "" {
		c.Database.SQLite.Path = "./data/share.db"
	}
	return c, nil
}

func defaultConfig() *Config {
	c := &Config{}
	c.Server.Port = 8081
	c.Share.IsTheProxyConfigured = false
	c.Share.MaxLoginCount = 3
	c.Share.OpenIpAddress = true
	c.Share.MaxFileSizeMB = 1024000000000
	c.Database.Driver = "sqlite"
	c.Database.SQLite.Path = "./data/share.db"
	c.Session.CookieName = "SHARE_SESSION"
	return c
}
