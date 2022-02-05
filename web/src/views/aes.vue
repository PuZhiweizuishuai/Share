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
        <h3 style="    margin-top: 12px;">输入文本信息，与密钥，生成或解密相应文本。</h3>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="10">
        <v-textarea
          v-model="text"
          clearable
          clear-icon="mdi-close-circle"
          label="原文或密文"
        />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="10">
        <v-text-field
          v-model="password"
          label="密钥"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col />
    </v-row>
    <v-row justify="center">

      <v-btn
        depressed
        color="primary"
        @click="encode()"
      >
        加密
      </v-btn>
      <span v-html="'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'" />
      <v-btn depressed color="secondary" @click="decode()">
        解密
      </v-btn>

    </v-row>

    <v-row>
      <v-col />
    </v-row>
    <v-row>
      <v-col>
        <v-divider />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="10">
        <v-textarea
          v-model="resultText"
          clearable
          clear-icon="mdi-close-circle"
          label="解密或加密后文本"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

var CryptoJS = require('crypto-js')
export default {
  data() {
    return {
      text: '',
      password: '',
      resultText: ''
    }
  },
  created() {
    this.$vuetify.goTo(0)
    this.testDecode()
  },
  methods: {
    decode() {
      //
      try {
        const bytes = CryptoJS.AES.decrypt(this.text, this.password)
        const originalText = bytes.toString(CryptoJS.enc.Utf8)
        this.resultText = originalText
      } catch (error) {
        console.log(123)
      }
    },
    encode() {
      // '
      this.resultText = CryptoJS.AES.encrypt(this.text, this.password).toString()
    }
  }
}
</script>

<style>

</style>
