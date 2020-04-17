import Vue from 'vue'
import App from './App.vue'


//1. 配置mock
import "./node_modules/@/mock";
//2. 注册axios
import http from "./node_modules/@/http";
Vue.prototype.$http = http;
//3. 注册router
import router from "./node_modules/@/router";
//4. 注册vuex
import store from "./node_modules/@/store";
//5. 引用字体图标 过渡相关的样式
import "./node_modules/@/common/stylus/style.styl"
import "./node_modules/@/common/stylus/transition.styl"
//6. 引入全局组件(icon split)
import icon from "./node_modules/components/ele-icon/ele-icon"
import split from './node_modules/components/ele-split/ele-split.vue'
Vue.component("ele-icon",icon)
Vue.component('ele-split', split)
//7. 定义数据通信需要的总线
Vue.prototype.$bus=new Vue()
//8. 引入过滤器
import "./node_modules/@/filter"

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
