import { Toast } from 'vant'
import http from "@/http"
// 这里是在actions里用路由功能,所以不能用组件用路由的方式去用,像在Profile文件里的this.$router.replace(path)
import router from '@/router' 
import { GETSELLER, GETGOODS, GETRATINGS, GETADDRESS,
  GETCATEGORIES, GETSHOPS,GETUSER} from "./mutation_types"
const OK = 0;  //在此时为了统一把moke数据也改成0啦
const ERROR = 1

function loginSuccess(commit,user,getCaptcha,loginWay) {
  //登录成功之后要将用户信息保存(仓库)
  commit(GETUSER,user)
  //当使用用户名密码登录成功之后 我们需要更新图片验证码
  if(loginWay === "password") getCaptcha()

  //编程式路由 此时路由要在上面引入使用,不能使用this.$router,因为他不是vue组件的实例
  router.replace("/Profile")
}
function loginFail(getCaptcha,loginWay) {
  // 登录失败之后要更新验证码
  if(loginWay === "password") getCaptcha()

  Toast.fail({
    message: "登录失败,请重新登录",
    duration: 2000
  })
}

export default {
  // 1
  async [GETSELLER]({ commit }, id) {
    console.log(id, "store-action"); //这里测试能拿到就成功啦
    const { code, data } = await http.shop.getSeller();
    if (code === OK)
      commit(GETSELLER, data)
  },
  //2.
  async [GETGOODS]({ commit }) {
    const { code, data } = await http.shop.getGoods()
    if (code === OK)
      commit(GETGOODS, data)
  },
  //3.
  async [GETRATINGS]({ commit }) {
    const { code, data } = await http.shop.getRatings()
    if (code === OK)
      commit(GETRATINGS, data)
  },
  //4.
  async [GETADDRESS]({ commit }) {
    const { code, data } = await http.wrap.getPosition()
    if (code === OK)
      commit(GETADDRESS, data)
  },
  //5.
  async [GETCATEGORIES]({ commit }) {
    const { code, data } = await http.wrap.getCategories()
    if (code === OK)
      commit(GETCATEGORIES, data)
  },
  //6.
  async [GETSHOPS]({ commit }) {
    const { code, data } = await http.wrap.getShops()
    if (code === OK)
      commit(GETSHOPS, data)
  },
  //7.提交一个user登录请求 
  async [GETUSER]({commit},{loginWay,name,pwd,captcha,phone,code,getCaptcha}) {
    //发送登录的请求 最终去调用一个mutation
    let body = ""
    if(loginWay === "message"){
      //手机号 + 短信
      body = await http.wrap.loginBySms({phone,code})
    }else if(loginWay === "password"){
      //用户名 + 密码 + 验证码
      body = await http.wrap.loginByPwd({name,pwd,captcha})
    }

    if (body.code === OK) loginSuccess(commit,body.data,getCaptcha,loginWay)
    if (body.code === ERROR) loginFail(getCaptcha,loginWay)
  },
}