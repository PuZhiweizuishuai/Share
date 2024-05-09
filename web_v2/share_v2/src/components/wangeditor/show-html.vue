<template>
  <div>
    <Editor
      v-model="html"
      style="overflow-y: hidden;"
      :default-config="editorConfig"
      :mode="mode"
    />
  </div>
</template>

<script>
import { Editor } from '@wangeditor/editor-for-vue'

export default {
  components: { Editor },
  props: {
    text: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      editor: null,
      html: this.text,
      toolbarConfig: { },
      editorConfig: { readOnly: true },
      mode: 'default' // or 'simple'
    }
  },
  mounted() {
    // 模拟 ajax 请求，异步渲染编辑器
    // setTimeout(() => {
    //   this.html = '<p>模拟 Ajax 异步设置内容 HTML</p>'
    // }, 1500)
  },
  beforeDestroy() {
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁编辑器
  },
  methods: {
  }
}
</script>

<style src="@wangeditor/editor/dist/css/style.css"></style>
