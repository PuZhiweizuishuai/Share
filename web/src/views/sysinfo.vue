<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col>
        <v-card
          class="mx-auto"
          outlined
        >
          <v-row justify="center">
            <v-col cols="10">
              <h2>系统配置： </h2>
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
              />
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="8">
              <v-text-field
                v-model="user.password"
                placeholder="密码"
                label="密码"
                clearable
              />
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar
      v-model="snackbar"
      :timeout="3000"
      :top="true"
    >
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
        password: ''
      }
    }
  }
}
</script>

<style>

</style>
