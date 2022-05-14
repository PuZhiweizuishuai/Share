<template>
  <v-container>
    <v-row>
      <v-col>
        <router-link to="/" style="float: left">
          <v-btn
            icon
            x-large
            color="success"
          >
            <v-icon>mdi-arrow-left-thick</v-icon>

          </v-btn>
        </router-link>
        <h3 style="    margin-top: 12px;">RSA加密解密</h3>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-btn
          depressed
          color="primary"
          @click="testCreateRSA()"
        >
          生成密钥
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-btn
          depressed
          color="primary"
          @click="signFun()"
        >
          签名
        </v-btn>
      </v-col>
      <v-col>
        <v-btn
          depressed
          color="primary"
          @click="verifyFun()"
        >
          验证
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-textarea
          v-model="prikey"
          clearable
          clear-icon="mdi-close-circle"
          label="私钥"
        />
      </v-col>
      <v-col>
        <v-textarea
          v-model="pubkey"
          clearable
          clear-icon="mdi-close-circle"
          label="公钥"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-btn
          depressed
          color="primary"
          @click="encode()"
        >
          加密
        </v-btn>
      </v-col>
      <v-col>
        <v-btn
          depressed
          color="primary"
          @click="decode()"
        >
          解密
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-textarea
          v-model="encryptDate"
          clearable
          clear-icon="mdi-close-circle"
          label="加密后字符"
        />
      </v-col>
      <v-col>
        <v-textarea
          v-model="decryptDate"
          clearable
          clear-icon="mdi-close-circle"
          label="解密后字符"
        />
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
const NodeRSA = require('node-rsa')
export default {
  data() {
    return {
      key: null,
      pubkey: '',
      prikey: '',
      date: '床前明月光',
      encryptDate: '',
      decryptDate: '',
      // 签名
      sign: ''
    }
  },
  created() {
    this.$vuetify.goTo(0)
  },
  methods: {
    testCreateRSA() {
      // 创建 2048 位秘钥
      this.key = new NodeRSA({ b: 1024 })
      // 导出公钥
      this.pubkey = this.key.exportKey('pkcs8-public')
      // 导出私钥
      this.prikey = this.key.exportKey('pkcs8-private')
    },
    encode() {
      this.encryptDate = this.key.encrypt(this.date, 'base64')
    },
    decode() {
      this.decryptDate = this.key.decrypt(this.encryptDate, 'utf8')
    },
    // https://www.jianshu.com/p/63c8772809dd
    signFun() {
      this.sign = this.key.sign('puzhiwei', 'base64', 'base64')
      console.log(this.sign)
    },
    verifyFun() {
      const vr = this.key.verify('puzhiwei', this.sign, 'base64', 'base64')
      console.log(vr)
    }
  }
}
</script>

<style>

</style>
