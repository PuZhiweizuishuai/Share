<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="10">
        <v-textarea
          v-model="info"
          name="信息"
          label="用户信息"
          hint="用户信息"
        />
      </v-col>
    </v-row>

    <v-col />
    <v-row justify="center">
      <v-btn
        depressed
        color="primary"
        @click="createPC()"
      >
        生成
      </v-btn>
    </v-row>
    <v-col />
    <v-row justify="center">
      <v-col cols="10">
        <v-textarea
          v-model="activationCode"
          name="激活码"
          label="展示PC激活码"
          hint="展示激活码"
        />
      </v-col>
    </v-row>
    <v-col />
  </v-container>
</template>

<script>
const NodeRSA = require('node-rsa')
export default {
  data() {
    return {
      info: '',
      activationCode: '',
      newKey: null
    }
  },
  created() {
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
  methods: {
    createPC() {
      const info2 = encodeURIComponent(this.info)
      const data = this.newKey.sign(this.info, 'base64', 'base64') + '#' + info2
      this.activationCode = btoa(data)
    }
  }
}
</script>

<style>

</style>
