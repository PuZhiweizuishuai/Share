<template>
  <v-container>
    <div v-if="showShareRes">
      <v-row justify="center">
        <h2>{{ item.uploadFilename }}</h2>
      </v-row>

      <v-col> <br /></v-col>
      <v-row>
        <v-col>
          <v-img
            v-if="getFileType(item) == 1"
            :src="`${item.path}?filename=${encodeURIComponent(
              item.uploadFilename
            )}&type=inline&key=${encodeURIComponent(item.userSeeKey)}`"
          ></v-img>
          <!-- 视频 -->
          <DPlayer v-if="getFileType(item) == 2" :video="item" />
          <!-- 音乐 -->
          <Voice v-if="getFileType(item) == 3" :voice="item" />
          <span v-if="getFileType(item) == 0" v-text="'暂不支持预览，请下载查看'"></span>
        </v-col>
      </v-row>

      <v-col> <br /></v-col>
      <v-row justify="center">
        <v-btn
          color="success"
          target="_blank"
          size="large"
          :href="`${item.path}?filename=${encodeURIComponent(
            item.uploadFilename
          )}&type=attachment&key=${encodeURIComponent(item.userSeeKey)}`"
        >
          下载
        </v-btn>
      </v-row>
    </div>
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
const IMG = ['jpg', 'jpeg', 'png', 'gif', 'ico', 'bmp', 'webp', 'tif']
const VIDEO = ['mp4', 'mkv', 'webm', 'mov', 'mpeg', 'm4v', 'avi', 'wmv', 'flv']
const MUSIC = ['mp3', 'wav', 'flac', 'ape', 'aac']
import DPlayer from '@/components/play/player.vue'
import Voice from '@/components/play/voice.vue'
export default {
  components: {
    DPlayer,
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
    console.log(this.$route.params.id)
  },
  methods: {
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
  
  <style>
</style>