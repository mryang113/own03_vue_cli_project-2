<template>
  <div id="app">
    <router-view></router-view>
    <!-- 只要有路由组件都可以用$route ,其中$route 身上有一个meta对象,可以再路由组件中配置routes中配置meta-->
    <FooterGuide v-show="$route.meta.showFooter"></FooterGuide>
  </div>
</template>

<script>
  import FooterGuide from 'components/FooterGuide/FooterGuide'
  export default {
    name: "app",
    components:{
      FooterGuide
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  #app
    position relative
    width 100%
    height 100%
    overflow hidden
</style>
