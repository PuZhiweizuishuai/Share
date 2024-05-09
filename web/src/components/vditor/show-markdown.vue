<template>
  <div>
    <div ref="markdownView" />
  </div>
</template>

<script>
import Vditor from 'vditor'
import '~vditor/src/assets/less/index'
export default {
  name: 'ShowMarkdown',
  props: {
    markdown: {
      type: String,
      default: ''
    },
    speech: {
      type: Boolean,
      default: true
    },
    anchor: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      markdownText: this.markdown,
      speechValue: this.speech,
      anchorNum: this.anchor
    }
  },
  mounted() {
    this.previevMarkdown()
  },
  updated() {

  },
  methods: {
    previevMarkdown() {
      Vditor.preview(this.$refs.markdownView,
        this.markdownText, {
          cdn: '/vditor',
          theme: {
            path: '/vditor/dist/css/content-theme'
          },
          speech: {
            enable: this.speech
          },
          emojiPath: '/emoji',
          anchor: this.anchorNum,
          markdown: {
          }
        })
    }
  }
}

</script>
