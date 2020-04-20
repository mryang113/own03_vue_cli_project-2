import routes from "@/routes";
import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

export default new VueRouter({
  /*当前端路由为history模式时;
            1.要保证前端路由和后台路由不要产生冲突
            2.所有的未知请求 404 请求;要让后台程序员 或者 运维的同学配到首页去
    */
  mode: "history", // 正常项目时没加,用的是哈希路由,后来加的,估计是上线时要切换
  routes,
  linkActiveClass: "active"
})
