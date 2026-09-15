<template>
  <v-container class="search-page">
    <div id="share-top" />

    <!-- 搜索结果头部 -->
    <div class="search-hero">
      <div class="search-hero__icon">
        <v-icon icon="mdi-magnify" size="30"></v-icon>
      </div>
      <div class="search-hero__body">
        <div class="search-hero__label">搜索结果</div>
        <h1 class="search-hero__keyword" :title="displayKey">
          {{ displayKey || '请输入搜索关键词' }}
        </h1>
        <div class="search-hero__meta">
          <span class="meta-pill">
            <v-icon size="14" icon="mdi-text"></v-icon>
            {{ total }} 条文本分享
          </span>
          <span class="meta-pill">
            <v-icon size="14" icon="mdi-file-outline"></v-icon>
            {{ fileTotal }} 条文件分享
          </span>
        </div>
      </div>
    </div>

    <!-- 结果分类标签 -->
    <v-tabs
      v-model="tab"
      class="result-tabs mt-6"
      color="primary"
      align-tabs="left"
      density="comfortable"
    >
      <v-tab value="text" class="result-tab">
        <v-icon icon="mdi-text" start></v-icon>
        文本分享
        <span class="tab-count">{{ total }}</span>
      </v-tab>
      <v-tab value="file" class="result-tab">
        <v-icon icon="mdi-file-outline" start></v-icon>
        文件分享
        <span class="tab-count">{{ fileTotal }}</span>
      </v-tab>
    </v-tabs>

    <v-window v-model="tab" class="mt-4">
      <!-- 文本搜索结果 -->
      <v-window-item value="text">
        <template v-if="loading">
          <v-skeleton-loader
            v-for="i in 3"
            :key="i"
            type="article, actions"
            class="mb-4"
            rounded="lg"
          />
        </template>

        <template v-else-if="shareList.length > 0">
          <ShareListCom :share-list="shareList" @delete="deleteShare" />

          <div v-if="length > 1" class="text-center mt-4">
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

        <div v-else class="empty-state">
          <v-icon icon="mdi-text-search-variant" size="64" class="empty-state__icon"></v-icon>
          <div class="empty-state__title">未找到相关的文本分享</div>
          <div class="empty-state__subtitle">
            没有找到与「{{ displayKey }}」相关的文本，换个关键词试试
          </div>
          <v-btn
            v-if="fileTotal > 0"
            class="mt-2"
            variant="tonal"
            color="primary"
            @click="tab = 'file'"
          >
            <v-icon icon="mdi-file-outline" start></v-icon>
            查看 {{ fileTotal }} 条文件结果
          </v-btn>
        </div>
      </v-window-item>

      <!-- 文件搜索结果 -->
      <v-window-item value="file">
        <template v-if="fileLoading">
          <v-skeleton-loader
            v-for="i in 4"
            :key="i"
            type="list-item-two-line"
            class="mb-2"
            rounded="lg"
          />
        </template>

        <template v-else>
          <FileSearchListCom :file-list="fileList" @refresh="getFileList" />

          <div v-if="fileLength > 1" class="text-center mt-4">
            <v-pagination
              color="blue"
              v-model="filePage"
              :length="fileLength"
              :total-visible="5"
              rounded="circle"
              @update:modelValue="filePageChange"
            />
          </div>
        </template>
      </v-window-item>
    </v-window>
  </v-container>
</template>

<script>
import ShareListCom from '@/components/share-list.vue'
import FileSearchListCom from '@/components/file-search-list.vue'
export default {
  name: 'Search',
  components: { ShareListCom, FileSearchListCom },
  data() {
    return {
      shareList: [],
      fileList: [],
      page: 1,
      filePage: 1,
      length: 0,
      fileLength: 0,
      size: 15,
      fileSize: 15,
      total: 0,
      fileTotal: 0,
      key: '',
      tab: 'text',
      loading: false,
      fileLoading: false,
      // 智能切页辅助状态
      tabInitialized: false,
      tabTouched: false,
      textReady: false,
      fileReady: false,
      autoTabChecked: false
    }
  },
  computed: {
    displayKey() {
      if (!this.key) {
        return ''
      }
      try {
        return decodeURIComponent(this.key)
      } catch (e) {
        return this.key
      }
    }
  },
  watch: {
    tab(val) {
      if (!this.tabInitialized) {
        return
      }
      this.tabTouched = true
      // 将当前标签同步到 URL，刷新后仍停留在当前分类
      this.$router.replace({
        path: this.$route.path,
        query: { ...this.$route.query, tab: val }
      })
      this.$nextTick(() => {
        const top = document.querySelector('#share-top')
        if (top && top.scrollIntoView) {
          top.scrollIntoView({ behavior: 'smooth' })
        }
      })
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
    const filePage = parseInt(this.$route.query.fpage)
    if (!isNaN(filePage)) {
      if (filePage <= 0) {
        this.filePage = 1
      } else {
        this.filePage = filePage
      }
    }
    if (this.$route.query.tab === 'file') {
      this.tab = 'file'
    }
    this.key = this.$route.query.key
    this.getShareList()
    this.getFileList()
    this.$nextTick(() => {
      this.tabInitialized = true
    })
  },
  methods: {
    setKey(key) {
      this.page = 1
      this.filePage = 1
      this.key = key
      // 新关键词重新进行智能切页判断
      this.textReady = false
      this.fileReady = false
      this.autoTabChecked = false
    },
    checkAutoTab() {
      if (this.autoTabChecked || !this.textReady || !this.fileReady) {
        return
      }
      this.autoTabChecked = true
      // 文本无结果而文件有结果时，自动切换到文件标签（用户已手动切换过则不干预）
      if (
        !this.tabTouched &&
        this.tab === 'text' &&
        this.total === 0 &&
        this.fileTotal > 0 &&
        this.$route.query.tab !== 'text'
      ) {
        this.tab = 'file'
      }
    },
    deleteShare(status) {
      if (status) {
        this.getShareList()
      }
    },
    getShareList() {
      this.loading = true
      // 请求异常时的兜底，避免骨架屏一直停留
      setTimeout(() => {
        this.loading = false
      }, 10000)
      this.httpGet(
        `/share/list?page=${this.page}&size=${this.size}&key=${encodeURIComponent(this.key)}`,
        (json) => {
          this.shareList = json.page.content
          this.total = json.page.page.totalElements
          this.length = json.page.page.totalPages
          this.loading = false
          this.textReady = true
          this.checkAutoTab()
        }
      )
    },
    getFileList() {
      this.fileLoading = true
      setTimeout(() => {
        this.fileLoading = false
      }, 10000)
      this.httpGet(
        `/file/list?page=${this.filePage}&size=${this.fileSize}&key=${encodeURIComponent(this.key)}`,
        (json) => {
          this.fileList = json.page.content
          this.fileTotal = json.page.page.totalElements
          this.fileLength = json.page.page.totalPages
          this.fileLoading = false
          this.fileReady = true
          this.checkAutoTab()
        }
      )
    },
    pageChange(page) {
      this.page = page
      this.$router.push({
        path: this.$route.path,
        query: {
          page: page,
          fpage: this.filePage,
          key: this.key,
          tab: this.tab
        }
      })

      this.getShareList()
      document.querySelector('#share-top').scrollIntoView()
    },
    filePageChange(page) {
      this.filePage = page
      this.$router.push({
        path: this.$route.path,
        query: {
          page: this.page,
          fpage: page,
          key: this.key,
          tab: this.tab
        }
      })

      this.getFileList()
      document.querySelector('#share-top').scrollIntoView()
    }
  }
}
</script>

<style scoped>
/* ===== 搜索结果头部 ===== */
.search-hero {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 26px 30px;
  border-radius: 16px;
  color: #fff;
  background: rgb(var(--v-theme-primary));
  background: linear-gradient(
    135deg,
    rgb(var(--v-theme-primary)) 0%,
    color-mix(in srgb, rgb(var(--v-theme-primary)) 68%, #ffffff) 100%
  );
  box-shadow: 0 8px 24px rgba(25, 118, 210, 0.28);
}

.search-hero::before,
.search-hero::after {
  content: '';
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
  pointer-events: none;
}

.search-hero::before {
  right: -48px;
  top: -72px;
  width: 200px;
  height: 200px;
}

.search-hero::after {
  right: 90px;
  bottom: -90px;
  width: 150px;
  height: 150px;
  background: rgba(255, 255, 255, 0.08);
}

.search-hero__icon {
  position: relative;
  z-index: 1;
  flex-shrink: 0;
  width: 58px;
  height: 58px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.22);
  backdrop-filter: blur(4px);
}

.search-hero__body {
  position: relative;
  z-index: 1;
  min-width: 0;
  flex: 1;
}

.search-hero__label {
  font-size: 13px;
  opacity: 0.85;
  letter-spacing: 2px;
}

.search-hero__keyword {
  font-size: clamp(20px, 3vw, 28px);
  font-weight: 700;
  line-height: 1.35;
  margin: 4px 0 10px;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.search-hero__meta {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.meta-pill {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.2);
  font-size: 13px;
  white-space: nowrap;
}

/* ===== 结果分类标签 ===== */
.result-tabs {
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.result-tab {
  text-transform: none;
  font-size: 15px;
  letter-spacing: 0.2px;
}

.tab-count {
  margin-left: 8px;
  min-width: 26px;
  height: 22px;
  padding: 0 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  background: rgba(0, 0, 0, 0.06);
  color: rgba(0, 0, 0, 0.55);
  transition: background-color 0.2s ease, color 0.2s ease;
}

.result-tab:hover .tab-count {
  background: rgba(0, 0, 0, 0.1);
}

.result-tab.v-tab--selected .tab-count {
  background: rgb(var(--v-theme-primary));
  color: #fff;
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

/* ===== 骨架屏 ===== */
:deep(.v-skeleton-loader) {
  border: 1px solid rgba(0, 0, 0, 0.06);
}

/* ===== 移动端适配 ===== */
@media (max-width: 600px) {
  .search-hero {
    padding: 20px;
    gap: 14px;
  }

  .search-hero__icon {
    width: 46px;
    height: 46px;
    border-radius: 12px;
  }
}
</style>
