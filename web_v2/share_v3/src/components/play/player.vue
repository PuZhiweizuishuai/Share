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
            text: '不挂高数',
            link: 'https://www.buguagaoshu.com'
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
