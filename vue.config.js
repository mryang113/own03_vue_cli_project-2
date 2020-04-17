//__dirname 绝对路径;代表的是当前文件的目录
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  lintOnSave: false,
  devServer: {
    open: true,
    // proxy: 'http://localhost:4000' ,//vue-cli_代理的配置
    proxy: {
      '/4000': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        pathRewrite: {
          "^/4000": ""
        }
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        'components': resolve('src/components'),
        'pages': resolve('src/pages'),
        'store': resolve('src/store'),
      }
    }
  }
}