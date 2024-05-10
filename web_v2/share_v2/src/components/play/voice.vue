<template>
  <div id="aplayer" />
</template>

<script>
import APlayer from 'aplayer'
import 'aplayer/dist/APlayer.min.css'

export default {
  props: {
    voice: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      ap: null,
      vioceData: this.voice
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.ap = new APlayer({
        container: document.querySelector('#aplayer'),
        audio: [
          {
            name: this.vioceData.uploadFilename,
            url: `${this.vioceData.path}?filename=${encodeURIComponent(
              this.vioceData.uploadFilename
            )}&type=inline&key=${encodeURIComponent(this.vioceData.userSeeKey)}`
          }
        ]
      })
    },
    destroy() {
      this.ap.destroy()
    }
  }
}
</script>

<style>
</style>
