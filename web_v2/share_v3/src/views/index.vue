<template>
  <v-container fluid>
    <v-app-bar color="primary">
      <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title style="width: 150px" class="ml-0 pl-4">
        <router-link style="color: #fff" :to="'/'">
          <span class="hidden-sm-and-down">分享点啥</span>
        </router-link>
      </v-toolbar-title>
      <v-text-field
        v-model="searchText"
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="搜索"
        @keydown="search"
      />
      <v-spacer />
      <v-tooltip location="start" text="新建分享">
        <template v-slot:activator="{ props }">
          <v-btn icon v-bind="props" large @click="showShare = true">
            <v-icon icon="mdi-plus"></v-icon>
          </v-btn>
        </template>
      </v-tooltip>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer">
      <v-list density="compact">
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :value="item"
          color="primary"
          :href="`#${item.link}`"
        >
          <template v-slot:prepend>
            <v-icon :icon="item.icon"></v-icon>
          </template>

          <v-list-item-title>{{ item.text }}</v-list-item-title>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>
      <a style="color: black" href="/unlock-music/index.html" target="_blank">
        <v-list-item color="primary">
          <template v-slot:prepend>
            <v-icon icon="mdi-music"></v-icon>
          </template>
          <v-list-item-title>音乐解密</v-list-item-title>
        </v-list-item>
      </a>
    </v-navigation-drawer>
    <v-bottom-sheet v-model="showShare">
      <v-sheet height="700">
        <Vditor
          v-if="editType == 0"
          ref="childvditor"
          :placeholder="'写点什么分享吧'"
          :uploadurl="'/api/upload'"
          :markdown="shareData"
          @vditor-input="getShareData"
        />

        <v-row v-if="editType == 1" justify="center">
          <v-col cols="11">
            <Editor ref="wangeditor" @edit-value="getShareData" />
          </v-col>
        </v-row>

        <div class="text-center">
          <v-btn color="primary" class="mt-6" large @click="submitShare">分享</v-btn>
        </div>
      </v-sheet>
    </v-bottom-sheet>

    <v-main style="padding-top: 36px">
      <router-view v-slot="{ Component }">
        <component :is="Component" ref="child" />
      </router-view>
    </v-main>

    <v-snackbar v-model="snackbar" :color="color" :timeout="3000" :top="true">
      {{ message }}
    </v-snackbar>
    <BackToTop v-show="fab" />
    <v-footer class="font-weight-medium">
      <v-col class="text-center" cols="12">
        <a style="color: #42A5F5;" href="https://www.buguagaoshu.com" target="_blank"><strong>不挂高数</strong></a> ©2020 -
        {{ new Date().getFullYear() }} Created by
        <a style="color: #42A5F5;" color="blue" href="https://vuetifyjs.com/" target="_blank"><strong>Vuetify</strong></a>
      </v-col>
    </v-footer>
  </v-container>
</template>


<script>
import BackToTop from '@/components/back-to-top.vue'
import Vditor from '@/components/vditor/vditor.vue'
import Editor from '@/components/wangeditor/wang-editor.vue'
export default {
  components: { BackToTop, Vditor, Editor },
  data: () => ({
    fab: false,
    drawer: false,
    group: null,
    items: [
      { icon: 'mdi-share', text: '分享列表', link: '/' },
      { icon: 'mdi-file', text: '文件列表', link: '/file' },
      { icon: 'mdi-text', text: '二维码分享', link: '/qrcode' },
      { icon: 'mdi-lock', text: '加密解密', link: '/aes' },
      { icon: 'mdi-wrench', text: '设置', link: '/setting' },
      { icon: 'mdi-help', text: '关于', link: '/about' }
    ],
    showShare: false,
    dialog: false,
    shareData: '',
    snackbar: false,
    searchText: '',
    color: 'success',
    message: '分享成功',
    editType: 0
  }),

  watch: {
    group() {
      this.drawer = false
    }
  },
  created() {
    this.setEditType()
    window.addEventListener('scroll', this.onScroll, true)
  },
  methods: {
    onScroll() {
      if (document.documentElement.scrollTop > 250) {
        this.fab = true
      } else {
        this.fab = false
      }
    },
    getShareData(value) {
      this.shareData = value
    },
    submitShare() {
      if (this.shareData === '') {
        return
      }
      const data = {
        data: this.shareData,
        editType: this.editType
      }

      this.httpPost('/share/save', data, (json) => {
        if (json.status === 200) {
          this.message = '分享成功!'
          this.color = 'success'
          this.snackbar = true
          this.showShare = false
          this.shareData = ''
          if (this.editType === 0) {
            this.$refs.childvditor.clean()
          } else {
            this.$refs.wangeditor.clean()
          }
        } else {
          this.message = '分享失败！' + json.message
          this.color = 'error'
          this.snackbar = true
        }

        //this.$refs.shareListView.getShareList()
        this.$refs.child.getShareList()
      })
    },
    setEditType() {
      this.httpGet('/upload/disk', (json) => {
        this.editType = json.data.editType
      })
    },
    search(e) {
      if (e.key === 'Enter') {
        if (this.searchText === '') {
          return
        }

        if (this.$route.path === '/search') {
          this.$router.push({
            path: this.$router.path,
            query: { key: this.searchText }
          })
          this.$refs.child.setKey(this.searchText)
          this.$refs.child.getShareList()
        } else {
          this.$router.push({ path: '/search', query: { key: this.searchText } })
        }

        this.searchText = ''
      }
    }
  }
}
</script>

<style scoped>

</style>