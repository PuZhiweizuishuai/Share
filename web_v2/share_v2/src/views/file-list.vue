<template>
  <v-container fluid>
    <v-data-table-server
      density="compact"
      :headers="headers"
      :items="fileList"
      v-model:page="page"
      item-value="createTime"
      v-model:items-per-page="size"
      @update:options="pageChange"
      :loading="loading"
      :mobile="mobileStatus"
      v-resize="onResize"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title
            >已使用空间：{{ useSize }} 系统剩余空间：{{ availableDisk }}</v-toolbar-title
          >
          <v-divider class="mx-4" inset vertical />
          <v-spacer />
          <v-btn color="primary" @click="initialize">刷新文件列表</v-btn>
        </v-toolbar>
      </template>
      <template v-slot:item.uploadFilename="{ item }">
        <v-tooltip
          v-if="item.uploadFilename.length >= 40"
          location="top"
          :text="item.uploadFilename"
        >
          <template v-slot:activator="{ props }">
            <span v-bind="props">
              {{ showFileName(item.uploadFilename) }}
            </span>
          </template>
        </v-tooltip>
        <span v-else>
          {{ showFileName(item.uploadFilename) }}
        </span>
      </template>
      <template v-slot:item.path="{ item }">
        <a
          class="overflow-auto"
          :href="`${item.path}?filename=${encodeURIComponent(item.uploadFilename)}&type=inline`"
          target="_blank"
        >
          {{ item.path }}
        </a>
      </template>
      <!-- 分享状态 -->
      <template v-slot:item.status="{ item }">
        <v-tooltip v-if="item.publicUser" location="start" text="已共享，点击查看信息！">
          <template v-slot:activator="{ props }">
            <v-btn
              class="mr-2"
              variant="outlined"
              density="compact"
              color="deep-purple"
              v-bind="props"
              @click="showShareStatus(item)"
            >
              已共享
            </v-btn>
          </template>
        </v-tooltip>
      </template>

      <!-- 操作 -->
      <template v-slot:item.actions="{ item }">
        <v-tooltip location="start" text="下载">
          <template v-slot:activator="{ props }">
            <v-btn
              class="mr-2"
              icon="mdi-download"
              density="compact"
              color="success"
              v-bind="props"
              target="_blank"
              :href="`${item.path}?filename=${encodeURIComponent(
                item.uploadFilename
              )}&type=attachment`"
            >
            </v-btn>
          </template>
        </v-tooltip>
        <v-tooltip v-if="showShareBtn" location="start" text="分享">
          <template v-slot:activator="{ props }">
            <v-btn
              @click="showShareFileDilog(item)"
              class="mr-2"
              icon="mdi-share"
              density="compact"
              color="blue"
              v-bind="props"
            >
            </v-btn>
          </template>
        </v-tooltip>
        <v-tooltip location="start" text="重命名">
          <template v-slot:activator="{ props }">
            <v-btn
              class="mr-2"
              icon="mdi-pencil"
              density="compact"
              v-bind="props"
              @click="editItem(item)"
            >
            </v-btn>
          </template>
        </v-tooltip>
        <v-tooltip location="start" text="删除文件">
          <template v-slot:activator="{ props }">
            <v-btn
              class="mr-2"
              density="compact"
              icon="mdi-delete"
              color="error"
              v-bind="props"
              @click="deleteItem(item)"
            >
            </v-btn>
          </template>
        </v-tooltip>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
      <template v-slot:bottom>
        <div class="text-center pt-2">
          <v-pagination
            v-model="page"
            color="blue"
            :total-visible="5"
            :length="pageCount"
            rounded="circle"
          ></v-pagination>
        </div>
      </template>
    </v-data-table-server>

    <v-dialog v-model="showDelete" max-width="490">
      <v-card>
        <v-card-title class="headline">你确定要删除这个文件吗？</v-card-title>
        <v-card-text>
          <span v-text="deleteItemDate.uploadFilename" /> <br /><br />
          删除后将无法恢复，请谨慎操作！！！
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="green darken-1" text @click="showDelete = false"> 放弃 </v-btn>
          <v-btn color="error" text @click="deleteFile()"> 确认 </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="showRename" max-width="490">
      <v-card>
        <v-card-title class="headline">修改文件名</v-card-title>
        <v-card-text> 原文件名：<span v-text="renameFileDate.uploadFilename" /> </v-card-text>
        <v-text-field
          v-model="newName"
          variant="underlined"
          style="margin-right: 20px; margin-left: 20px"
          label="新文件名"
        />
        <v-card-actions>
          <v-spacer />
          <v-btn color="green darken-1" text @click="showRename = false"> 放弃 </v-btn>
          <v-btn color="error" text @click="reNameOk"> 确认 </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 分享弹框 -->
    <v-dialog v-model="showShareDialog" max-width="490">
      <v-card>
        <v-card-title class="headline">你要将这份文件分享出去吗？</v-card-title>

        <v-card-text>
          <p>
            <span v-text="shareItem.uploadFilename" /><br />
            分享后在任何人均可查看
          </p>
          <p>
            <v-row justify="center">
              <v-col>
                <v-switch
                  v-model="shareItem.haveUserSeeKey"
                  color="blue"
                  label="是否启用密码"
                ></v-switch>
              </v-col>
            </v-row>
            <v-row justify="center" v-show="shareItem.haveUserSeeKey">
              <v-col>
                <v-text-field
                  v-model="shareItem.userSeeKey"
                  placeholder="密码"
                  label="密码"
                  clearable
                  variant="underlined"
                />
              </v-col>
            </v-row>
          </p>
        </v-card-text>

        <v-card-actions>
          <v-spacer />

          <v-btn color="green darken-1" text @click="showShareDialog = false"> 放弃 </v-btn>

          <v-btn color="error" text @click="sendSaveShare()"> 确认 </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 分享成功弹窗 -->
    <v-dialog v-model="showseccussShareDialog" max-width="490">
      <v-card>
        <v-card-title class="headline">分享成功，复制下面内容给你的好友吧！</v-card-title>
        <v-card-text>
          {{ successShareInfo }}
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- 查看取消分享弹窗 -->
    <v-dialog v-model="showSeeShareStatusDialog" max-width="490">
      <v-card>
        <v-card-title class="headline">分享</v-card-title>
        <v-card-text>
          {{ successShareInfo }}
        </v-card-text>
        <v-card-actions>
          <v-spacer />

          <v-btn color="green darken-1" text @click="showSeeShareStatusDialog = false">
            关闭
          </v-btn>

          <v-btn color="error" v-if="showShareBtn" text @click="cancelShare()"> 取消分享 </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar" :color="color" :timeout="3000" :top="true">
      {{ message }}
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  name: 'File',
  data: () => ({
    dialog: false,
    headers: [
      {
        align: 'start',
        title: '上传日期',
        sortable: false,
        key: 'createTime'
      },
      { title: '文件名', sortable: false, key: 'uploadFilename' },
      { title: '路径', sortable: false, key: 'path' },
      { title: '大小', sortable: false, key: 'size' },
      { title: '状态', sortable: false, key: 'status' },
      { title: '操作', key: 'actions', sortable: false }
    ],
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
    windowSize: { x: window.innerWidth, y: window.innerHeight },
    mobileStatus: false,
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
    showShareStatusItme: {}
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
      this.successShareInfo = `链接：${location.origin}/share/file/${this.showShareStatusItme.url}`
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
          this.successShareInfo = `链接：${location.origin}/share/file/${json.data.url}`
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
    onResize() {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight }
      if (this.windowSize.x <= 800) {
        this.mobileStatus = true
      } else {
        this.mobileStatus = false
      }
    },
    pageChange({ page, itemsPerPage, sortBy }) {
      this.loading = true
      this.page = page
      this.$router.push({
        path: this.$router.path,
        query: { page: page }
      })
      this.initialize()
    },
    getDiskMessage() {
      fetch('/api/upload/disk', {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'X-XSRF-TOKEN': this.$cookies.get('XSRF-TOKEN')
        },
        method: 'GET',
        credentials: 'include'
      })
        .then((response) => response.json())
        .then((json) => {
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
        .catch((e) => {
          return null
        })
    },
    initialize() {
      fetch(`/api/file/list?page=${this.page}&size=${this.size}`, {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'X-XSRF-TOKEN': this.$cookies.get('XSRF-TOKEN')
        },
        method: 'GET',
        credentials: 'include'
      })
        .then((response) => response.json())
        .then((json) => {
          for (var i = 0; i < json.page.content.length; i++) {
            json.page.content[i].createTime = this.formateTimeToChinese(
              json.page.content[i].createTime
            )
            json.page.content[i].size = this.showSize(json.page.content[i].size)
          }
          this.fileList = json.page.content
          this.total = json.page.totalElements
          this.pageCount = json.page.totalPages
          this.loading = false
        })
        .catch((e) => {
          return null
        })
    },
    editItem(item) {
      this.renameFileDate = item
      this.showRename = true
    },
    reNameOk() {
      console.log('ok')
      if (this.newName === '') {
        return
      }
      this.renameFileDate.uploadFilename = this.newName
      this.renameFileDate.size = 0
      this.renameFileDate.createTime = 0
      fetch(`/api/file/rename`, {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'X-XSRF-TOKEN': this.$cookies.get('XSRF-TOKEN')
        },
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(this.renameFileDate)
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.status === 200) {
            this.message = '修改成功！'
            this.color = 'success'
          } else {
            this.message = '修改失败！' + json.message
            this.color = 'error'
          }
          this.snackbar = true
          this.showRename = false
          this.initialize()
        })
        .catch((e) => {
          return null
        })
    },
    deleteItem(item) {
      this.deleteItemDate = item
      this.showDelete = true
    },
    deleteFile() {
      console.log(this.deleteItemDate)
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

            this.initialize()
            this.getDiskMessage()
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
      size = size / 1024
      if (size < 1024) {
        return size.toFixed(2) + ' KB'
      }
      return (size / 1024).toFixed(2) + ' M'
    }
  }
}
</script>
<style scoped>
a {
  color: #2196f3;
}
</style>