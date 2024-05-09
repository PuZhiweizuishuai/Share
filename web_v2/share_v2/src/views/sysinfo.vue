<template>
  <v-container>
    <v-row justify="center" align="center">
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
    <v-snackbar v-model="snackbar" :timeout="3000" :top="true">
      {{ message }}
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
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
      showSysInfo: false
    }
  },
  methods: {
    userLogin() {
      this.httpPost('/login', this.user, (json) => {
        if (json.data != null && json.data != '') {
          this.loginUserInfo = json.data
          this.showSysInfo = true
          this.getWhitelist()
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
    }
  }
}
</script>

<style>
</style>
