//__dirname 绝对路径;代表的是当前文件的目录
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
// http://localhost:8080/css/reset.css 这个路径是可以在devServer中访问到确切的静态资源的
// http://localhost:8080/position/40.10038,116.36867 这个路径在devServer中是不存在对应的静态资源的 404请求

module.exports = {
  lintOnSave: false,

  //devServer 项目中的静态资源服务器  等同于生产环境中ngix!
    //如果我们向devServer发送一个未知的http请求!!!  而且这个请求在devServer中没有命中任何静态资源
    //devServe会返回index.html  因为这个http请求有可能是前端路由 不是去访问静态资源的
    //devServe返回index.html之后 再去请求打包成功之后的js文件 在那个js文件中根据vue-router的配置
    //来显示对应的界面
    //如果我们向devServer发送一个ajax请求 而且devserver为当前这个ajax请求配置了代理 代理到真正
    // 的api服务器上去的时候  发现这个api服务器没有对应的后台路由 这个时候devServer会认为自己已经
    // 处理成功 只是api服务器没有成功  那devsever 会将index,html返回回去
    
  devServer: {
    /****** 在vue_a.md上有详细文档0417  ******* */
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