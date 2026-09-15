<template>
  <v-container class="share-file-page">
    <div v-if="showShareRes" class="share-content">
      <!-- 文件信息头部 -->
      <div class="file-hero">
        <div class="file-hero__icon" :style="iconStyle(item.uploadFilename)">
          <v-icon :icon="fileMeta(item.uploadFilename).icon" size="30"></v-icon>
        </div>
        <div class="file-hero__body">
          <div class="file-hero__label">好友分享给你的文件</div>
          <h1 class="file-hero__name" :title="item.uploadFilename">
            {{ item.uploadFilename }}
          </h1>
          <div class="file-hero__meta">
            <span class="meta-pill">
              <v-icon size="14" icon="mdi-database-outline"></v-icon>
              {{ showSize(item.size) || '未知大小' }}
            </span>
            <span v-if="item.createTime" class="meta-pill">
              <v-icon size="14" icon="mdi-clock-outline"></v-icon>
              {{ formateTimeToChinese(item.createTime) }}
            </span>
          </div>
        </div>
      </div>

      <!-- 预览区域 -->
      <v-card class="preview-card" elevation="0">
        <v-card-text class="preview-card__body">
          <v-img
            v-if="getFileType(item) == 1"
            class="preview-media"
            :src="`${item.path}?filename=${encodeURIComponent(
              item.uploadFilename
            )}&type=inline&key=${encodeURIComponent(item.userSeeKey)}`"
          ></v-img>
          <!-- 视频 -->
          <div v-else-if="getFileType(item) == 2" class="preview-media">
            <VideoPlayer :video="item" />
          </div>
          <!-- 音乐 -->
          <div v-else-if="getFileType(item) == 3" class="preview-media">
            <Voice :voice="item" />
          </div>
          <!-- 不支持预览 -->
          <div v-else class="no-preview">
            <v-icon icon="mdi-file-eye-outline" size="56" class="no-preview__icon"></v-icon>
            <div class="no-preview__title">该文件类型暂不支持在线预览</div>
            <div class="no-preview__subtitle">点击下方下载按钮，保存到本地后查看</div>
          </div>
        </v-card-text>
      </v-card>

      <!-- 下载操作 -->
      <div class="download-bar">
        <v-btn
          class="download-btn"
          size="large"
          rounded="pill"
          elevation="2"
          color="primary"
          target="_blank"
          :href="`${item.path}?filename=${encodeURIComponent(
            item.uploadFilename
          )}&type=attachment&key=${encodeURIComponent(item.userSeeKey)}`"
        >
          <v-icon icon="mdi-download" start></v-icon>
          下载文件
        </v-btn>
      </div>
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
const IMG = ['jpg', 'jpeg', 'png', 'gif', 'ico', 'bmp', 'webp', 'tif']
const VIDEO = ['mp4', 'mkv', 'webm', 'mov', 'mpeg', 'm4v', 'avi', 'wmv', 'flv']
const MUSIC = ['mp3', 'wav', 'flac', 'ape', 'aac']
import VideoPlayer from '@/components/play/player.vue'
import Voice from '@/components/play/voice.vue'
export default {
  components: {
    VideoPlayer,
    Voice
  },
  data() {
    return {
      item: {
        path: '',
        uploadFilename: ''
      },
      userSeeKey: '',
      showShareDialog: false,
      showShareRes: false,
      fileType: -1
    }
  },
  created() {
    this.getShare()
  },
  methods: {
    // 根据文件扩展名返回对应图标与配色
    fileMeta(name) {
      const ext = ((name || '').split('.').pop() || '').toLowerCase()
      if (IMG.includes(ext)) {
        return { icon: 'mdi-file-image-outline', color: '#AB47BC', bg: 'rgba(171, 71, 188, 0.12)' }
      }
      if (VIDEO.includes(ext)) {
        return { icon: 'mdi-file-video-outline', color: '#EC407A', bg: 'rgba(236, 64, 122, 0.12)' }
      }
      if (MUSIC.includes(ext)) {
        return { icon: 'mdi-file-music-outline', color: '#26A69A', bg: 'rgba(38, 166, 154, 0.12)' }
      }
      if (['zip', 'rar', '7z', 'tar', 'gz', 'bz2', 'xz'].includes(ext)) {
        return { icon: 'mdi-folder-zip-outline', color: '#FFA726', bg: 'rgba(255, 167, 38, 0.14)' }
      }
      if (ext === 'pdf') {
        return { icon: 'mdi-file-pdf-box', color: '#EF5350', bg: 'rgba(239, 83, 80, 0.12)' }
      }
      if (['doc', 'docx', 'rtf'].includes(ext)) {
        return { icon: 'mdi-file-word-box', color: '#42A5F5', bg: 'rgba(66, 165, 245, 0.12)' }
      }
      if (['xls', 'xlsx', 'csv'].includes(ext)) {
        return { icon: 'mdi-file-excel-box', color: '#66BB6A', bg: 'rgba(102, 187, 106, 0.12)' }
      }
      if (['ppt', 'pptx'].includes(ext)) {
        return { icon: 'mdi-file-powerpoint-box', color: '#FF7043', bg: 'rgba(255, 112, 67, 0.12)' }
      }
      if (['txt', 'md', 'log', 'json', 'xml', 'yml', 'yaml'].includes(ext)) {
        return { icon: 'mdi-file-document-outline', color: '#78909C', bg: 'rgba(120, 144, 156, 0.12)' }
      }
      return { icon: 'mdi-file-outline', color: '#546E7A', bg: 'rgba(84, 110, 123, 0.1)' }
    },
    iconStyle(name) {
      const meta = this.fileMeta(name)
      return { background: meta.bg, color: meta.color }
    },
    getFileType() {
      let name = this.item.path.split('.').pop().toLowerCase()
      for (let i = 0; i < IMG.length; i++) {
        if (IMG[i] == name) {
          return 1
        }
      }
      for (let i = 0; i < VIDEO.length; i++) {
        if (VIDEO[i] == name) {
          return 2
        }
      }
      for (let i = 0; i < MUSIC.length; i++) {
        if (MUSIC[i] == name) {
          return 3
        }
      }
      return 0
    },
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
    showSize(size) {
      if (size == null || isNaN(size)) {
        return ''
      }
      if (size < 1024) {
        return size + ' B'
      }
      const kb = size / 1024
      if (kb < 1024) {
        return kb.toFixed(2) + ' KB'
      }
      const mb = kb / 1024
      if (mb < 1024) {
        return mb.toFixed(2) + ' MB'
      }
      return (mb / 1024).toFixed(2) + ' GB'
    },
    getShare() {
      //
      this.httpGet(`/public/file/check?id=${this.$route.params.id}`, (json) => {
        //
        if (json.status == 200) {
          if (json.data) {
            this.showShareDialog = true
          } else {
            this.getShareData()
            this.showShareRes = true
          }
        } else {
          this.$router.push('/')
        }
      })
    },
    getShareData() {
      this.httpPost(
        `/public/file/get`,
        { url: this.$route.params.id, userSeeKey: this.userSeeKey },
        (json) => {
          if (json.data != null) {
            this.item = json.data
            this.showShareRes = true
            this.showShareDialog = false
          } else {
            //
          }
        }
      )
    }
  }
}
</script>
  
<style scoped>
/* ===== 文件信息头部 ===== */
.file-hero {
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 26px 30px;
  margin-bottom: 20px;
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  background: rgba(var(--v-theme-primary), 0.05);
}

.file-hero__icon {
  flex-shrink: 0;
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
}

.file-hero__body {
  min-width: 0;
  flex: 1;
}

.file-hero__label {
  font-size: 13px;
  color: rgba(0, 0, 0, 0.45);
  letter-spacing: 1px;
}

.file-hero__name {
  font-size: clamp(18px, 2.6vw, 26px);
  font-weight: 700;
  line-height: 1.35;
  color: rgba(0, 0, 0, 0.87);
  margin: 4px 0 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.file-hero__meta {
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

/* ===== 预览卡片 ===== */
.preview-card {
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 16px;
  overflow: hidden;
}

.preview-card__body {
  padding: 16px;
}

.preview-media {
  border-radius: 10px;
  overflow: hidden;
}

.no-preview {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 48px 16px;
  text-align: center;
}

.no-preview__icon {
  opacity: 0.35;
}

.no-preview__title {
  margin-top: 8px;
  font-size: 16px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.7);
}

.no-preview__subtitle {
  font-size: 13px;
  color: rgba(0, 0, 0, 0.45);
}

/* ===== 下载操作 ===== */
.download-bar {
  display: flex;
  justify-content: center;
  margin-top: 24px;
}

.download-btn {
  min-width: 220px;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 2px;
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
  .file-hero {
    padding: 18px;
    gap: 12px;
  }

  .file-hero__icon {
    width: 52px;
    height: 52px;
    border-radius: 12px;
  }

  .download-btn {
    width: 100%;
  }
}
</style>
