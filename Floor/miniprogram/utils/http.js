import  WxRequest from  'mina-request'
// import  WxRequest from  './request'
import  {getStorage,clearStorage} from './storage.js'
import{model,test, toast} from './extendApi'
import  {env} from './env' 
//实例化测试  ②实例化时，传入的请求参数需要被constructor形参进行接收
const instance  =new WxRequest({
  // baseURL:'https://gmall-prod.atguigu.cn/mall-api',
  baseURL:env.baseURL,
  timeout:15000,
  isLoading:true
})

//=  通过实例配置的请求拦截器，可以修改默认拦截器,在请求发送之前对请求参数进行新增或者修改
instance.interceptors.request =(config) =>{
  //发请求之前判断是否有token
  //有token，请求头加上token
    const token =  getStorage('token')
    if(token){
      // 请求头config.header ，添加['token']字段
      config.header['token'] = token
    }
  return  config
}
//实例配置响应拦截器 timeout改为100，则执行这里了，返回err,isSuccess:false
instance.interceptors.response =async(response) =>{
  //从response中解构isSuccess，data是后端给我让我使用的，也解构拿出来
  const {isSuccess,data} = response
  //  if（）里必须是true, !isSuccess=true ,则表示isSuccess=false
  if(!isSuccess){
    wx.showToast({
      title: '网络异常',
      icon:'error'
    })
    return  response
  }
//网络异常后，判断服务器响应的业务状态码
  switch(data.code){
    case 200:
           // //对服务器响应数据做点什么。。。
            return  data
    case 208:  //token失效或者没用token
       const res =  await model({
          content:'鉴权失败，请重新登录',
          showCancel :false //不显示取消按钮，必须登录
        })
        if(res){
          //既然token失效了，就要清除本地存储的所有的token
          clearStorage()
          //跳转登录页面
          wx.navigateTo({
            url: '/pages/login/login',
          })
        }
        return  Promise.reject(response)
    default:
      toast({
        title:'程序出现异常',
      })
      return  Promise.reject(response)
  }

  // //对服务器响应数据做点什么。。。
  // return  data
}


export  default instance