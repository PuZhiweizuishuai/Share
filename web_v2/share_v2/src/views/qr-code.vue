<template>
  <v-container fluid>
    <v-col></v-col>
    <v-row>
      <v-row>
        <v-col class="text-center">
          <v-card max-width="600" max-height="600" class="mx-auto">
            <v-card-title v-if="showCode">此处生成二维码</v-card-title>
            <canvas id="container" />
          </v-card>
        </v-col>
      </v-row>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-textarea v-model="text" min-width="900" variant="underlined" label="请输入文字内容" />
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center">
        <v-btn color="primary" @click="createCode">生成</v-btn>
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
      this.showCode = false
      QRCode.toCanvas(
        document.querySelector('#container'),
        this.text,
        { errorCorrectionLevel: 'H' },
        function (err) {
          if (err) throw err
        }
      )
    }
  }
}
</script>
