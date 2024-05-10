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
                <v-btn
                  @click="showShareInfo(item)"
                  style="float: right"
                  end
                  text
                  small
                  color="blue"
                >
                  <v-icon icon="mdi-share"></v-icon>
                  分享
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
    <!-- 删除弹框 -->
    <v-dialog v-model="showDelete" max-width="490">
      <v-card>
        <v-card-title class="headline">你确定要删除这条分享吗？</v-card-title>

        <v-card-text>
          <span v-text="subString(deleteData.data)" /> <br /><br />
          删除后将无法恢复，请谨慎操作！！！
        </v-card-text>

        <v-card-actions>
          <v-spacer />

          <v-btn color="green darken-1" text @click="showDelete = false"> 放弃 </v-btn>

          <v-btn color="error" text @click="deleteShare()"> 确认 </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- 分享弹框 -->
    <v-dialog v-model="showShareDialog" max-width="490">
      <v-card>
        <v-card-title class="headline">你要将这条分享出去吗？</v-card-title>

        <v-card-text>
          <p>
            <span v-text="subString(shareItem.data)" /><br />
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
      },
      showShareDialog: false,
      shareItem: {
        haveUserSeeKey: false,
        userSeeKey: ''
      },
      showseccussShareDialog: false,
      successShareInfo: ''
    }
  },
  created() {},
  methods: {
    showShareInfo(item) {
      this.showShareDialog = true
      this.shareItem = item
    },
    sendSaveShare() {
      this.httpPost(`/public/share`, this.shareItem, (json) => {
        if (json.data != null) {
          this.successShareInfo = `链接：${location.href}share/share/${json.data.url}`
          if (this.shareItem.haveUserSeeKey) {
            this.successShareInfo += `\n密码：${this.shareItem.userSeeKey}`
          }
          this.showseccussShareDialog = true
          this.showShareDialog = false
        } else {
          this.message = json.message
          this.snackbar = true
        }
      })
    },
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
    subString(data) {
      if (data.length > 30) {
        return data.substring(0, 30) + '......'
      }
      return data
    }
  }
}
</script>
