<template>
  <v-container>
    <v-col></v-col>
    <v-row justify="center">
      <v-tooltip text="为保护媒体资源，如果视频或图片不显示，请点击此按钮">
        <template v-slot:activator="{ props }">
          <v-btn @click="addLinkKey()" color="blue" v-bind="props"> 加载 </v-btn>
        </template>
      </v-tooltip>
    </v-row>
    <v-col></v-col>
    <v-card v-if="showShareRes">
      <!--  -->
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
    <!-- 密码输入弹框 -->
    <v-dialog v-model="showShareDialog" max-width="490">
      <v-card>
        <v-card-title class="headline">请输入密码</v-card-title>
        <v-card-text>
          <v-row justify="center">
            <v-col>
              <v-text-field
                v-model="userSeeKey"
                placeholder="密码"
                label="密码"
                clearable
                variant="underlined"
              />
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions>
          <v-spacer />

          <v-btn color="green darken-1" text @click="showShareDialog = false"> 放弃 </v-btn>

          <v-btn color="error" text @click="getShareData()"> 确认 </v-btn>
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
  mounted() {},
  methods: {
    getShare() {
      //
      this.httpGet(`/public/share/check?id=${this.$route.params.id}`, (json) => {
        //
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

<style>
</style>