import {GETSELLER,GETGOODS,GETRATINGS,
  GETADDRESS,GETCATEGORIES,GETSHOPS,GETUSER} from "./mutation_types"
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
    },
}