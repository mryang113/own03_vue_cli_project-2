import {loading,success,fail} from "./toast"
export default (axios,config={})=>{
  let modelName = config.name || "default";
  if(!config.api)
    throw new Error(`${modelName}的配置文件中的api选项是必须的`)
  if(Object.prototype.toString.call(config.api) !== "[object Object]")
    throw new Error(`${modelName}的配置文件中的api选项必须是个Object对象`)

  let httpObj={};
  let api = config.api;

  for(let apiName in api){
    //toast 代是否要开启轻提示
    //data:apiData   ; data是结构出来的数据 apiData别名
    //hooks:请求级别的钩子  corsUrl也是为了解决跨域问题后来加的 token也是
    let {url,method,isForm,data:apiData,toast,hooks,corsUrl,token} = api[apiName];
    apiData = apiData||{};
    hooks = hooks||{};
    let {beforeReq,afterReqSuccess,afterReqFail} = hooks;

    httpObj[apiName] = async (data={})=>{
      let transformData = null;
      if(isForm){
        transformData = new FormData();
        for(let key in data){
          transformData.append(key,data[key])
        }
        for(let key in apiData){
          transformData.append(key,apiData[key])
        }
      }else {
        transformData =  Object.assign(apiData, data);
      }


      let body = "";

      //跨域的公共处理,发送ajax时有跨域问题后来加的,与http里的config文件有关系 后加的
      if(corsUrl){
        url = corsUrl + url;
        corsUrl = "";
      }

      //token 的处理 后加的
      let headers = {}
      let Authorization = (typeof token === 'function') && token()
      if(Authorization) headers = {Authorization}

      try {
        //真正的请求发送的代码
        beforeReq&&beforeReq.call(config);
        toast && loading();
        switch (method){
          case "get":
          case "delete":
            body = await axios({
              url,
              method,
              params:transformData,
              headers
            })
            break;
          case "put":
          case "post":
            body = await axios({
              url,
              method,
              data:transformData,
              headers
            })
            break;
        }
        afterReqSuccess&&afterReqSuccess.call(config,body);
        toast && success();
      }catch (e) {
        afterReqFail&&afterReqFail.call(config);
        toast && fail();
         //将请求抛出的错误  再次往外传递 不传;外部是没有办法再次try catch的 后加的
         return Promise.reject(e)
      }

      //才是组件上拿到的最后的数据  body是已经经过响应拦截器处理的!!!
      return body;
    }
  }


  return httpObj;
}
