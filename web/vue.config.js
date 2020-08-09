const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = '局域网文本共享'

module.exports = {
  productionSourceMap: false,
  // options...
  devServer: {
    port: 8080,
    proxy: {
      '/api': {
        // target: 'http://192.168.0.100:8081',
        target: 'http://[2409:8a70:3713:1c60::1000]:8081/',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': '/api'
        }
      }
    }
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  }
}
