<template>
  <v-container>
    <v-row>
      <v-col>
        <h3 style="margin-top: 12px">输入文本信息，与密钥，生成或解密相应文本。</h3>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="10">
        <v-textarea
          v-model="text"
          variant="underlined"
          clearable
          clear-icon="mdi-close-circle"
          label="原文或密文"
        />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="10">
        <v-text-field variant="underlined" v-model="password" label="密钥" />
      </v-col>
    </v-row>
    <v-row>
      <v-col />
    </v-row>
    <v-row justify="center">
      <v-btn depressed color="primary" @click="encode()"> 加密 </v-btn>
      <span v-html="'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'" />
      <v-btn depressed color="secondary" @click="decode()"> 解密 </v-btn>
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
          variant="underlined"
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
import { useGoTo } from 'vuetify'
import CryptoJS from 'crypto-js'
export default {
  data() {
    return {
      text: '',
      password: '',
      resultText: ''
    }
  },
  setup() {
    const goTo = useGoTo()
    return { goTo }
  },
  created() {
    this.goTo(0, 0)
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
