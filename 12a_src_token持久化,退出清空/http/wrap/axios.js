import axios from "axios";
import config from "./config"

//创建axios实例
const axiosIns = axios.create({
  baseURL:config.baseUrl||"",
  timeout:config.timeout||5000,
});

//为axios实例添加拦截器    // 这里的文件一般我们不动,所以下一行代码我们不传额外的参数
axiosIns.interceptors.request.use(axiosConfig => { // 这里function的call方法是可以传递 .call(config,axiosConfig)
  config.hooks && config.hooks.beforeReq && config.hooks.beforeReq.call(config)
  return axiosConfig;  
})
axiosIns.interceptors.response.use((response)=>{
  config.hooks && config.hooks.afterReqSuccess && config.hooks.afterReqSuccess.call(config,response.data)
  return response.data;
},(error)=>{
  config.hooks && config.hooks.afterReqFail && config.hooks.afterReqFail.call(config)
  return Promise.reject(error)
})

//将axios实例暴露出去
export default axiosIns;
