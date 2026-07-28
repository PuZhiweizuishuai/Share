<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="10">
        <v-card class="mx-auto" elevation="2" max-width="600">
          <v-card-title class="text-h6">二维码生成</v-card-title>
          <v-divider />
          <v-card-text>
            <v-textarea v-model="text" variant="underlined" label="请输入文字内容" prepend-inner-icon="mdi-text" />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" prepend-icon="mdi-qrcode" @click="createCode">生成</v-btn>
            <v-spacer />
          </v-card-actions>
        </v-card>

        <v-card v-if="showCode" class="mx-auto mt-4" elevation="2" max-width="600">
          <v-card-title class="text-subtitle-1">此处生成二维码</v-card-title>
          <v-divider />
          <v-card-text class="text-center">
            <canvas id="container" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import QRCode from 'qrcode'
export default {
  name: 'QrCode',
  data() {
    return {
      showCode: true,
      text: ''
    }
  },
  methods: {
    createCode() {
      if (this.text === '') {
        return
      }
      this.showCode = true
      this.$nextTick(() => {
        QRCode.toCanvas(
          document.querySelector('#container'),
          this.text,
          { errorCorrectionLevel: 'H' },
          function (err) {
            if (err) throw err
          }
        )
      })
    }
  }
}
</script>
