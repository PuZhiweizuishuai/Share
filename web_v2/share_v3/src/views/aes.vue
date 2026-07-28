<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="10">
        <v-card class="mx-auto" elevation="2">
          <v-card-title class="text-h6">AES 加密 / 解密</v-card-title>
          <v-divider />
          <v-card-text>
            <v-alert type="info" density="compact" variant="tonal" class="mb-4">
              输入文本信息与密钥，生成或解密相应文本。
            </v-alert>
            <v-textarea
              v-model="text"
              variant="underlined"
              clearable
              clear-icon="mdi-close-circle"
              label="原文或密文"
              prepend-inner-icon="mdi-text"
            />
            <v-text-field
              variant="underlined"
              v-model="password"
              label="密钥"
              prepend-inner-icon="mdi-key"
              clearable
            />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" prepend-icon="mdi-lock" @click="encode()">加密</v-btn>
            <v-btn color="secondary" prepend-icon="mdi-lock-open" @click="decode()">解密</v-btn>
            <v-spacer />
          </v-card-actions>
        </v-card>

        <v-card class="mx-auto mt-4" elevation="2">
          <v-card-title class="text-subtitle-1">结果</v-card-title>
          <v-divider />
          <v-card-text>
            <v-textarea
              variant="underlined"
              v-model="resultText"
              clearable
              clear-icon="mdi-close-circle"
              label="加密或解密后文本"
              prepend-inner-icon="mdi-text-box-check"
            />
          </v-card-text>
        </v-card>
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
      try {
        const bytes = CryptoJS.AES.decrypt(this.text, this.password)
        const originalText = bytes.toString(CryptoJS.enc.Utf8)
        this.resultText = originalText
      } catch (error) {
        this.resultText = '解密失败，请检查密钥与密文'
      }
    },
    encode() {
      this.resultText = CryptoJS.AES.encrypt(this.text, this.password).toString()
    }
  }
}
</script>

<style>
</style>
