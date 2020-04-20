### day01
* 先把一期的头部组件拆分出去,定义成路由组件
* 然后去参考文档把5大路由组件引入进来,静态页面的展示

* nodemon  就是一个服务器自动重启工具,在vue课程上课件vue\06_vue-h5\wrap\gshop-server_final
```js
 npm i nodemon -g --save 
//安装完后去下载package.json 依赖包,然后 npm start 启动服务器
// 然后把postman 打开,并import导入warp下的 硅谷外卖-vue项目.postman_collection.json
```
*

### day02
* 安装lodash
```js
npm install lodash --save  //其实脚手架有它的安装依赖包,也可以在下载一下
import _ from 'lodash'
return _.chunk(this.categories,8) 
// 这是lodash库的一个数组方法,把一个大数组按多少个数分成几个小数组 ,这是把N个项按N个分成两个数组

```
* swiper一个轮播插件
```js
npm install swiper --save
```
* 表单验证的一个库
```js
 npm install vee-validate@2.2.15 --save
 ```
 * 

### day03
* 界面交互:
```js
1. 登录方式的切换
2. 获取验证码点亮
3. 倒计时
4. 密码的显示隐藏(明文 密文的切换)
5. 表单验证
```


* 数据请求
```js   
1. 一次性图片验证码
    不发ajax请求  而是一个纯的http请求
2. 一次性短信验证码
    ---> https://www.yuntongxun.com/member/main
        将组件账号的配置 覆盖 后台应用中的配置util/sms_util.js
        添加测试号码
    倒计时要停
3. 两种登录
    手机,短信 & 用户名,密码
        登录成功之后要将用户信息保存(仓库)
        登录成功之后要跳转到个人中心(登录信息回显)
        登录成功之后要更新验证码

        登录失败之后提示失败
        登录失败之后要更新验证码

4. 退出登录
    将用户信息(user)清空
```
* token的处理
```js
5. 考虑token
    处理一些请求时需要携带token的接口
    拥有token token没有失效 则携带上token(Authorization)
    去访问主页上的分类列表 以及 商家列表

    登录成功时将token存入到local中(token的持久化)
    登录成功时将token交给vuex来管理
    退出时 将user 和 token清除 并将local清除
6. 自动登录
    有token token没有失效 则携带上token(Authorization)
    没有token 请求进入失败流程 跳转回登录页
    拥有token 可是token已经失效 跳转回登录页
```


            

