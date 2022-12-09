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
      sign: '',
      newKey: null
    }
  },
  created() {
    this.$vuetify.goTo(0)
    this.testCreateNewKeyByPrive()
    this.testNewSign()
  },
  methods: {
    testCreateNewKeyByPrive() {
      this.newKey = new NodeRSA(`-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC0wTqsWz4peqj8
xOvvpCLqRqRYpAjWiVvjwUOtG3eo0UgPZItLK54iSeFtXE+ZBJlRB4PiC2Mx4X3y
CoyAhY3kw3mMe55+kMLwuWX33SIt9DozRSA2bb3AlZRDDHE+73BxUfddpNRxJOZP
NtZQim5/WpFlb/xAWSbFfVdtCXXaCI8sTpS+1bgPRvrbLgDKO2SXKAgi3Mk8kVdk
M4rNczY6FQxKa2UWBEnznY3JgyIKEDxSMUX3zYh2ZbNStJum9gjL11nyGDAQfLyl
KDgnu5YxBfFILkatDcg5It0SN0E8iWlt58N9bCikC59Y75RCVJoVYD8FR73TneBH
8cq8hKKnAgMBAAECggEAe/ELVGf0RejvuvMkfNvlfRMXWhiQXtstAQziZO6yrDVk
3fkpck/kTMqwIpbrlZcLsf4fNn5sdCWUgMUu9mmdlEFdNTEGyu5kXUAjZURiTXRr
+//oSKoTNNzcHuWHOYphZbK4laOScErHCYYmim+BuR3XGOEi7NS0uzJpIkEcaHXS
/KtXZby52LUUqE52B8fESXgFS8pRFODxkS+gUQZ2gFxklTmOVobBNPYN/pUdffvE
idZrR4jyGaD2Q9gvVRViq/riL++riz41iHQaCbGra+xpfmvD88ejUncAD5xptwQ+
J+ZZ+tErsPgObYFQsan+oA6+ZR2sOhK68rBeoa3K0QKBgQDabExWSniDM2Bl3eQi
GGgNaNTX32Tp1TqLxiGEsrjV7uPiFSZFOLgbOo8zs36yLqTUQIOajNU9tvF6vD4n
bFs64pkE0JrD5kvjutLLt9UoRTQ635s3fpFfcBaFXPnj3OBda93uER87HlcLc3fB
SG5qoxKBNJns7iEvBUW3ynC41QKBgQDT2fYTSjgLF/76olP8QmMaYNpvpYLlhsvZ
csqLRIPN2UN67tuIQEFNoo7jPK4zBWW33By6EfON66eVXDd5v15orwZ9/pqaqvMr
hpMSJR1xLpjocaLwjvrKdgWpvM1h0gRTIvlcAeypVN/XmVDHDZJfj5O9iuHUueD4
03+e23KriwKBgQC8rlLfM+OYyrfaJ2zb+yNfehBrDqJY0IaLmbL4s36x53RZp5Vw
tIdtlg+ARO0MNPjUFYrZ5hCLCE7fjF9QpOzGGFrA6wbWdUlXRtqzenEbIXT16pVl
weMIg4Yg3GlNak8yxGxpK8dDxXjB/pQTlmMzoPzqOitBnY9y0+Ye1zS6pQKBgHe1
/ZhO4zZZm+qy2bR9KxUXz7cxFrNupTg95ngmAjjK4ZfQ61qlvIELL6T2gBUyopTv
m4gFZtQ2ap862dpBKi8LYCbIPULTANACno6tTGLNivgmZoV6tfq8EF0m5AO3slvs
Mm4sZDgXTtm8t+mTILhBIKIFnbEgTCEvGjmBFd4bAoGAFMh8vfGb6xEwVwkuN3AD
9ZXHXEvf/1ESN68ZrWyl6YGRUnsBK1fmKha+U3s7RA/4RFVuBIyGSK3OeuzzDJdC
WBaDJVt5e9XI/kkFhbR+sa2qeJEaSfFwvIRF0oZynWbGjU7uTtynjzmsgsG4sZq0
UIt2DK97Z9801qG7g1xiRyE=
-----END PRIVATE KEY-----`)
    },
    testNewSign() {
      // this.sign = this.key.sign('puzhiwei', 'base64', 'base64')
      const info = '蒲致#1657966367559#1697966967559#1'
      const info2 = encodeURIComponent(info)
      const data = this.newKey.sign(info, 'base64', 'base64') + '#' + info2
      console.log(btoa(data))
    },
    testCreateRSA() {
      // 创建 2048 位秘钥
      this.key = new NodeRSA({ b: 2048 })
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
      const vr = this.key.verify('puzhiwei123', this.sign, 'base64', 'base64')
      console.log(vr)
    }
  }
}
</script>

<style>

</style>
