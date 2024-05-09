<template>
  <v-container>
    <v-row>
      <v-col v-for="item in shareList" :key="item.id" cols="12">
        <v-card>
          <v-card-actions style="padding-bottom: 0px; padding-top: 0px">
            <v-row>
              <v-col style="padding-bottom: 0px; padding-top: 0px">
                <v-list-item-title
                  >创建时间： <span v-text="formateTimeToChinese(item.createTime)" />
                </v-list-item-title>
              </v-col>
              <v-col style="padding-bottom: 0px; padding-top: 0px">
                <v-btn
                  style="float: right"
                  end
                  text
                  small
                  color="error"
                  @click="showDeleteDialog(item)"
                >
                  <v-icon icon="mdi-delete"></v-icon>
                  删除
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
          <v-divider />
          <v-card-text>
            <ShowHtml v-if="item.editType == 1" :text="item.data" />
            <ShowMarkdown v-else :markdown="item.data" :speech="false" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="showDelete" max-width="490">
      <v-card>
        <v-card-title class="headline">你确定要删除这条分享吗？</v-card-title>

        <v-card-text>
          <span v-text="subString()" /> <br /><br />
          删除后将无法恢复，请谨慎操作！！！
        </v-card-text>

        <v-card-actions>
          <v-spacer />

          <v-btn color="green darken-1" text @click="showDelete = false"> 放弃 </v-btn>

          <v-btn color="error" text @click="deleteShare()"> 确认 </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar" :color="'success'" :timeout="3000" :top="true">
      {{ message }}
    </v-snackbar>
  </v-container>
</template>

<script>
import ShowMarkdown from '@/components/vditor/show-markdown.vue'
import ShowHtml from '@/components/wangeditor/show-html.vue'
export default {
  name: 'ShareList',
  components: { ShowMarkdown, ShowHtml },
  props: {
    shareList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
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
      key: '',
      interval: () => {
        return null
      }
    }
  },
  created() {},
  methods: {
    deleteShare() {
      this.httpPost(`/share/delete`, this.deleteData, (json) => {
        if (json.status === 200) {
          this.message = '删除成功！'
          this.snackbar = true
          this.showDelete = false
          // this.getShareList()
          this.$emit('delete', true)
        } else {
          this.message = '删除失败！' + json.message
          this.snackbar = true
          this.$emit('delete', false)
        }
      })
    },
    showDeleteDialog(value) {
      this.deleteData = value
      this.showDelete = true
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
    subString() {
      if (this.deleteData.data.length > 30) {
        return this.deleteData.data.substring(0, 30) + '......'
      }
      return this.deleteData.data
    }
  }
}
</script>
