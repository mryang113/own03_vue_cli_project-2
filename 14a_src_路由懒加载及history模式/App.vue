<template>
  <div id="app">
    123  <br>
    // 测试router为hostory 模式时 地址栏后面没有时返回主页内容 //要注释掉
    <router-view></router-view>
    <!-- 只要有路由组件都可以用$route ,其中$route 身上有一个meta对象,可以再路由组件中配置routes中配置meta-->
    <FooterGuide v-show="$route.meta.showFooter"></FooterGuide>
  </div>
</template>

<script>
  import FooterGuide from 'components/FooterGuide/FooterGuide'
  import {mapActions} from "vuex"
  import {AUTOLOGIN} from "@/store/mutation_types.js"
  export default {
    name: "app",
    components:{
      FooterGuide
    },
    methods: {
      ...mapActions([AUTOLOGIN])
    },
    created(){ //vue钩子
      //自动登录的流程 主要是对token进行检验 根据token的情况执行不同的动作
      this[AUTOLOGIN]()
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  #app
    position relative
    width 100%
    height 100%
    overflow hidden
</style>
