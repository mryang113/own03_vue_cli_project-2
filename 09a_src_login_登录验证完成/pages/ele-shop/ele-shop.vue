<template>
  <div class="shop">
    <ele-header></ele-header>
    <div class="navs">
      <div class="item">
        <router-link :to="`/shop/${id}/goods`">商品</router-link>
      </div>
      <div class="item">
        <router-link :to="`/shop/${id}/ratings`">评价</router-link>
      </div>
      <div class="item">
        <router-link :to="`/shop/${id}/seller`">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import header from "components/ele-header/ele-header.vue";
  import { mapActions } from "vuex";
  import { GETSELLER } from "store/mutation_types";
  export default {
    name: "shop",
    props:{
      id: String //这是路由配置文件里传过来的id,用props接下
    },
    components: {
      "ele-header": header
    },
    methods: {
      ...mapActions([GETSELLER])
    },
    mounted() {
      this[GETSELLER](this.id);
      // console.log(this.id);
    }
  };
</script>

<style lang="stylus" scoped>
  @import "../../common/stylus/mixin.styl";
  .shop
    position relative
    width 100%
    height 100%
    overflow hidden
    .navs
      one-px(black)
      display flex
      height 40px
      & > .item
        flex 1
        a
          center()
          width 100%
          height 100%
          font-size 14px
          line-height 14px
          color rgba(77,85,93,1)
          &.active
            color rgba(240,20,20,1)
</style>