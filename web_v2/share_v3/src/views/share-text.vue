<template>
  <v-container class="share-text-page">
    <div v-if="showShareRes">
      <!-- 分享信息头部 -->
      <div class="text-hero">
        <div class="text-hero__icon">
          <v-icon icon="mdi-text-box-outline" size="30"></v-icon>
        </div>
        <div class="text-hero__body">
          <div class="text-hero__label">好友分享给你的内容</div>
          <h1 class="text-hero__title">文本分享</h1>
          <div class="text-hero__meta">
            <span v-if="item.createTime" class="meta-pill">
              <v-icon size="14" icon="mdi-clock-outline"></v-icon>
              {{ formateTimeToChinese(item.createTime) }}
            </span>
            <span class="meta-pill">
              <v-icon size="14" icon="mdi-pen-outline"></v-icon>
              {{ item.editType == 1 ? '富文本' : 'Markdown' }}
            </span>
          </div>
        </div>
      </div>

      <!-- 内容工具条 -->
      <div class="content-toolbar">
        <v-tooltip text="为保护媒体资源，如果视频或图片不显示，请点击此按钮" location="left">
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" size="small" variant="tonal" color="primary" @click="addLinkKey()">
              <v-icon icon="mdi-refresh-circle" start></v-icon>
              重新加载媒体
            </v-btn>
          </template>
        </v-tooltip>
      </div>

      <!-- 正文内容 -->
      <v-card class="content-card" elevation="0">
        <v-card-text>
          <ShowHtml v-if="item.editType == 1" :text="item.data" :key="editKey" />
          <ShowMarkdown
            v-if="item.editType == 0"
            :markdown="item.data"
            :speech="false"
            :key="editKey"
          />
        </v-card-text>
      </v-card>
    </div>

    <!-- 密码输入弹框 -->
    <v-dialog persistent v-model="showShareDialog" max-width="440">
      <v-card class="pwd-dialog">
        <div class="pwd-dialog__head">
          <div class="pwd-dialog__icon">
            <v-icon icon="mdi-lock-outline" size="28"></v-icon>
          </div>
          <div class="pwd-dialog__title">这份分享设置了密码</div>
          <div class="pwd-dialog__subtitle">请输入密码后查看内容</div>
        </div>
        <v-card-text>
          <v-text-field
            v-model="userSeeKey"
            placeholder="请输入密码"
            label="密码"
            variant="outlined"
            prepend-inner-icon="mdi-key-variant"
            clearable
            @keyup.enter="getShareData()"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="green darken-1" text @click="showShareDialog = false"> 放弃 </v-btn>
          <v-btn color="primary" variant="flat" @click="getShareData()"> 确认 </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import ShowMarkdown from '@/components/vditor/show-markdown.vue'
import ShowHtml from '@/components/wangeditor/show-html.vue'
export default {
  components: { ShowMarkdown, ShowHtml },
  data() {
    return {
      item: {
        data: '',
        editType: 0
      },
      userSeeKey: '',
      showShareDialog: false,
      showShareRes: false,
      editKey: 0
    }
  },
  created() {
    this.getShare()
  },
  methods: {
    formateTimeToChinese(date) {
      if (date === '' || date == null) {
        return ''
      }
      const da = new Date(date)
      return (
        da.getFullYear() +
        '年' +
        (da.getMonth() + 1) +
        '月' +
        da.getDate() +
        '日 ' +
        da.getHours() +
        '时' +
        da.getMinutes() +
        '分'
      )
    },
    getShare() {
      this.httpGet(`/public/share/check?id=${this.$route.params.id}`, (json) => {
        if (json.status == 200) {
          if (json.data) {
            this.showShareDialog = true
          } else {
            this.getShareData()
          }
        } else {
          this.$router.push('/')
        }
      })
    },
    getShareData() {
      this.httpPost(
        `/public/share/get`,
        { url: this.$route.params.id, userSeeKey: this.userSeeKey },
        (json) => {
          if (json.data != null) {
            this.item = json.data
            this.editKey++
            this.showShareRes = true
            this.showShareDialog = false
          } else {
            //
          }
        }
      )
    },
    addLinkKey() {
      // 为链接增加key
      let videoList = document.querySelectorAll('video')
      for (let i = 0; i < videoList.length; i++) {
        if (videoList[i].src.includes(`${location.origin}/api/upload/file/`)) {
          videoList[i].src = `${videoList[i].src}?type=inline&key=${encodeURIComponent(
            this.item.userSeeKey
          )}`
        }
      }
      let imgList = document.querySelectorAll('img')
      for (let i = 0; i < imgList.length; i++) {
        if (imgList[i].src.includes(`${location.origin}/api/upload/file/`)) {
          imgList[i].src = `${imgList[i].src}?type=inline&key=${encodeURIComponent(
            this.item.userSeeKey
          )}`
        }
      }
      let alinkList = document.querySelectorAll('a')
      for (let i = 0; i < alinkList.length; i++) {
        if (alinkList[i].href.includes(`${location.origin}/api/upload/file/`)) {
          alinkList[i].href = `${alinkList[i].href}?type=inline&key=${encodeURIComponent(
            this.item.userSeeKey
          )}`
        }
      }
      let sourceList = document.querySelectorAll('source')

      for (let i = 0; i < sourceList.length; i++) {
        if (sourceList[i].src.includes(`${location.origin}/api/upload/file/`)) {
          sourceList[i].src = `${sourceList[i].src}?type=inline&key=${encodeURIComponent(
            this.item.userSeeKey
          )}`
        }
      }
    }
  }
}
</script>

<style scoped>
/* ===== 分享信息头部 ===== */
.text-hero {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 26px 30px;
  margin-bottom: 12px;
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  background: rgba(var(--v-theme-primary), 0.05);
}

.text-hero__icon {
  flex-shrink: 0;
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  color: rgb(var(--v-theme-primary));
  background: rgba(var(--v-theme-primary), 0.1);
}

.text-hero__body {
  min-width: 0;
  flex: 1;
}

.text-hero__label {
  font-size: 13px;
  color: rgba(0, 0, 0, 0.45);
  letter-spacing: 1px;
}

.text-hero__title {
  font-size: clamp(18px, 2.6vw, 26px);
  font-weight: 700;
  line-height: 1.35;
  color: rgba(0, 0, 0, 0.87);
  margin: 4px 0 10px;
}

.text-hero__meta {
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
  background: rgba(var(--v-theme-primary), 0.1);
  color: rgba(0, 0, 0, 0.6);
  font-size: 13px;
  white-space: nowrap;
}

/* ===== 内容工具条 ===== */
.content-toolbar {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}

/* ===== 正文卡片 ===== */
.content-card {
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 16px;
}

/* ===== 密码弹框 ===== */
.pwd-dialog {
  border-radius: 16px;
  padding-top: 8px;
}

.pwd-dialog__head {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding-top: 20px;
  text-align: center;
}

.pwd-dialog__icon {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(var(--v-theme-primary), 0.1);
  color: rgb(var(--v-theme-primary));
  margin-bottom: 6px;
}

.pwd-dialog__title {
  font-size: 17px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.8);
}

.pwd-dialog__subtitle {
  font-size: 13px;
  color: rgba(0, 0, 0, 0.45);
}

/* ===== 移动端适配 ===== */
@media (max-width: 600px) {
  .text-hero {
    padding: 18px;
    gap: 12px;
  }

  .text-hero__icon {
    width: 52px;
    height: 52px;
    border-radius: 12px;
  }
}
</style>
