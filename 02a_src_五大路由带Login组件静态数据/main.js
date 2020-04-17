import Vue from 'vue'
import App from './App.vue'


//1. 配置mock
import "@/mock";
//2. 注册axios
import http from "@/http";
Vue.prototype.$http = http;
//3. 注册router
import router from "@/router";
//4. 注册vuex
import store from "@/store";
//5. 引用字体图标 过渡相关的样式
import "@/common/stylus/style.styl"
import "@/common/stylus/transition.styl"
//6. 引入全局组件(icon split)
import icon from "components/ele-icon/ele-icon"
import split from 'components/ele-split/ele-split.vue'
Vue.component("ele-icon",icon)
Vue.component('ele-split', split)
//7. 定义数据通信需要的总线
Vue.prototype.$bus=new Vue()
//8. 引入过滤器
import "@/filter"

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
