<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <v-list dense>
        <router-link v-for="item in items" :key="item.text" :to="item.link">
          <v-list-item
            link
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>

          </v-list-item>
        </router-link>
        <a href="/unlock-music/index.html" target="_blank">
          <v-list-item
            link
          >
            <v-list-item-action>
              <v-icon>mdi-music</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                音乐解密
              </v-list-item-title>
            </v-list-item-content>

          </v-list-item>
        </a>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-3"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title
        style="width: 150px"
        class="ml-0 pl-4"
      >
        <span class="hidden-sm-and-down">分享点啥</span>
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
      <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            large
            v-on="on"
            @click="showShare = true"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <span>新建分享</span>
      </v-tooltip>
    </v-app-bar>
    <v-main>
      <router-view ref="shareListView" />
    </v-main>
    <v-bottom-sheet v-model="showShare">
      <v-sheet height="700">
        <Vditor ref="childvditor" :placeholder="'写点什么分享吧'" :uploadurl="'/api/upload'" :markdown="shareData" @vditor-input="getShareData" />

        <div class="text-center">
          <v-btn
            color="primary"
            class="mt-6"
            large
            @click="submitShare"
          >分享</v-btn>
        </div>
      </v-sheet>
    </v-bottom-sheet>
    <v-snackbar
      v-model="snackbar"
      :color="color"
      :timeout="3000"
      :top="true"
    >
      {{ message }}
    </v-snackbar>
    <BackToTop />
    <v-footer

      class="font-weight-medium"
    >
      <v-col
        class="text-center"
        cols="12"
      >
        <a href="https://www.buguagaoshu.com" target="_blank"><strong>不挂高数</strong></a> ©2020 - {{ new Date().getFullYear() }}  Created by
        <a href="https://vuetifyjs.com/" target="_blank"><strong>Vuetify</strong></a>
      </v-col>
    </v-footer>
  </div>
</template>

<script>
import BackToTop from '@/components/back-to-top.vue'
import Vditor from '@/components/vditor/vditor.vue'
export default {
  components: { BackToTop, Vditor },
  data: () => ({
    showShare: false,
    dialog: false,
    drawer: null,
    shareData: '',
    snackbar: false,
    searchText: '',
    color: 'success',
    message: '分享成功',
    items: [
      { icon: 'mdi-share', text: '分享列表', link: '/' },
      { icon: 'mdi-file', text: '文件列表', link: '/file' },
      { icon: 'mdi-text', text: '二维码分享', link: '/qrcode' },
      { icon: 'mdi-wrench', text: '设置', link: '/setting' },
      { icon: 'mdi-help', text: '关于', link: '/about' }
    ]
  }),
  methods: {
    search(e) {
      if (e.key === 'Enter') {
        if (this.searchText === '') {
          return
        }
        console.log(this.$route.path)
        if (this.$route.path === '/search') {
          this.$refs.shareListView.setKey(this.searchText)
          this.$refs.shareListView.getShareList()
        } else {
          this.$router.push({ path: '/search', query: { key: this.searchText }})
          // this.$refs.shareListView.setKey(this.searchText)
          // this.$refs.shareListView.getShareList()
        }

        this.searchText = ''
      }
    },
    submitShare() {
      if (this.shareData === '') {
        return
      }
      const data = {
        'data': this.shareData
      }
      fetch('/api/share/save', {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'X-XSRF-TOKEN': this.$cookies.get('XSRF-TOKEN')
        },
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(data)
      }).then(response => response.json())
        .then(json => {
          if (json.status === 200) {
            this.message = '分享成功!'
            this.color = 'success'
            this.snackbar = true
            this.showShare = false
            this.shareData = ''
            this.$refs.childvditor.clean()
          } else {
            this.message = '分享失败！' + json.message
            this.color = 'error'
            this.snackbar = true
          }
          this.$refs.shareListView.getShareList()
        })
        .catch(e => {
          return null
        })
    },
    getShareData(value) {
      this.shareData = value
    }
  }
}
</script>

<style>
  a {
    text-decoration: none
  }

</style>
