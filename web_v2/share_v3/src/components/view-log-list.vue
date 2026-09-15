<template>
  <div class="view-log">
    <!-- 统计栏 -->
    <div class="view-log__summary">
      <v-icon size="18" icon="mdi-eye-outline"></v-icon>
      <span>
        这份分享已被查看 <strong>{{ total }}</strong> 次
      </span>
    </div>

    <!-- 加载骨架 -->
    <template v-if="loading">
      <v-skeleton-loader
        v-for="i in 5"
        :key="i"
        type="list-item-two-line"
        class="mb-2 sk"
        rounded="lg"
      />
    </template>

    <template v-else>
      <!-- 日志列表 -->
      <template v-if="viewList.length > 0">
        <div v-for="(item, index) in viewList" :key="index" class="log-row">
          <div class="log-row__icon">
            <v-icon size="18" icon="mdi-earth"></v-icon>
          </div>
          <div class="log-row__body">
            <div class="log-row__main">
              <span class="log-ip">{{ item.ip }}</span>
              <span v-if="item.city" class="log-city">
                <v-icon size="12" icon="mdi-map-marker-outline"></v-icon>
                {{ item.city }}
              </span>
            </div>
            <div class="log-row__sub">
              <v-tooltip location="top" :text="item.ua || '未知设备'">
                <template v-slot:activator="{ props }">
                  <span v-bind="props">{{ parseUa(item.ua) }}</span>
                </template>
              </v-tooltip>
            </div>
          </div>
          <div class="log-row__time">{{ formatShort(item.viewTime) }}</div>
        </div>
      </template>

      <!-- 空状态 -->
      <div v-else class="log-empty">
        <v-icon icon="mdi-eye-off-outline" size="44" class="log-empty__icon"></v-icon>
        <div class="log-empty__text">还没有人查看过这份分享</div>
      </div>

      <!-- 分页 -->
      <div v-if="pageCount > 1" class="text-center mt-4">
        <v-pagination
          color="blue"
          v-model="page"
          :length="pageCount"
          :total-visible="5"
          rounded="circle"
          @update:modelValue="pageChange"
        />
      </div>
    </template>

    <v-snackbar
      v-model="snackbar"
      :color="'success'"
      :timeout="3000"
      :top="true"
    >
      {{ message }}
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: 'viewLogTable',
  props: {
    types: {
      type: Number,
      default: () => {
        return 0
      }
    },
    target: {
      type: Number,
      default: () => {
        return 0
      }
    },
  },
  data() {
    return {
      viewList: [],
      page: 1,
      size: 15,
      type: this.types,
      targetId: this.target,
      total: 0,
      pageCount: 0,
      loading: true,
      snackbar: false,
      message: ''
    }
  },
  created() {
    this.getViewList()
  },
  methods: {
    pageChange(data) {
      this.loading = true
      this.page = data
      this.getViewList()
    },
    getViewList() {
      this.httpGet(`/admin/viewlog/list?type=${this.type}&targetId=${this.targetId}&page=${this.page}&size=${this.size}`, (json)=>{
        if (json.status === 200) {
          this.viewList = json.data.content
          this.total = json.data.page.totalElements
          this.pageCount = json.data.page.totalPages
          this.loading = false
        } else {
          //
          this.loading = false
        }
      })
    },
    // 从 UA 中解析出浏览器与操作系统简称
    parseUa(ua) {
      if (!ua) {
        return '未知设备'
      }
      let browser = ''
      if (ua.includes('MicroMessenger')) {
        browser = '微信'
      } else if (ua.includes('QQBrowser')) {
        browser = 'QQ浏览器'
      } else if (ua.includes('Edg/')) {
        browser = 'Edge'
      } else if (ua.includes('OPR/') || ua.includes('Opera')) {
        browser = 'Opera'
      } else if (ua.includes('Firefox/')) {
        browser = 'Firefox'
      } else if (ua.includes('Chrome/')) {
        browser = 'Chrome'
      } else if (ua.includes('Safari/')) {
        browser = 'Safari'
      }
      let os = ''
      if (ua.includes('Windows')) {
        os = 'Windows'
      } else if (ua.includes('Android')) {
        os = 'Android'
      } else if (/iPhone|iPad|iPod/.test(ua)) {
        os = 'iOS'
      } else if (ua.includes('Mac OS X')) {
        os = 'macOS'
      } else if (ua.includes('Linux')) {
        os = 'Linux'
      }
      const text = [os, browser].filter(Boolean).join(' · ')
      return text || '未知设备'
    },
    formatShort(date) {
      if (date === '' || date == null) {
        return ''
      }
      const da = new Date(date)
      const pad = (n) => (n < 10 ? '0' + n : '' + n)
      return (
        da.getFullYear() +
        '-' +
        pad(da.getMonth() + 1) +
        '-' +
        pad(da.getDate()) +
        ' ' +
        pad(da.getHours()) +
        ':' +
        pad(da.getMinutes())
      )
    },
  }
};
</script>

<style scoped>
/* ===== 统计栏 ===== */
.view-log__summary {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 999px;
  background: rgba(var(--v-theme-primary), 0.08);
  color: rgba(0, 0, 0, 0.65);
  font-size: 13px;
  margin-bottom: 12px;
}

.view-log__summary strong {
  color: rgb(var(--v-theme-primary));
  font-size: 15px;
}

.sk {
  border: 1px solid rgba(0, 0, 0, 0.06);
}

/* ===== 日志行 ===== */
.log-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  margin-bottom: 8px;
  transition: border-color 0.2s ease, background-color 0.2s ease;
}

.log-row:hover {
  border-color: rgba(25, 118, 210, 0.3);
  background: rgba(var(--v-theme-primary), 0.03);
}

.log-row__icon {
  flex-shrink: 0;
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(var(--v-theme-primary), 0.08);
  color: rgb(var(--v-theme-primary));
}

.log-row__body {
  flex: 1;
  min-width: 0;
}

.log-row__main {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.log-ip {
  font-size: 13.5px;
  font-weight: 600;
  font-family: 'JetBrains Mono', Consolas, monospace;
  color: rgba(0, 0, 0, 0.8);
}

.log-city {
  display: inline-flex;
  align-items: center;
  gap: 3px;
  padding: 1px 8px;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.05);
  font-size: 12px;
  color: rgba(0, 0, 0, 0.55);
}

.log-row__sub {
  margin-top: 3px;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.4);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: default;
}

.log-row__time {
  flex-shrink: 0;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
  white-space: nowrap;
}

/* ===== 空状态 ===== */
.log-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 40px 16px;
  text-align: center;
  border: 1.5px dashed rgba(0, 0, 0, 0.12);
  border-radius: 12px;
}

.log-empty__icon {
  opacity: 0.35;
}

.log-empty__text {
  font-size: 13px;
  color: rgba(0, 0, 0, 0.45);
}

/* ===== 移动端适配 ===== */
@media (max-width: 600px) {
  .log-row {
    flex-wrap: wrap;
  }

  .log-row__time {
    margin-left: auto;
  }
}
</style>
