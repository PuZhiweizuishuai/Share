import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css' 
import 'vuetify/styles'
import App from './App.vue'
import router from './router'
//import HttpFetch from '@/utils/fetch.js'
import VueCookies from 'vue-cookies'

const vuetify = createVuetify({
    components,
    directives,
    icons: {
      defaultSet: 'mdi', // This is already the default value - only for display purposes
    },
  })

const app = createApp(App)


app.config.globalProperties.SERVER_API_URL = "/api"
app.config.globalProperties.httpGet = function(url, cb) {
  fetch(`${this.SERVER_API_URL}${url}`, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'X-XSRF-TOKEN': this.$cookies.get('XSRF-TOKEN')
    },
    method: 'GET',
    credentials: 'include'
  }).then(response => response.json())
    .then(json => {
      cb(json)
    })
    .catch(e => {
      return null
    })
}

app.config.globalProperties.httpPost = function(url, data, cb) {
  fetch(`${this.SERVER_API_URL}${url}`, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'X-XSRF-TOKEN': this.$cookies.get('XSRF-TOKEN')
    },
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(data)
  }).then(response => response.json())
    .then(json => {
      cb(json)
    })
    .catch(e => {
      return null
    })
}
app.use(createPinia())
app.use(router)
app.use(vuetify)
//app.use(HttpFetch)
app.use(VueCookies)
app.mount('#app')