import routes from "@/routes";
import Vue from "vue";
import VueRouter from "vue-router";
import store from '@/store' //需路由守卫时引入的
import {AUTOLOGIN} from '@/store/mutation_types.js' //需路由守卫时引入的
import {Toast} from 'vant' //需路由守卫时引入的
Vue.use(VueRouter);

let router = new VueRouter({
  /*当前端路由为history模式时;
            1.要保证前端路由和后台路由不要产生冲突
            2.所有的未知请求 404 请求;要让后台程序员 或者 运维的同学配到首页去
    */
  // mode: "history", // 正常项目时没加,用的是哈希路由,后来加的,估计是上线时要切换
  routes,
  linkActiveClass: "active"
})

//定义路由的全局守卫
//全局前置守卫
router.beforeEach(async (to, from ,next) => {
  /*
    *  只要去的不是login组件
    *  我们都应该去检查一下token的合法性
    *  如果合法 自动登录
    *  如果不合法 直接拦下来 转到登录页
    * */
  //判断token的合法性的!!!
  //如果token合法  仓库中的user会有信息 token有值
  //如果token不合法  仓库中的user会置空 token置空
  //不管去什么路由 自动登录是要做的
  await store.dispatch(AUTOLOGIN);
  // to 和 from 都是路由对象
  // console.log(to,'----');
  // console.log(from,'*****');
  if(to.path !== "/Login"){
    //通过仓库中的user信息来判断 token是否合法
    //如果user信息存在 合法的
    //如果user信息不存在 不合法
    if(store.state.user._id){
      //如果合法 自动登录
      next()
    }else {
      //果不合法 直接拦下来 转到登录页
      Toast.fail({
        message: "请先登录",
        duration: 2000,
        onClose(){
          next("/Login")
        }
      })
    }
  }else{
    next()
  }

})



// 上一个版本是直接暴露,这里是加上路由守卫处理后在暴露
export default router
