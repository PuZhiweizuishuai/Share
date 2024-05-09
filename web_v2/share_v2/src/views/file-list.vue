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
          <v-btn color="primary" dark class="mb-2" @click="initialize">刷新文件列表</v-btn>
        </v-toolbar>
      </template>
      <template v-slot:item.path="{ item }">
        <a
          :href="`${item.path}?filename=${encodeURIComponent(item.uploadFilename)}&type=inline`"
          target="_blank"
        >
          {{ item.path }}
        </a>
      </template>
      <template v-slot:item.actions="{ item }">
        <a
          :href="`${item.path}?filename=${encodeURIComponent(item.uploadFilename)}&type=attachment`"
          target="_blank"
        >
          <v-icon class="mr-2" density="compact" @click="downloadItem(item)" icon="mdi-download">
          </v-icon>
        </a>
        <v-tooltip location="start" text="重命名">
          <template v-slot:activator="{ props }">
            <v-btn icon="mdi-pencil" density="compact" v-bind="props" @click="editItem(item)">
            </v-btn>
          </template>
        </v-tooltip>
        <v-tooltip location="start" text="删除文件">
          <template v-slot:activator="{ props }">
            <v-btn
              density="compact"
              icon="mdi-delete"
              class="mr-2"
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
    <!-- <v-pagination
      v-model="page"
      :length="pageCount"
      circle
      :total-visible="10"
      @input="pageChange"
    /> -->

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
    mobileStatus: false
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
  },
  methods: {
    onResize() {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight }
      if (this.windowSize.x <= 600) {
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