<template>
  <div style="border: 1px solid #ccc;">
    <Toolbar
      v-if="showEdit"
      style="border-bottom: 1px solid #ccc"
      :editor="editor"
      :default-config="toolbarConfig"
      :mode="mode"
    />
    <Editor
      v-if="showEdit"
      v-model="html"
      style="height: 450px; overflow-y: hidden;"
      :default-config="editorConfig"
      :mode="mode"
      @onCreated="onCreated"
      @onChange="onChange"
      @onBlur="onBlur"
    />
    <v-snackbar
      v-model="snackbar"
      :color="color"
      :timeout="3000"
      :top="true"
    >
      {{ message }}
    </v-snackbar>
  </div>
</template>

<script>
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

export default {
  components: { Editor, Toolbar },
  data() {
    return {
      snackbar: false,
      color: 'success',
      message: '分享成功',
      editor: null,
      html: '',
      filemax: 1024 * 1024,
      toolbarConfig: { },
      showEdit: false,
      editorConfig: {
        placeholder: '请输入内容...',
        MENU_CONF: {
          uploadImage: {
            fieldName: 'files',
            server: '/api/upload?type=1',
            maxFileSize: 1024 * 1024 * 1024, // 1M
            maxNumberOfFiles: 9,
            allowedFileTypes: [],
            headers: {
              'X-XSRF-TOKEN': this.$cookies.get('XSRF-TOKEN')
            },
            withCredentials: true,
            onSuccess(file, res) {
              console.log(`${file.name} 上传成功`, res)
            },
            onError(file, err, res) {
              console.log(`${file.name} 上传出错`, err, res)
            }
            // customInsert(res, insertFn) {
            //   // res 即服务端的返回结果
            //   console.log(res)
            //   if (res.code === 0) {
            //     for (const name in Object.keys(res.data.succMap)) {
            //       insertFn(res.data.succMap[name], name, res.data.succMap[name])
            //     }
            //   }

            //   // const url = res.data.succMap.
            //   // 从 res 中找到 url alt href ，然后插图图片
            //   // insertFn(url, alt, href)
            // }
          },
          uploadVideo: {
            fieldName: 'files',
            server: '/api/upload?type=1',
            maxFileSize: 1024 * 1024 * 1024, // 1M
            maxNumberOfFiles: 9,
            allowedFileTypes: [],
            headers: {
              'X-XSRF-TOKEN': this.$cookies.get('XSRF-TOKEN')
            },
            withCredentials: true,
            onSuccess(file, res) {
              console.log(`${file.name} 上传成功`, res)
            },
            onError(file, err, res) {
              console.log(`${file.name} 上传出错`, err, res)
            }
          }
        }
      },

      mode: 'default' // or 'simple'
    }
  },
  created() {
    this.httpGet('/upload/disk', (json) => {
      this.filemax = json.data.uploadFileMax * 1024 * 1024
      this.showEdit = true
    })
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
    onCreated(editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
    },
    onChange(editor) {
      this.$emit('edit-value', editor.getHtml())
    },
    onBlur(editor) {
      console.log('onBlur', editor.getHtml())
      this.$emit('edit-value', editor.getHtml())
    },
    clean() {
      this.editor.clear()
    },
    conSuccess(file, res) {
      this.message = `${file.name} 上传出错`
      this.color = 'success'
      this.snackbar = true
      console.log(`${file.name} 上传成功`, res)
    },
    conError(file, err, res) {
      this.message = `${file.name} 上传出错`
      this.color = 'error'
      this.snackbar = true
      console.log(`${file.name} 上传出错`, err, res)
    }
  }
}
</script>

<style src="@wangeditor/editor/dist/css/style.css"></style>
