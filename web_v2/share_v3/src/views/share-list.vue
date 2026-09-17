<template>
  <v-container fluid class="share-page">
    <div id="share-top" />

    <!-- 页面头部：统计信息 -->
    <div class="share-hero">
      <div class="share-hero__icon">
        <v-icon icon="mdi-text-box-multiple-outline" size="30"></v-icon>
      </div>
      <div class="share-hero__body">
        <div class="share-hero__label">我的分享</div>
        <h1 class="share-hero__title">文本分享列表</h1>
        <div class="share-hero__meta">
          <span class="meta-pill">
            <v-icon size="14" icon="mdi-text-box-multiple-outline"></v-icon>
            共 {{ total }} 条分享
          </span>
          <span v-if="length > 0" class="meta-pill">
            <v-icon size="14" icon="mdi-file-document-outline"></v-icon>
            第 {{ page }} / {{ length }} 页
          </span>
        </div>
      </div>
      <div class="share-hero__auto">
        <v-switch
          v-model="auto"
          color="white"
          inset
          hide-details
          density="compact"
          label="自动更新"
          @change="autoUpdate"
        ></v-switch>
      </div>
    </div>

    <!-- 加载骨架屏 -->
    <template v-if="loading && shareList.length === 0">
      <v-skeleton-loader
        v-for="i in 3"
        :key="i"
        type="article"
        class="mb-4 sk-card"
        rounded="lg"
      />
    </template>

    <template v-else>
      <!-- 分享列表 -->
      <ShareListCom
        v-if="shareList.length > 0"
        :share-list="shareList"
        @delete="deleteShare"
      />

      <!-- 空状态 -->
      <div v-else class="empty-state">
        <v-icon icon="mdi-text-box-remove-outline" size="64" class="empty-state__icon"></v-icon>
        <div class="empty-state__title">还没有创建过分享</div>
        <div class="empty-state__subtitle">回到首页写下一段文字，开始你的分享吧</div>
      </div>

      <!-- 分页 -->
      <div v-if="length > 1" class="text-center mt-6">
        <v-pagination
          color="blue"
          v-model="page"
          :length="length"
          :total-visible="5"
          rounded="circle"
          @update:modelValue="pageChange"
        />
      </div>
    </template>
  </v-container>
</template>

<script>
import ShareListCom from '@/components/share-list.vue'
export default {
  name: 'ShareList',
  components: { ShareListCom },
  data() {
    return {
      shareList: [],
      page: 1,
      length: 0,
      size: 15,
      total: 0,
      auto: false,
      loading: true,
      interval: null
    }
  },
  created() {
    const page = parseInt(this.$route.query.page)
    if (!isNaN(page)) {
      if (page <= 0) {
        this.page = 1
      } else {
        this.page = page
      }
    }
    this.getShareList()
  },
  beforeUnmount() {
    // 离开页面前清理自动更新定时器
    this.stopAutoUpdate()
  },
  methods: {
    autoUpdate() {
      if (this.auto) {
        this.interval = window.setInterval(() => {
          this.getShareList(false)
        }, 10000)
      } else {
        this.stopAutoUpdate()
      }
    },
    stopAutoUpdate() {
      if (this.interval) {
        window.clearInterval(this.interval)
        this.interval = null
      }
    },
    deleteShare(status) {
      if (status) {
        this.getShareList()
      }
    },
    getShareList(showLoading = true) {
      if (showLoading) {
        this.loading = true
      }
      const url = `/share/list?page=${this.page}&size=${this.size}`
      this.httpGet(url, (json) => {
        // 后端返回非 200（如登录失效），停止轮询并自动关闭自动更新
        if (json.status !== 200) {
          this.auto = false
          this.stopAutoUpdate()
          this.loading = false
          return
        }
        this.shareList = json.page.content
        this.total = json.page.page.totalElements
        this.length = json.page.page.totalPages
        this.loading = false
      })
    },
    pageChange(page) {
      this.page = page
      this.loading = true
      this.$router.push({
        path: this.$route.path,
        query: { page: page }
      })
      this.getShareList()
      const top = document.querySelector('#share-top')
      if (top && top.scrollIntoView) {
        top.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }
}
</script>

<style scoped>
/* ===== 页面头部 ===== */
.share-hero {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 20px;
  margin-bottom: 14px;
  border-radius: 14px;
  color: #fff;
  background: rgb(var(--v-theme-primary));
  background: linear-gradient(
    135deg,
    rgb(var(--v-theme-primary)) 0%,
    color-mix(in srgb, rgb(var(--v-theme-primary)) 68%, #ffffff) 100%
  );
  box-shadow: 0 4px 14px rgba(25, 118, 210, 0.22);
}

.share-hero::before,
.share-hero::after {
  content: '';
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
  pointer-events: none;
}

.share-hero::before {
  right: -48px;
  top: -72px;
  width: 160px;
  height: 160px;
}

.share-hero::after {
  right: 90px;
  bottom: -80px;
  width: 120px;
  height: 120px;
  background: rgba(255, 255, 255, 0.08);
}

.share-hero__icon {
  position: relative;
  z-index: 1;
  flex-shrink: 0;
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.22);
  backdrop-filter: blur(4px);
}

.share-hero__icon .v-icon {
  font-size: 22px !important;
}

.share-hero__body {
  position: relative;
  z-index: 1;
  min-width: 0;
  flex: 1;
}

.share-hero__label {
  display: none;
}

.share-hero__title {
  font-size: 17px;
  font-weight: 700;
  line-height: 1.3;
  margin: 0 0 6px;
}

.share-hero__meta {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.meta-pill {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.2);
  font-size: 12px;
  white-space: nowrap;
}

.share-hero__auto {
  position: relative;
  z-index: 1;
  flex-shrink: 0;
}

.share-hero__auto :deep(.v-label) {
  color: rgba(255, 255, 255, 0.92);
  opacity: 1;
  font-size: 14px;
}

/* ===== 骨架屏 ===== */
.sk-card {
  border: 1px solid rgba(0, 0, 0, 0.06);
}

/* ===== 空状态 ===== */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 64px 16px;
  text-align: center;
  border: 1.5px dashed rgba(0, 0, 0, 0.12);
  border-radius: 16px;
  background: rgba(0, 0, 0, 0.02);
}

.empty-state__icon {
  opacity: 0.35;
}

.empty-state__title {
  margin-top: 8px;
  font-size: 16px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.7);
}

.empty-state__subtitle {
  font-size: 13px;
  color: rgba(0, 0, 0, 0.45);
  max-width: 460px;
}

/* ===== 移动端适配 ===== */
@media (max-width: 600px) {
  .share-hero {
    padding: 10px 12px;
    gap: 8px;
    flex-wrap: wrap;
  }

  .share-hero__icon {
    width: 34px;
    height: 34px;
    border-radius: 9px;
  }

  .share-hero__icon .v-icon {
    font-size: 18px !important;
  }

  .share-hero__title {
    font-size: 15px;
    margin-bottom: 4px;
  }

  .share-hero__meta {
    gap: 4px;
  }

  .meta-pill {
    padding: 2px 8px;
    font-size: 11.5px;
  }

  /* 自动更新开关独占一行，右对齐，避免挤压标题区 */
  .share-hero__auto {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  .share-hero__auto :deep(.v-label) {
    font-size: 13px;
  }
}
</style>
