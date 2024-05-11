/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

const app = createApp(App)

registerPlugins(app)


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

app.mount('#app')
