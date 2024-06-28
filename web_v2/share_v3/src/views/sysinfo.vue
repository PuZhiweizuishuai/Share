<template>
  <v-container>
    <v-row v-show="showLogin" justify="center" align="center">
      <v-col>
        <v-card class="mx-auto" outlined>
          <v-row justify="center">
            <v-col cols="10">
              <h2>系统配置：</h2>
            </v-col>
          </v-row>
          <v-divider />
          <v-col />
          <v-row justify="center">
            <v-col cols="8">
              <v-text-field
                v-model="user.username"
                placeholder="账号"
                label="账号"
                clearable
                variant="underlined"
              />
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="8">
              <v-text-field
                v-model="user.password"
                type="password"
                placeholder="密码"
                label="密码"
                variant="underlined"
                clearable
              />
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-btn @click="userLogin" color="blue"> 登录 </v-btn>
          </v-row>
          <v-col></v-col>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center" align="center" v-if="showSysInfo">
      <v-col>
        <v-card class="mx-auto" outlined>
          <v-row justify="center">
            <v-col cols="10">
              <h2>IP白名单</h2>
            </v-col>
          </v-row>
          <v-divider />
          <v-col />
          <v-row justify="center">
            <v-col cols="8">
              <v-list density="compact">
                <v-list-item v-for="(item, i) in items" :key="i" :value="item" color="primary">
                  <v-list-item-title
                    >{{ item.ip }} - 创建人：{{ item.createUser }}
                  </v-list-item-title>

                  <template v-slot:prepend>
                    <v-btn
                      color="error"
                      @click="deleteIP(item)"
                      style="margin-right: 32px"
                      density="compact"
                    >
                      删除
                    </v-btn>
                  </template>
                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
          <v-divider />
          <v-col />
          <v-row justify="center">
            <v-col cols="8">
              <v-text-field
                v-model="ipdata"
                placeholder="IP"
                label="IP"
                clearable
                variant="underlined"
              />
            </v-col>
          </v-row>

          <v-row justify="center">
            <v-col cols="4">
              <v-btn @click="getWhitelist"> 刷新 </v-btn>
            </v-col>
            <v-col cols="4">
              <v-btn @click="addWhitelIP" color="green"> 增加 </v-btn>
            </v-col>
          </v-row>
          <v-col></v-col>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center" align="center" v-if="showSysInfo">
      <v-col>
        <v-card class="mx-auto" outlined>
          <v-row justify="center">
            <v-col cols="10">
              <h2>修改密码</h2>
            </v-col>
          </v-row>
          <v-divider />
          <v-col />
          <v-row justify="center">
            <v-col cols="8">
              <v-text-field
                v-model="user.username"
                placeholder="账号"
                label="账号"
                clearable
                variant="underlined"
              />
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="8">
              <v-text-field
                v-model="user.oldPassword"
                type="password"
                placeholder="旧密码"
                label="旧密码"
                variant="underlined"
                clearable
              />
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="8">
              <v-text-field
                v-model="user.password"
                type="password"
                placeholder="新密码"
                label="新密码"
                variant="underlined"
                clearable
              />
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-btn @click="updatePassword"> 修改 </v-btn>
          </v-row>
          <v-col></v-col>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center" align="center" v-if="showSysInfo">
      <v-col>
        <v-card class="mx-auto" outlined>
          <v-row justify="center">
            <v-col cols="10">
              <h2>上传文件大小配置</h2>
            </v-col>
          </v-row>
          <v-divider />
          <v-col />
          <v-row justify="center">
            <v-col cols="8">
              <v-text-field
                variant="underlined"
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
        </v-card>
      </v-col>
    </v-row>

    <!-- AI  配置-->
    <v-row justify="center" align="center" v-if="showSysInfo">
      <v-col>
        <v-card class="mx-auto" outlined>
          <v-row justify="center">
            <v-col cols="10">
              <h2>AI 配置</h2>
            </v-col>
          </v-row>
          <v-divider />
          <v-col />
          <v-row justify="center">
            <v-col cols="8">
              <v-textarea
                  label="配置"
                  v-model="aiConfig"
                  variant="underlined"
                ></v-textarea>
            </v-col>
            <v-col cols="2">
              <v-btn color="primary" @click="submitAiConfig()">配置</v-btn>
            </v-col>
          </v-row>

          <v-row justify="center">
            
            <v-btn color="primary" @click="createCode()">生成邀请码</v-btn>
        
          </v-row>
          <v-col></v-col>
          <v-row justify="center">


            <v-col cols="8">
              <v-list density="compact">
                <v-list-item v-for="(item, i) in invitationCodeList" :key="i" :value="item" color="primary">
                  <v-list-item-title
                    >{{ item.name }}
                  </v-list-item-title>

                  <template v-slot:prepend>
                    <v-btn
                      color="error"
                      @click="deleteAICode(item)"
                      style="margin-right: 32px"
                      density="compact"
                    >
                      删除
                    </v-btn>
                    <v-btn
                      color="error"
                      @click="seeAiUserlog(item)"
                      style="margin-right: 32px"
                      density="compact"
                    >
                      查看使用日志
                    </v-btn>
                  </template>

                </v-list-item>
              </v-list>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

<!-- 邀请码使用记录 -->
    <v-dialog v-model="showAiUserDialog" max-width="1000">
      <v-card>
        <v-card-title class="headline">邀请码使用记录</v-card-title>
          <v-card-text>
        <ViewLogTable
            :target="nowInvitationCode.id"
            :types="2"
          ></ViewLogTable>

        </v-card-text>
        <v-card-actions>
          <v-spacer />

          <v-btn
            color="green darken-1"
            text
            @click="showAiUserDialog = false"
          >
            关闭
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar" :timeout="3000" :top="true">
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
      nowInvitationCode: {
        id: 0
      },
      user: {
        username: '',
        password: '',
        oldPassword: ''
      },
      snackbar: false,
      message: '',
      ipdata: '',
      items: [
        { createUser: 'mdi-share', ip: '分享列表' },
        { createUser: 'mdi-file', ip: '文件列表' },
        { createUser: 'mdi-text', ip: '二维码分享' },
        { createUser: 'mdi-lock', ip: '加密解密' },
        { createUser: 'mdi-wrench', ip: '设置' },
        { createUser: 'mdi-help', ip: '关于' }
      ],
      loginUserInfo: {},
      showSysInfo: false,
      showLogin: true,
      fileMax: 0,
      aiConfig: '',
      invitationCodeList: []
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
          this.snackbar = true
        }
      })
    },
    updatePassword() {
      this.httpPost('/admin/change/password', this.user, (json) => {
        if (json.data != null && json.data != '') {
          this.loginUserInfo = json.data
          this.showSysInfo = false
          this.showLogin = true
        } else {
          this.message = '修改失败'
          this.snackbar = true
        }
      })
    },
    addWhitelIP() {
      this.httpPost('/admin/whitelist/add', this.ipdata, (json) => {
        //
        console.log(json)
        this.getWhitelist()
      })
    },
    getWhitelist() {
      this.httpGet('/admin/whitelist', (json) => {
        this.items = json.data
      })
      //this.items.push({ createUser: 'mdi-help', ip: '关于' })
    },
    deleteIP(item) {
      this.httpPost('/admin/whitelist/delete', item, (json) => {
        //
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
      const data = {
        configMessage: this.aiConfig
      }
      this.httpPost('/ai/save', data , (json)=> {
        //
        console.log(json)
      })
    },
    getAiConfig() {
      this.httpPost("/ai/config", {"invitationCode": ""}, (json) => {
       
        this.aiConfig = json.data.configMessage
      })
    },
    createCode() {
      this.httpPost("/ai/invitation", null, (json)=> {
        
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
        console.log(json)
        this.getInvitationCode()
      })
    }
  }
}
</script>

<style>
</style>
