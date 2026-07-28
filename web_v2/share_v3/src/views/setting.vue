<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="10">
        <v-card class="mx-auto" elevation="2">
          <v-card-title class="text-h6">设置</v-card-title>
          <v-divider />
          <v-card-text>
            <v-alert type="warning" density="compact" variant="tonal" class="mb-4">
              wangEditor(HTML) 编辑器的上传功能目前还不够成熟，有待更新！修改完成后请刷新浏览器。
            </v-alert>
            <v-select
              variant="underlined"
              v-model="editType"
              item-title="text"
              item-value="value"
              :items="items"
              label="编辑器选择"
              prepend-inner-icon="mdi-file-edit"
            />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" @click="settingFileMax()">修改</v-btn>
            <v-spacer />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar" :timeout="3000" :top="true" :color="snackbarColor">
      {{ message }}
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      fileMax: 0,
      snackbar: false,
      snackbarColor: 'info',
      message: '',
      editType: 0,
      items: [
        { text: 'Vditor(Markdown)', value: 0 },
        { text: 'wangEditor(HTML)', value: 1 }
      ]
    }
  },
  created() {
    this.getFileMax()
  },
  methods: {
    getFileMax() {
      this.httpGet('/upload/disk', (json) => {
        this.fileMax = json.data.uploadFileMax
        this.editType = json.data.editType
      })
    },
    checkNumber() {
      if (this.fileMax == null) {
        return false
      }
      if (isNaN(parseInt(this.fileMax))) {
        return false
      }
      return true
    },
    settingFileMax() {
      if (this.checkNumber()) {
        this.httpPost(`/upload/setting/filemax?type=setting`, {
          uploadFileMax: this.fileMax,
          editType: this.editType
        }, (json) => {
          this.message = json.message
          this.snackbarColor = json.status === 200 ? 'success' : 'error'
          this.snackbar = true
        })
      }
    }
  }
}
</script>

<style>
</style>
