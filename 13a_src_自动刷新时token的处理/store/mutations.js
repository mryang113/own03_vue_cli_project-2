import {GETSELLER,GETGOODS,GETRATINGS,GETADDRESS,GETCATEGORIES,
  GETSHOPS,GETUSER,RESETUSER,AUTOLOGIN} from "./mutation_types"
  // 这里面一般不写逻辑,只是同步仓库的数据
export default {
    [GETSELLER](state,seller){
        state.seller = seller
    },
    [GETGOODS](state,goods){
        state.goods = goods
    },
    [GETRATINGS](state,ratings){
        state.ratings = ratings
    },
    [GETADDRESS](state,address){
        state.addressObj = address
    },
    [GETCATEGORIES](state,categories){
        state.categories = categories
    },
    [GETSHOPS](state,shops){
        state.shops = shops
    },
    [GETUSER](state,user){
        state.user = user
        //每次切换登录时 将仓库中的user信息修改掉
        state.token = user.token
    },
    [RESETUSER](state){
        state.user = {}; //用户置为空
        state.token = ""; //token置为空
    },
    [AUTOLOGIN](state,user){
      state.user = user
    },
}