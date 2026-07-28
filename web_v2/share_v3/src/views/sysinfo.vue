<template>
  <v-container fluid>
    <!-- 登录卡片 -->
    <v-row v-show="showLogin" justify="center" align="center">
      <v-col cols="12" sm="8" md="6" lg="6">
        <v-card class="mx-auto" elevation="2">
          <v-card-title class="text-h6">系统登录</v-card-title>
          <v-divider />
          <v-card-text>
            <v-text-field
              v-model="user.username"
              placeholder="账号"
              label="账号"
              clearable
              variant="underlined"
              prepend-inner-icon="mdi-account"
            />
            <v-text-field
              v-model="user.password"
              type="password"
              placeholder="密码"
              label="密码"
              variant="underlined"
              clearable
              prepend-inner-icon="mdi-lock"
            />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" @click="userLogin">登录</v-btn>
            <v-spacer />
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <template v-if="showSysInfo">
      <!-- IP 白名单 -->
      <v-row justify="center">
        <v-col cols="12" md="10" lg="10">
          <v-card class="mx-auto" elevation="2">
            <v-card-title class="text-h6">IP 白名单</v-card-title>
            <v-divider />
            <v-card-text>
              <v-list density="compact" v-if="items.length">
                <v-list-item v-for="(item, i) in items" :key="i" :value="item">
                  <v-list-item-title>{{ item.ip }} - 创建人：{{ item.createUser }}</v-list-item-title>
                  <template v-slot:prepend>
                    <v-btn color="error" @click="deleteIP(item)" density="compact" class="mr-4">删除</v-btn>
                  </template>
                </v-list-item>
              </v-list>
              <v-alert v-else type="info" density="compact" variant="tonal">暂无白名单</v-alert>
              <v-text-field
                v-model="ipdata"
                placeholder="IP"
                label="IP"
                clearable
                variant="underlined"
                prepend-inner-icon="mdi-ip"
              />
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn variant="outlined" @click="getWhitelist">刷新</v-btn>
              <v-btn color="green" @click="addWhitelIP">增加</v-btn>
              <v-spacer />
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <!-- 修改密码（含可选新用户名） -->
      <v-row justify="center">
        <v-col cols="12" md="10" lg="10">
          <v-card class="mx-auto" elevation="2">
            <v-card-title class="text-h6">修改密码 / 用户名</v-card-title>
            <v-divider />
            <v-card-text>
              <v-alert type="info" density="compact" variant="tonal" class="mb-4">
                修改密码时可一并修改用户名（留空则只改密码），修改成功后需重新登录。
              </v-alert>
              <v-text-field
                v-model="user.username"
                placeholder="当前账号"
                label="当前账号"
                clearable
                variant="underlined"
                prepend-inner-icon="mdi-account"
              />
              <v-text-field
                v-model="user.newUsername"
                placeholder="新用户名（可选，留空则不修改）"
                label="新用户名（可选）"
                clearable
                variant="underlined"
                prepend-inner-icon="mdi-account-plus"
              />
              <v-text-field
                v-model="user.oldPassword"
                type="password"
                placeholder="旧密码"
                label="旧密码"
                variant="underlined"
                clearable
                prepend-inner-icon="mdi-lock-outline"
              />
              <v-text-field
                v-model="user.password"
                type="password"
                placeholder="新密码"
                label="新密码"
                variant="underlined"
                clearable
                prepend-inner-icon="mdi-lock"
              />
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn color="primary" @click="updatePassword">修改</v-btn>
              <v-spacer />
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <!-- 上传文件大小配置 -->
      <v-row justify="center">
        <v-col cols="12" md="10" lg="10">
          <v-card class="mx-auto" elevation="2">
            <v-card-title class="text-h6">上传文件大小配置</v-card-title>
            <v-divider />
            <v-card-text>
              <v-text-field
                variant="underlined"
                v-model="fileMax"
                placeholder="上传文件最大大小（单位：M）"
                label="上传文件最大大小（单位：M）"
                clearable
                type="number"
                :rules="[() => checkNumber() || '必须是数字且不为空']"
                prepend-inner-icon="mdi-file-upload"
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

      <!-- 数据迁移 -->
      <v-row justify="center">
        <v-col cols="12" md="10" lg="10">
          <v-card class="mx-auto" elevation="2">
            <v-card-title class="text-h6">数据迁移</v-card-title>
            <v-divider />
            <v-card-text>
              <v-alert type="info" density="compact" variant="tonal" class="mb-4">
                用于在 Spring 后端与 Go 后端之间迁移数据。磁盘文件需手动拷贝 <code>file/</code> 目录。
              </v-alert>

              <div class="text-subtitle-2 mb-2">全表迁移（推荐）</div>
              <v-row align="center" class="mb-2">
                <v-col cols="auto">
                  <v-btn color="success" prepend-icon="mdi-download" @click="exportAll" :loading="exporting">
                    导出全部数据
                  </v-btn>
                </v-col>
                <v-col>
                  <v-file-input
                    label="选择导出的 JSON 文件"
                    accept=".json,application/json"
                    variant="underlined"
                    prepend-icon="mdi-upload"
                    @change="onImportFile"
                    density="compact"
                    hide-details
                  />
                </v-col>
                <v-col cols="auto">
                  <v-btn color="primary" prepend-icon="mdi-database-import" @click="importAll" :loading="importing">
                    导入全部
                  </v-btn>
                </v-col>
              </v-row>

              <v-divider class="my-3" />

              <div class="text-subtitle-2 mb-2">单表迁移（Share / File）</div>
              <v-row align="center" class="mb-2">
                <v-col cols="auto">
                  <v-btn variant="outlined" prepend-icon="mdi-download" @click="exportShare" :loading="exportingShare">
                    导出 Share
                  </v-btn>
                </v-col>
                <v-col>
                  <v-file-input
                    label="选择 Share JSON 文件"
                    accept=".json,application/json"
                    variant="underlined"
                    prepend-icon="mdi-upload"
                    @change="(f) => onImportSingleFile(f, 'share')"
                    density="compact"
                    hide-details
                  />
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col cols="auto">
                  <v-btn variant="outlined" prepend-icon="mdi-download" @click="exportFile" :loading="exportingFile">
                    导出 File
                  </v-btn>
                </v-col>
                <v-col>
                  <v-file-input
                    label="选择 File JSON 文件"
                    accept=".json,application/json"
                    variant="underlined"
                    prepend-icon="mdi-upload"
                    @change="(f) => onImportSingleFile(f, 'file')"
                    density="compact"
                    hide-details
                  />
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- AI 配置 -->
      <v-row justify="center">
        <v-col cols="12" md="10" lg="10">
          <v-card class="mx-auto" elevation="2">
            <v-card-title class="text-h6">AI 配置</v-card-title>
            <v-divider />
            <v-card-text>
              <v-textarea label="配置" v-model="aiConfig" variant="underlined" />
              <v-row justify="center" class="mb-2">
                <v-btn color="primary" @click="submitAiConfig()">保存配置</v-btn>
              </v-row>
              <v-row justify="center" class="mb-2">
                <v-btn color="secondary" @click="createCode()">生成邀请码</v-btn>
              </v-row>
              <v-list density="compact" v-if="invitationCodeList.length">
                <v-list-item v-for="(item, i) in invitationCodeList" :key="i" :value="item">
                  <v-list-item-title>{{ item.name }}</v-list-item-title>
                  <template v-slot:prepend>
                    <v-btn color="error" @click="deleteAICode(item)" density="compact" class="mr-2">删除</v-btn>
                    <v-btn color="info" @click="seeAiUserlog(item)" density="compact" class="mr-2">查看使用日志</v-btn>
                  </template>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </template>

    <!-- 邀请码使用记录 -->
    <v-dialog v-model="showAiUserDialog" max-width="1000">
      <v-card>
        <v-card-title class="text-h6">邀请码使用记录</v-card-title>
        <v-card-text>
          <ViewLogTable :target="nowInvitationCode.id" :types="2"></ViewLogTable>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn color="green darken-1" text @click="showAiUserDialog = false">关闭</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar" :timeout="3000" :top="true" :color="snackbarColor">
      {{ message }}
    </v-snackbar>
  </v-container>
</template>

<script>
import ViewLogTable from "@/components/view-log-list.vue";
export default {
  components: { ViewLogTable },
  data() {
    return {
      showAiUserDialog: false,
      nowInvitationCode: { id: 0 },
      user: {
        username: '',
        password: '',
        oldPassword: '',
        newUsername: ''
      },
      snackbar: false,
      snackbarColor: 'info',
      message: '',
      ipdata: '',
      items: [],
      loginUserInfo: {},
      showSysInfo: false,
      showLogin: true,
      fileMax: 0,
      aiConfig: '',
      invitationCodeList: [],
      // 数据迁移
      exporting: false,
      importing: false,
      exportingShare: false,
      exportingFile: false,
      pendingImportData: null,        // 全表导入待提交数据
      pendingSingleImport: null      // 单表导入 { type, data }
    }
  },
  created() {
    this.checkLogin()
  },
  methods: {
    seeAiUserlog(item) {
      this.nowInvitationCode = item
      this.showAiUserDialog = true
    },
    checkLogin() {
      this.httpGet('/login/check', (json) => {
        if (json.status == 200) {
          this.showSysInfo = true
          this.showLogin = false
          this.getWhitelist()
          this.getFileMax()
          this.getInvitationCode()
          this.getAiConfig()
        } else {
          this.showSysInfo = false
          this.showLogin = true
        }
      })
    },
    userLogin() {
      this.httpPost('/login', this.user, (json) => {
        if (json.data != null && json.data != '') {
          this.loginUserInfo = json.data
          this.showSysInfo = true
          this.showLogin = false
          this.getWhitelist()
          this.getFileMax()
          this.getInvitationCode()
          this.getAiConfig()
        } else {
          this.message = '登录失败'
          this.snackbarColor = 'error'
          this.snackbar = true
        }
      })
    },
    updatePassword() {
      this.httpPost('/admin/change/password', this.user, (json) => {
        if (json.data != null && json.data != '') {
          this.loginUserInfo = json.data
          this.message = '修改成功，请重新登录'
          this.snackbarColor = 'success'
          this.snackbar = true
          this.showSysInfo = false
          this.showLogin = true
          // 清空表单
          this.user.newUsername = ''
          this.user.oldPassword = ''
          this.user.password = ''
        } else {
          this.message = '修改失败，请检查账号与旧密码'
          this.snackbarColor = 'error'
          this.snackbar = true
        }
      })
    },
    addWhitelIP() {
      this.httpPost('/admin/whitelist/add', this.ipdata, (json) => {
        this.getWhitelist()
      })
    },
    getWhitelist() {
      this.httpGet('/admin/whitelist', (json) => {
        this.items = json.data
      })
    },
    deleteIP(item) {
      this.httpPost('/admin/whitelist/delete', item, (json) => {
        this.getWhitelist()
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
        this.httpPost(
          `/upload/setting/filemax?type=sysinfo`,
          { uploadFileMax: this.fileMax },
          (json) => {
            this.message = json.message
            this.snackbarColor = json.status === 200 ? 'success' : 'error'
            this.snackbar = true
          }
        )
      }
    },
    getFileMax() {
      this.httpGet('/upload/disk', (json) => {
        this.fileMax = json.data.uploadFileMax
      })
    },
    submitAiConfig() {
      const data = { configMessage: this.aiConfig }
      this.httpPost('/ai/save', data, (json) => {
        this.message = json.status === 200 ? '配置已保存' : (json.message || '保存失败')
        this.snackbarColor = json.status === 200 ? 'success' : 'error'
        this.snackbar = true
      })
    },
    getAiConfig() {
      this.httpPost("/ai/config", { "invitationCode": "" }, (json) => {
        this.aiConfig = json.data.configMessage
      })
    },
    createCode() {
      this.httpPost("/ai/invitation", null, (json) => {
        this.getInvitationCode()
      })
    },
    getInvitationCode() {
      this.httpGet("/ai/invitation/list", (json) => {
        this.invitationCodeList = json.data
      })
    },
    deleteAICode(item) {
      this.httpPost("/ai/invitation/delete", item, (json) => {
        this.getInvitationCode()
      })
    },
    // ========== 数据迁移 ==========
    /** 触发浏览器下载 JSON 文件 */
    downloadJson(data, filename) {
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    },
    /** 读取 JSON 文件，返回 Promise<data> */
    parseJsonFile(file) {
      return new Promise((resolve, reject) => {
        if (!file) {
          reject(new Error('未选择文件'))
          return
        }
        const reader = new FileReader()
        reader.onload = (e) => {
          try {
            resolve(JSON.parse(e.target.result))
          } catch (err) {
            reject(new Error('JSON 解析失败：' + err.message))
          }
        }
        reader.onerror = () => reject(new Error('文件读取失败'))
        reader.readAsText(file)
      })
    },
    timestamp() {
      const d = new Date()
      const p = (n) => String(n).padStart(2, '0')
      return `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}${p(d.getHours())}${p(d.getMinutes())}`
    },
    exportAll() {
      this.exporting = true
      this.httpGet('/admin/move/all', (json) => {
        this.exporting = false
        if (json.status === 200 && json.data) {
          this.downloadJson(json.data, `share-data-all-${this.timestamp()}.json`)
          this.message = '导出成功'
          this.snackbarColor = 'success'
        } else {
          this.message = '导出失败：' + (json.message || '')
          this.snackbarColor = 'error'
        }
        this.snackbar = true
      })
    },
    onImportFile(file) {
      this.parseJsonFile(file).then(data => {
        this.pendingImportData = data
        this.message = '文件已加载，点击「导入全部」开始导入'
        this.snackbarColor = 'info'
        this.snackbar = true
      }).catch(err => {
        this.message = err.message
        this.snackbarColor = 'error'
        this.snackbar = true
      })
    },
    importAll() {
      if (!this.pendingImportData) {
        this.message = '请先选择 JSON 文件'
        this.snackbarColor = 'error'
        this.snackbar = true
        return
      }
      this.importing = true
      this.httpPost('/admin/move/all/save', this.pendingImportData, (json) => {
        this.importing = false
        if (json.status === 200) {
          this.message = '导入成功'
          this.snackbarColor = 'success'
          this.pendingImportData = null
        } else {
          this.message = '导入失败：' + (json.message || '')
          this.snackbarColor = 'error'
        }
        this.snackbar = true
      })
    },
    exportShare() {
      this.exportingShare = true
      this.httpGet('/admin/move/share', (json) => {
        this.exportingShare = false
        if (json.status === 200 && json.data) {
          this.downloadJson(json.data.share || [], `share-table-${this.timestamp()}.json`)
          this.message = 'Share 导出成功'
          this.snackbarColor = 'success'
        } else {
          this.message = '导出失败：' + (json.message || '')
          this.snackbarColor = 'error'
        }
        this.snackbar = true
      })
    },
    exportFile() {
      this.exportingFile = true
      this.httpGet('/admin/move/file', (json) => {
        this.exportingFile = false
        if (json.status === 200 && json.data) {
          this.downloadJson(json.data.file || [], `file-table-${this.timestamp()}.json`)
          this.message = 'File 导出成功'
          this.snackbarColor = 'success'
        } else {
          this.message = '导出失败：' + (json.message || '')
          this.snackbarColor = 'error'
        }
        this.snackbar = true
      })
    },
    onImportSingleFile(file, type) {
      this.parseJsonFile(file).then(data => {
        // 兼容两种格式：直接是数组，或 { share: [...] } / { file: [...] }
        let payload = data
        if (!Array.isArray(data) && data[type]) {
          payload = data[type]
        }
        const url = type === 'share' ? '/admin/move/share/save' : '/admin/move/file/save'
        this.httpPost(url, payload, (json) => {
          if (json.status === 200) {
            this.message = type + ' 导入成功'
            this.snackbarColor = 'success'
          } else {
            this.message = '导入失败：' + (json.message || '')
            this.snackbarColor = 'error'
          }
          this.snackbar = true
        })
      }).catch(err => {
        this.message = err.message
        this.snackbarColor = 'error'
        this.snackbar = true
      })
    }
  }
}
</script>

<style>
</style>
