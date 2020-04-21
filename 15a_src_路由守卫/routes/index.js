/*路由懒加载:
    不找项目初始化的时候 去加载所有路由
    而是用到哪个路由 就去 加载这个路由*/


// import goods from "pages/ele-goods/ele-goods.vue";
// import ratings from "pages/ele-ratings/ele-ratings.vue";
// import seller from "pages/ele-seller/ele-seller.vue";
// import Msite from "pages/Msite/Msite.vue";
// import Order from "pages/Order/Order.vue";
// import Profile from "pages/Profile/Profile.vue";
// import Search from "pages/Search/Search.vue";
// import Login from "pages/Login/Login.vue";
// import Shop from "pages/ele-shop/ele-shop.vue";
// import UserDetail from "pages/UserDetail/UserDetail.vue";

const goods = ()=> import(/*webpackChunkName:"goods"*/"pages/ele-goods/ele-goods.vue");
const ratings = ()=> import(/*webpackChunkName:"ratings"*/"pages/ele-ratings/ele-ratings.vue");
const seller = ()=> import(/*webpackChunkName:"seller"*/"pages/ele-seller/ele-seller.vue");
const Msite = ()=> import(/*webpackChunkName:"Msite"*/"pages/Msite/Msite.vue");
const Order = ()=> import(/*webpackChunkName:"Order"*/"pages/Order/Order.vue");
const Profile = ()=> import(/*webpackChunkName:"Profile"*/"pages/Profile/Profile.vue");
const Search = ()=> import(/*webpackChunkName:"Search"*/"pages/Search/Search.vue");
const Login = ()=> import(/*webpackChunkName:"Login"*/"pages/Login/Login.vue");
const Shop = ()=> import(/*webpackChunkName:"Shop"*/"pages/ele-shop/ele-shop.vue");
const UserDetail = ()=> import(/*webpackChunkName:"UserDetail"*/"pages/UserDetail/UserDetail.vue");
const A = ()=> import(/*webpackChunkName:"A"*/"pages/A/A.vue");
const B = ()=> import(/*webpackChunkName:"B"*/"pages/B/B.vue");
import store from '@/store'
export default [
  {path:"/A",component:A,meta:{showFooter:true},name:"A"},
  {
    path:"/B/:id",
    component:B,
    meta:{showFooter:false},
    name:"B"
  },
  //只要有路由组件都可以用$route ,其中$route 身上有一个meta对象,可以再路由组件中配置routes中配置meta
  {path:"/Msite",component:Msite,meta:{showFooter:true}},
  {path:"/Order",component:Order,meta:{showFooter:true}},
  {path:"/Profile",component:Profile,meta:{showFooter:true}},
  {path:"/Search",component:Search,meta:{showFooter:true}},
  {
    path:"/Login",
    component:Login,
    meta:{showFooter:false},
    beforeEnter: (to, from, next) => {
      // 如果处于登录状态 login路由是不能被访问的,比如从地址栏输入
      if(store.state.user._id){
        next("/Msite")
      }else{
        next() //放行
      }
    }
  },
  {path:"/UserDetail",component:UserDetail,meta:{showFooter:false}},
  {
    path:"/Shop/:id",
    component:Shop,
    meta:{showFooter:false},
    props: true, //为true默认就是 id 
    children:[
      {path:"goods",component:goods},
      {path:"ratings",component:ratings},
      {path:"seller",component:seller},
      {path:"",redirect:"goods"}
    ]
  },
  {path:"/",redirect:"/Msite"},
  // {path:"/",redirect:"/A"}
]