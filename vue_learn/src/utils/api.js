import axios from 'axios'

axios.defaults.headers['Content-Type']="application/x-www-form-urlencoded"
axios.defaults.headers['Authorization']="Basic aW90c3RwOnphcTFYU1cy"
// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_URL, // api的base_url
  timeout: 25000                  // 请求超时时间2
})
// request拦截器
service.interceptors.request.use(config => {
  //将接口返回的token信息配置到接口请求中
  // config.headers.token = localStorage.getItem("access_token");
  return config
}, error => {
  // Do something with request error
  console.error(error) // for debug
  Promise.reject(error)
})
// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;
    //比如判断token失效为1000
    if (res.returnCode == '1000') {
      //清空
      // localStorage.setItem('access_token','')
      // //强制跳转
      // window.location.href = '/user/login'
      return res;
    }
    if (res.returnCode == '100') {
      return res.returnData;
    } else if (res.returnCode == "20011") {
      return Promise.reject("未登录")
    } else {
      return Promise.reject(res)
    }
  },
  error => {
    //console.error('err' + error)// for debug
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 3 * 1000
    // })
    return Promise.reject(error)
  }
)
export default service

