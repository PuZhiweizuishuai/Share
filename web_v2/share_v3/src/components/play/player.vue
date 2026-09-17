<template>
  <div>
    <div ref="artplayer" class="artplayer-box" />
  </div>
</template>

<script>
import Artplayer from 'artplayer'
export default {
  name: 'Play',
  props: {
    video: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      videoData: this.video,
      art: null
    }
  },
  mounted() {
    this.init()
  },
  beforeUnmount() {
    if (this.art) {
      this.art.destroy(false)
      this.art = null
    }
  },
  methods: {
    init() {
      this.art = new Artplayer({
        container: this.$refs.artplayer,
        lang: 'zh-cn',
        screenshot: true,
        setting: true,
        fullscreen: true,
        fullscreenWeb: true,
        pip: true,
        url: `${this.videoData.path}?filename=${encodeURIComponent(
          this.videoData.uploadFilename
        )}&type=inline&key=${encodeURIComponent(this.videoData.userSeeKey)}`,
        contextmenu: [
          {
            html: '不挂高数出品',
            click: function (contextmenu) {
              window.open('https://www.buguagaoshu.com')
              contextmenu.show = false
            }
          }
        ]
      })
    }
  }
}
</script>

<style>
.artplayer-box {
  height: 500px;
}
</style>
