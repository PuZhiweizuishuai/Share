<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col>
        <v-card
          class="mx-auto"
          outlined
        >
          <v-row justify="center">
            <v-col cols="10">
              <h2>设置： </h2>
            </v-col>
          </v-row>
          <v-divider />

          <v-row justify="center">
            <v-col cols="8">
              <v-text-field
                v-model="fileMax"
                placeholder="上传文件最大大小（单位：M）"
                label="上传文件最大大小（单位：M）"
                clearable
                :rules="[() => checkNumber() || '必须是数字且不为空']"
              />
            </v-col>
            <v-col cols="2">
              <v-btn color="primary" @click="settingFileMax()">修改</v-btn>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="10">
              注意：修改完成后请刷新浏览器
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar
      v-model="snackbar"
      :timeout="3000"
      :top="true"
    >
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
      message: ''
    }
  },
  created() {
    this.getFileMax()
  },
  methods: {
    getFileMax() {
      fetch('/api/upload/disk', {
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'X-XSRF-TOKEN': this.$cookies.get('XSRF-TOKEN')
        },
        method: 'GET',
        credentials: 'include'
      }).then(response => response.json())
        .then(json => {
          this.fileMax = json.data.uploadFileMax
        })
        .catch(e => {
          return null
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
        fetch(`/api/upload/setting/filemax`, {
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'X-XSRF-TOKEN': this.$cookies.get('XSRF-TOKEN')
          },
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify(
            {
              'uploadFileMax': this.fileMax
            }
          )
        }).then(response => response.json())
          .then(json => {
            this.message = json.message
            this.snackbar = true
          })
          .catch(e => {
            return null
          })
      }
    }
  }
}
</script>

<style>

</style>
