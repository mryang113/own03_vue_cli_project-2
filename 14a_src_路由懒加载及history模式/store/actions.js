import { Toast } from 'vant'
import http from "@/http"
// 这里是在actions里用路由功能,所以不能用组件用路由的方式去用,像在Profile文件里的this.$router.replace(path)
import router from '@/router' 
import local from "@/util/local" // 后加的
import { GETSELLER, GETGOODS, GETRATINGS, GETADDRESS,GETCATEGORIES,
   GETSHOPS,GETUSER,RESETUSER,AUTOLOGIN} from "./mutation_types"
const OK = 0;  //在此时为了统一把moke数据也改成0啦
const ERROR = 1

function loginSuccess(commit,user,getCaptcha,loginWay) {
  //登录成功之后要将用户信息保存(仓库)
  commit(GETUSER,user)
  //当使用用户名密码登录成功之后 我们需要更新图片验证码
  if(loginWay === "password") getCaptcha()

  //将token存入到local中  登录成功时将token交给vuex来管理
  local.set("ele-token",user.token)

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
  // 8. 提交一个退出登录,重置的动作
  async [RESETUSER]({commit}){
    //将仓库中的user 和 token 置空
    await commit(RESETUSER)
    local.remove("ele-token")
    router.replace('/Profile')
  },
  //9. 地址栏刷新,自动获取用户登录信息
  async [AUTOLOGIN]({commit}){
    //1. 拥有token 而且token没有过期 : 会返回token对应的用户信息 状态200
     /*{ "code": 0,
          "data": {
              "_id": "5e9a9933c9f2ab44248ad0de",
              "name": "damu"
          }
        }*/  // 这几条是服务器规则
    //2. 拥有token 可是token已经过期 : 会返回"message": "token过期，请重新登录"   状态401
    //3. 没有token 会返回:{"code": 1,"msg": "请先登陆"} 状态200  
    /*当app开机进入主界面时:
            有token token没有失效 则携带上token发送请求 回填user信息
            没有token 请求进入失败流程 跳转回登录页
            拥有token 可是token已经失效 跳转回登录页*/
    try{
      const body = await http.wrap.autoLogin();
      if(body.code === OK){
        //拥有token 而且token没有过期
        commit(AUTOLOGIN,body.data)
      }else if(body.code === ERROR){
        //没有token
        Toast.fail({
          message: "请先登录",
          duration: 2000,
          onClose(){
            router.replace("/Login")
          }
        })
      }
    }catch (e) {
      //拥有token 可是token已经过期
      Toast.fail({
        message:"登录信息已经过期,请先登录",
        duration:2000,
        onClose(){
            router.replace("/Login")
        }
      })
      console.log(e,'action抛的异常');
    }

  }

}