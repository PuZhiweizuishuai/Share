<template>
  <v-container>
    <v-row>
      <v-col>
        <br>
        <span>当前共有 {{ total }} 条分享，当前页：{{ page }} </span>
      </v-col>
      <v-col>
        <v-switch
          v-model="auto"
          style="float: right"
          label="自动更新"
          @change="autoUpdate"
        />
      </v-col>
    </v-row>

    <v-divider />
    <v-row>
      <div id="share-top" />
      <v-col
        v-for="item in shareList"
        :key="item.id"
        cols="12"
      >

        <v-card outlined>
          <v-card-actions>
            <v-list-item-content>
              <v-list-item-title>创建时间： <span v-text="formateTimeToChinese(item.createTime)" /> </v-list-item-title>
            </v-list-item-content>
            <v-btn text small color="error" @click="showDeleteDialog(item)">
              <v-icon>mdi-delete</v-icon>
              删除
            </v-btn>

          </v-card-actions>
          <v-divider />
          <v-card-subtitle>
            <ShowMarkdown :markdown="item.data" :speech="false" />
          </v-card-subtitle>

        </v-card>
      </v-col>
    </v-row>
    <div class="text-center">
      <v-pagination
        v-model="page"
        :length="length"
        :total-visible="10"
        circle
        @input="pageChange"
      />
    </div>
    <v-dialog
      v-model="showDelete"
      max-width="490"
    >
      <v-card>
        <v-card-title class="headline">你确定要删除这条分享吗？</v-card-title>

        <v-card-text>
          <span v-text="subString()" /> <br><br>
          删除后将无法恢复，请谨慎操作！！！
        </v-card-text>

        <v-card-actions>
          <v-spacer />

          <v-btn
            color="green darken-1"
            text
            @click="showDelete = false"
          >
            放弃
          </v-btn>

          <v-btn
            color="error"
            text
            @click="deleteShare()"
          >
            确认
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="snackbar"
      :color="'success'"
      :timeout="3000"
      :top="true"
    >
      {{ message }}
    </v-snackbar>
  </v-container>
</template>

<script>
import ShowMarkdown from '@/components/vditor/show-markdown.vue'
export default {
  name: 'ShareList',
  components: { ShowMarkdown },
  data() {
    return {
      shareList: [],
      page: 1,
      length: 0,
      size: 15,
      total: 0,
      showDelete: false,
      deleteData: {
        data: ''
      },
      auto: false,
      snackbar: false,
      message: '删除成功',
      interval: () => { return null }
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
  methods: {
    autoUpdate() {
      if (this.auto) {
        this.interval = window.setInterval(() => {
          this.getShareList()
        }, 10000)
      } else {
        window.clearInterval(this.interval)
      }
    },
    deleteShare() {
      fetch(`/api/share/delete`, {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'X-XSRF-TOKEN': this.$cookies.get('XSRF-TOKEN')
        },
        method: 'DELETE',
        credentials: 'include',
        body: JSON.stringify(this.deleteData)
      }).then(response => response.json())
        .then(json => {
          if (json.status === 200) {
            this.message = '删除成功！'
            this.snackbar = true
            this.showDelete = false
            this.getShareList()
          } else {
            this.message = '删除失败！' + json.message
            this.snackbar = true
          }
        })
        .catch(e => {
          return null
        })
    },
    showDeleteDialog(value) {
      this.deleteData = value
      this.showDelete = true
    },
    getShareList() {
      fetch(`/api/share/list?page=${this.page}&size=${this.size}`, {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'X-XSRF-TOKEN': this.$cookies.get('XSRF-TOKEN')
        },
        method: 'GET',
        credentials: 'include'
      }).then(response => response.json())
        .then(json => {
          this.shareList = json.page.content
          this.total = json.page.totalElements
          this.length = json.page.totalPages
        })
        .catch(e => {
          return null
        })
    },
    formateTimeToChinese(date) {
      if (date === '' || date == null) {
        return ''
      }
      const da = new Date(date)
      return da.getFullYear() + '年' + (da.getMonth() + 1) + '月' + da.getDate() + '日 ' + da.getHours() + '时' + da.getMinutes() + '分'
    },
    pageChange(page) {
      this.page = page
      this.$router.push({
        path: this.$router.path,
        query: { page: page }
      })

      this.getShareList()
      document.querySelector('#share-top').scrollIntoView()
    },
    subString() {
      if (this.deleteData.data.length > 30) {
        return this.deleteData.data.substring(0, 30) + '......'
      }
      return this.deleteData.data
    }
  }
}
</script>
