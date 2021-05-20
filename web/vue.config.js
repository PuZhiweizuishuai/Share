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
        target: 'http://127.0.0.1:8081',
        // target: 'http://127.0.0.1:8081/',
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
