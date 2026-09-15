<template>
  <v-container fluid class="file-page">
    <div id="file-top" />

    <!-- 页面头部：磁盘信息 -->
    <div class="file-hero">
      <div class="file-hero__icon">
        <v-icon icon="mdi-cloud-outline" size="30"></v-icon>
      </div>
      <div class="file-hero__body">
        <div class="file-hero__label">我的文件</div>
        <h1 class="file-hero__title">文件分享列表</h1>
        <div class="file-hero__meta">
          <span class="meta-pill">
            <v-icon size="14" icon="mdi-database-outline"></v-icon>
            已使用 {{ useSize }}
          </span>
          <span class="meta-pill">
            <v-icon size="14" icon="mdi-harddisk"></v-icon>
            剩余 {{ availableDisk }}
          </span>
          <span class="meta-pill">
            <v-icon size="14" icon="mdi-file-multiple-outline"></v-icon>
            共 {{ total }} 个文件
          </span>
        </div>
      </div>
      <v-btn
        class="file-hero__refresh"
        variant="elevated"
        color="white"
        :loading="loading"
        @click="refresh"
      >
        <v-icon icon="mdi-refresh" start></v-icon>
        刷新
      </v-btn>
    </div>

    <!-- 加载骨架屏 -->
    <template v-if="loading && fileList.length === 0">
      <v-skeleton-loader
        v-for="i in 6"
        :key="i"
        type="list-item-avatar-two-line"
        class="mb-2 sk-card"
        rounded="lg"
      />
    </template>

    <!-- 文件列表 -->
    <template v-else>
      <template v-if="fileList.length > 0">
        <v-card v-for="item in fileList" :key="item.id" class="file-card" elevation="0">
          <div class="file-item">
            <!-- 文件类型图标 -->
            <div class="file-icon" :style="iconStyle(item.uploadFilename)">
              <v-icon :icon="fileMeta(item.uploadFilename).icon" size="26"></v-icon>
            </div>

            <!-- 文件信息 -->
            <div class="file-info">
              <v-tooltip
                v-if="item.uploadFilename.length >= 40"
                location="top"
                :text="item.uploadFilename"
              >
                <template v-slot:activator="{ props }">
                  <div v-bind="props" class="file-name" style="cursor: default">
                    {{ showFileName(item.uploadFilename) }}
                  </div>
                </template>
              </v-tooltip>
              <div v-else class="file-name" :title="item.uploadFilename">
                {{ item.uploadFilename }}
              </div>

              <div class="file-meta">
                <span class="meta-item">
                  <v-icon size="14" icon="mdi-database-outline"></v-icon>
                  {{ showSize(item.size) }}
                </span>
                <span class="meta-item">
                  <v-icon size="14" icon="mdi-clock-outline"></v-icon>
                  {{ formateTimeToChinese(item.createTime) }}
                </span>
                <v-tooltip v-if="item.publicUser" location="top" text="点击查看共享状态">
                  <template v-slot:activator="{ props }">
                    <span
                      v-bind="props"
                      class="meta-item meta-item--shared"
                      @click="showShareStatus(item)"
                    >
                      <v-icon size="14" icon="mdi-share-variant-outline"></v-icon>
                      已共享
                    </span>
                  </template>
                </v-tooltip>
              </div>
            </div>

            <!-- 操作按钮 -->
            <div class="file-actions">
              <v-tooltip location="top" text="预览">
                <template v-slot:activator="{ props }">
                  <v-btn
                    v-bind="props"
                    icon
                    variant="text"
                    size="small"
                    color="teal"
                    :href="`${item.path}?filename=${encodeURIComponent(
                      item.uploadFilename
                    )}&type=inline`"
                    target="_blank"
                  >
                    <v-icon icon="mdi-eye-outline"></v-icon>
                  </v-btn>
                </template>
              </v-tooltip>
              <v-tooltip location="top" text="下载">
                <template v-slot:activator="{ props }">
                  <v-btn
                    v-bind="props"
                    icon
                    variant="text"
                    size="small"
                    color="success"
                    :href="`${item.path}?filename=${encodeURIComponent(
                      item.uploadFilename
                    )}&type=attachment`"
                    target="_blank"
                  >
                    <v-icon icon="mdi-download-outline"></v-icon>
                  </v-btn>
                </template>
              </v-tooltip>
              <v-tooltip v-if="showShareBtn" location="top" text="分享">
                <template v-slot:activator="{ props }">
                  <v-btn
                    v-bind="props"
                    icon
                    variant="text"
                    size="small"
                    color="primary"
                    @click="showShareFileDilog(item)"
                  >
                    <v-icon icon="mdi-share-variant-outline"></v-icon>
                  </v-btn>
                </template>
              </v-tooltip>
              <v-tooltip location="top" text="重命名">
                <template v-slot:activator="{ props }">
                  <v-btn
                    v-bind="props"
                    icon
                    variant="text"
                    size="small"
                    color="amber-darken-2"
                    @click="editItem(item)"
                  >
                    <v-icon icon="mdi-pencil-outline"></v-icon>
                  </v-btn>
                </template>
              </v-tooltip>
              <v-tooltip location="top" text="删除">
                <template v-slot:activator="{ props }">
                  <v-btn
                    v-bind="props"
                    icon
                    variant="text"
                    size="small"
                    color="error"
                    @click="deleteItem(item)"
                  >
                    <v-icon icon="mdi-delete-outline"></v-icon>
                  </v-btn>
                </template>
              </v-tooltip>
            </div>
          </div>
        </v-card>
      </template>

      <!-- 空状态 -->
      <div v-else class="empty-state">
        <v-icon icon="mdi-folder-open-outline" size="64" class="empty-state__icon"></v-icon>
        <div class="empty-state__title">还没有上传过文件</div>
        <div class="empty-state__subtitle">回到首页上传一个文件，开始你的分享吧</div>
      </div>

      <!-- 分页 -->
      <div v-if="pageCount > 1" class="text-center mt-4">
        <v-pagination
          v-model="page"
          color="blue"
          :total-visible="5"
          :length="pageCount"
          rounded="circle"
          @update:modelValue="pageChange"
        ></v-pagination>
      </div>
    </template>

    <v-dialog v-model="showDelete" max-width="440">
      <v-card class="dlg">
        <div class="dlg__head">
          <div class="dlg__icon dlg__icon--error">
            <v-icon icon="mdi-delete-alert-outline" size="28"></v-icon>
          </div>
          <div class="dlg__title">删除文件</div>
          <div class="dlg__subtitle">删除后将无法恢复，请谨慎操作</div>
        </div>
        <v-card-text>
          <div class="dlg__target" :title="deleteItemDate.uploadFilename">
            <div
              class="dlg__target-icon"
              :style="iconStyle(deleteItemDate.uploadFilename)"
            >
              <v-icon
                size="18"
                :icon="fileMeta(deleteItemDate.uploadFilename).icon"
              ></v-icon>
            </div>
            <span class="dlg__target-name">{{ deleteItemDate.uploadFilename }}</span>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" @click="showDelete = false">放弃</v-btn>
          <v-btn color="error" variant="flat" @click="deleteFile()">确认删除</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="showRename" max-width="460">
      <v-card class="dlg">
        <div class="dlg__head">
          <div class="dlg__icon dlg__icon--primary">
            <v-icon icon="mdi-pencil-outline" size="26"></v-icon>
          </div>
          <div class="dlg__title">重命名文件</div>
          <div class="dlg__subtitle">修改后立即生效，不影响文件内容</div>
        </div>
        <v-card-text>
          <div class="dlg__target" :title="renameFileDate.uploadFilename">
            <div
              class="dlg__target-icon"
              :style="iconStyle(renameFileDate.uploadFilename)"
            >
              <v-icon
                size="18"
                :icon="fileMeta(renameFileDate.uploadFilename).icon"
              ></v-icon>
            </div>
            <span class="dlg__target-name">{{ renameFileDate.uploadFilename }}</span>
          </div>
          <v-text-field
            v-model="newName"
            class="mt-4"
            variant="outlined"
            density="compact"
            label="新文件名"
            prepend-inner-icon="mdi-rename-box"
            clearable
            @keyup.enter="reNameOk"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" @click="showRename = false">放弃</v-btn>
          <v-btn color="primary" variant="flat" @click="reNameOk">保存</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 分享弹框 -->
    <v-dialog v-model="showShareDialog" max-width="460">
      <v-card class="dlg">
        <div class="dlg__head">
          <div class="dlg__icon dlg__icon--primary">
            <v-icon icon="mdi-share-variant-outline" size="28"></v-icon>
          </div>
          <div class="dlg__title">分享这份文件</div>
          <div class="dlg__subtitle">分享后任何人均可通过链接查看</div>
        </div>
        <v-card-text>
          <div class="dlg__target" :title="shareItem.uploadFilename">
            <div class="dlg__target-icon" :style="iconStyle(shareItem.uploadFilename)">
              <v-icon size="18" :icon="fileMeta(shareItem.uploadFilename).icon"></v-icon>
            </div>
            <span class="dlg__target-name">{{ shareItem.uploadFilename }}</span>
          </div>
          <v-switch
            v-model="shareItem.haveUserSeeKey"
            class="mt-2"
            color="primary"
            inset
            hide-details
            label="启用访问密码"
          ></v-switch>
          <v-text-field
            v-show="shareItem.haveUserSeeKey"
            v-model="shareItem.userSeeKey"
            class="mt-2"
            variant="outlined"
            density="compact"
            label="访问密码"
            prepend-inner-icon="mdi-key-variant"
            clearable
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" @click="showShareDialog = false">放弃</v-btn>
          <v-btn color="primary" variant="flat" @click="sendSaveShare()">立即分享</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 分享成功弹窗 -->
    <v-dialog v-model="showseccussShareDialog" max-width="460">
      <v-card class="dlg">
        <div class="dlg__head">
          <div class="dlg__icon dlg__icon--success">
            <v-icon icon="mdi-check-circle-outline" size="28"></v-icon>
          </div>
          <div class="dlg__title">分享成功</div>
          <div class="dlg__subtitle">复制下面的内容发送给你的好友吧</div>
        </div>
        <v-card-text>
          <div class="dlg__link">{{ successShareInfo }}</div>
          <v-btn class="mt-3" block variant="tonal" color="primary" @click="copy()">
            <v-icon icon="mdi-content-copy" start></v-icon>
            复制内容
          </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- 查看取消分享弹窗 -->
    <v-dialog v-model="showSeeShareStatusDialog" max-width="1000">
      <v-card class="dlg">
        <div class="dlg__head">
          <div class="dlg__icon dlg__icon--purple">
            <v-icon icon="mdi-share-circle-outline" size="28"></v-icon>
          </div>
          <div class="dlg__title">分享状态</div>
          <div class="dlg__subtitle">任何人都可通过此链接查看该文件</div>
        </div>
        <v-card-text>
          <div class="dlg__link">{{ successShareInfo }}</div>
          <div class="text-center mt-3">
            <v-btn variant="tonal" color="primary" size="small" @click="copy()">
              <v-icon icon="mdi-content-copy" start></v-icon>
              复制链接
            </v-btn>
          </div>
          <ViewLogTable
            :target="showShareStatusItme.id"
            :types="1"
          ></ViewLogTable>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn variant="text" @click="showSeeShareStatusDialog = false">关闭</v-btn>
          <v-btn
            color="error"
            variant="flat"
            v-if="showShareBtn"
            @click="cancelShare()"
          >
            取消分享
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar" :color="color" :timeout="3000" :top="true">
      {{ message }}
    </v-snackbar>
  </v-container>
</template>

<script>
import ViewLogTable from "@/components/view-log-list.vue";
export default {
  name: 'File',
  components: {  ViewLogTable },
  data: () => ({
    fileList: [],
    page: 1,
    size: 20,
    pageCount: 0,
    total: 0,
    deleteItemDate: {
      uploadFilename: ''
    },
    showDelete: false,
    useSize: 0,
    availableDisk: 0,
    snackbar: false,
    message: '删除成功',
    color: 'success',
    showRename: false,
    renameFileDate: {
      uploadFilename: ''
    },
    newName: '',
    loading: true,
    showShareDialog: false,
    shareItem: {
      haveUserSeeKey: false,
      userSeeKey: ''
    },
    showseccussShareDialog: false,
    successShareInfo: '',
    showShareBtn: false,
    //
    showSeeShareStatusDialog: false,
    showShareStatusItme: {},
    nowCount: 20
  }),
  created() {
    const page = parseInt(this.$route.query.page)
    if (!isNaN(page)) {
      if (page <= 0) {
        this.page = 1
      } else {
        this.page = page
      }
    }
    this.initialize()
    this.getDiskMessage()
    this.checkLogin()
  },
  methods: {
    // 根据文件扩展名返回对应图标与配色
    fileMeta(name) {
      const ext = ((name || '').split('.').pop() || '').toLowerCase()
      if (
        ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp', 'svg', 'ico', 'tif', 'tiff'].includes(
          ext
        )
      ) {
        return { icon: 'mdi-file-image-outline', color: '#AB47BC', bg: 'rgba(171, 71, 188, 0.12)' }
      }
      if (['mp4', 'mkv', 'avi', 'mov', 'wmv', 'flv', 'webm', 'm4v'].includes(ext)) {
        return { icon: 'mdi-file-video-outline', color: '#EC407A', bg: 'rgba(236, 64, 122, 0.12)' }
      }
      if (['mp3', 'wav', 'flac', 'ape', 'ogg', 'm4a', 'aac'].includes(ext)) {
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
      if (['apk', 'exe', 'msi', 'dmg', 'iso'].includes(ext)) {
        return { icon: 'mdi-application-cog', color: '#8D6E63', bg: 'rgba(141, 110, 99, 0.12)' }
      }
      return { icon: 'mdi-file-outline', color: '#546E7A', bg: 'rgba(84, 110, 123, 0.1)' }
    },
    iconStyle(name) {
      const meta = this.fileMeta(name)
      return { background: meta.bg, color: meta.color }
    },
    refresh() {
      this.initialize()
      this.getDiskMessage()
    },
    copy() {
      navigator.clipboard.writeText(this.successShareInfo)
      this.message = '已复制到剪贴板'
      this.color = 'success'
      this.snackbar = true
    },
    cancelShare() {
      this.showShareStatusItme.createTime = 0
      this.showShareStatusItme.size = 0
      this.httpPost('/public/file/cancel', this.showShareStatusItme, (json) => {
        if (json.data) {
          this.message = '取消成功'
          this.snackbar = true
          this.initialize()
          this.showSeeShareStatusDialog = false
        } else {
          this.message = '取消失败'
          this.snackbar = true
          this.showSeeShareStatusDialog = false
        }
      })
    },
    showShareStatus(item) {
      this.showShareStatusItme = item
      this.successShareInfo = `链接：${location.origin}/#/share/file/${this.showShareStatusItme.url}`
      if (this.showShareStatusItme.haveUserSeeKey) {
        this.successShareInfo += `\n密码：${this.showShareStatusItme.userSeeKey}`
      }

      this.showSeeShareStatusDialog = true
    },
    checkLogin() {
      this.httpGet('/login/check', (json) => {
        if (json.status == 200) {
          this.showShareBtn = true
        } else {
          this.showShareBtn = false
        }
      })
    },
    showShareFileDilog(item) {
      this.shareItem = item
      this.showShareDialog = true
    },
    sendSaveShare() {
      this.shareItem.size = 0
      this.shareItem.createTime = 0
      this.httpPost(`/public/file`, this.shareItem, (json) => {
        if (json.data != null) {
          this.successShareInfo = `链接：${location.origin}/#/share/file/${json.data.url}`
          if (this.shareItem.haveUserSeeKey) {
            this.successShareInfo += `\n密码：${this.shareItem.userSeeKey}`
          }
          this.showseccussShareDialog = true
          this.showShareDialog = false
          this.initialize()
        } else {
          this.message = json.message
          this.snackbar = true
        }
      })
    },
    showFileName(name) {
      if (name.length >= 40) {
        return name.substr(0, 15) + '...' + name.substr(name.length - 10, 10)
      }
      return name
    },
    pageChange(page) {
      this.loading = true
      this.page = page
      this.$router.push({
        path: this.$route.path,
        query: { page: page }
      })
      this.initialize()
      const top = document.querySelector('#file-top')
      if (top && top.scrollIntoView) {
        top.scrollIntoView({ behavior: 'smooth' })
      }
    },
    getDiskMessage() {
      this.httpGet('/upload/disk', (json) => {
        const userSize = json.data.userDisk / 1024 / 1024
        if (userSize < 1024) {
          this.useSize = userSize.toFixed(2) + 'MB'
        } else {
          this.useSize = (userSize / 1024).toFixed(2) + 'GB'
        }
        const availableDisk = json.data.availableDisk / 1024 / 1024
        if (availableDisk < 1024) {
          this.availableDisk = availableDisk.toFixed(2) + 'MB'
        } else {
          this.availableDisk = (availableDisk / 1024).toFixed(2) + 'GB'
        }
      })
    },
    initialize() {
      this.httpGet(`/file/list?page=${this.page}&size=${this.size}`, (json) => {
        this.nowCount = json.page.size
        this.fileList = json.page.content
        this.total = json.page.page.totalElements
        this.pageCount = json.page.page.totalPages
        this.loading = false
      })
    },
    editItem(item) {
      this.renameFileDate = item
      this.showRename = true
    },
    reNameOk() {
      if (this.newName === '') {
        return
      }
      this.renameFileDate.uploadFilename = this.newName
      this.renameFileDate.size = 0
      this.renameFileDate.createTime = 0
      this.httpPost('/file/rename', this.renameFileDate, (json) => {
        if (json.status === 200) {
          this.message = '修改成功！'
          this.color = 'success'
        } else {
          this.message = '修改失败！' + json.message
          this.color = 'error'
        }
        this.snackbar = true
        this.showRename = false
        this.newName = ''
        this.initialize()
      })
    },
    deleteItem(item) {
      this.deleteItemDate = item
      this.showDelete = true
    },
    deleteFile() {
      this.deleteItemDate.size = 0
      this.deleteItemDate.createTime = 0
      fetch(`/api/file/delete`, {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'X-XSRF-TOKEN': this.$cookies.get('XSRF-TOKEN')
        },
        method: 'DELETE',
        credentials: 'include',
        body: JSON.stringify(this.deleteItemDate)
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.status === 200) {
            this.message = '删除成功！'
            this.color = 'success'
          } else {
            this.message = '删除失败！' + json.message
            this.color = 'error'
          }
          this.showDelete = false
          this.snackbar = true
          this.initialize()
          this.getDiskMessage()
        })
        .catch((e) => {
          return null
        })
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
    }
  }
}
</script>
<style scoped>
/* ===== 通用弹框 ===== */
.dlg {
  border-radius: 16px;
  padding-top: 8px;
}

.dlg__head {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding-top: 20px;
  text-align: center;
}

.dlg__icon {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin-bottom: 6px;
}

.dlg__icon--error {
  background: rgba(var(--v-theme-error), 0.1);
  color: rgb(var(--v-theme-error));
}

.dlg__icon--primary {
  background: rgba(var(--v-theme-primary), 0.1);
  color: rgb(var(--v-theme-primary));
}

.dlg__icon--success {
  background: rgba(var(--v-theme-success), 0.12);
  color: rgb(var(--v-theme-success));
}

.dlg__icon--purple {
  background: rgba(103, 58, 183, 0.1);
  color: #673ab7;
}

.dlg__title {
  font-size: 17px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.8);
}

.dlg__subtitle {
  font-size: 13px;
  color: rgba(0, 0, 0, 0.45);
}

.dlg__target {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
}

.dlg__target-icon {
  flex-shrink: 0;
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}

.dlg__target-name {
  font-size: 14px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.75);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dlg__link {
  padding: 14px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.04);
  border: 1px dashed rgba(0, 0, 0, 0.14);
  font-size: 13px;
  line-height: 1.8;
  color: rgba(0, 0, 0, 0.65);
  white-space: pre-line;
  word-break: break-all;
  user-select: all;
}

/* ===== 页面头部 ===== */
.file-hero {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 26px 30px;
  margin-bottom: 20px;
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

.file-hero::before,
.file-hero::after {
  content: '';
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
  pointer-events: none;
}

.file-hero::before {
  right: -48px;
  top: -72px;
  width: 200px;
  height: 200px;
}

.file-hero::after {
  right: 90px;
  bottom: -90px;
  width: 150px;
  height: 150px;
  background: rgba(255, 255, 255, 0.08);
}

.file-hero__icon {
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

.file-hero__body {
  position: relative;
  z-index: 1;
  min-width: 0;
  flex: 1;
}

.file-hero__label {
  font-size: 13px;
  opacity: 0.85;
  letter-spacing: 2px;
}

.file-hero__title {
  font-size: clamp(20px, 3vw, 28px);
  font-weight: 700;
  line-height: 1.35;
  margin: 4px 0 10px;
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
  background: rgba(255, 255, 255, 0.2);
  font-size: 13px;
  white-space: nowrap;
}

.file-hero__refresh {
  position: relative;
  z-index: 1;
  flex-shrink: 0;
}

/* ===== 文件卡片 ===== */
.sk-card {
  border: 1px solid rgba(0, 0, 0, 0.06);
}

.file-card {
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  margin-bottom: 10px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
}

.file-card:hover {
  border-color: rgba(25, 118, 210, 0.35);
  box-shadow: 0 4px 16px rgba(25, 118, 210, 0.1);
  transform: translateY(-1px);
}

.file-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
}

.file-icon {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.file-info {
  flex: 1;
  min-width: 0;
}

.file-name {
  font-size: 15px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.87);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.file-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 5px;
}

.meta-item {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12.5px;
  color: rgba(0, 0, 0, 0.45);
  white-space: nowrap;
}

.meta-item--shared {
  color: #673ab7;
  background: rgba(103, 58, 183, 0.08);
  padding: 2px 10px;
  border-radius: 999px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.meta-item--shared:hover {
  background: rgba(103, 58, 183, 0.16);
}

.file-actions {
  display: flex;
  align-items: center;
  gap: 2px;
  flex-shrink: 0;
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
  .file-hero {
    padding: 20px;
    gap: 14px;
    flex-wrap: wrap;
  }

  .file-hero__icon {
    width: 46px;
    height: 46px;
    border-radius: 12px;
  }

  .file-hero__refresh {
    width: 100%;
  }

  .file-item {
    gap: 10px;
    padding: 12px;
    flex-wrap: wrap;
  }

  .file-icon {
    width: 40px;
    height: 40px;
    border-radius: 10px;
  }

  .file-meta {
    gap: 8px;
  }

  .file-actions {
    /* 独占一行，避免挤压文件名/元信息；按钮靠右排列 */
    flex: 1 1 100%;
    justify-content: flex-end;
    border-top: 1px solid rgba(0, 0, 0, 0.06);
    padding-top: 8px;
  }
}
</style>
