//配置当前小程序的环境变量
//获取当前小程序的账号信息
 const {miniProgram} = wx.getAccountInfoSync()
//获取小程序的版本
 const  {envVersion} = miniProgram
 let env = {
   baseURL:'https://gmall-prod.atguigu.cn/mall-api'
 }
 switch(envVersion){
   //开发
   case 'develop':
    env.baseURL = 'https://gmall-prod.atguigu.cn/mall-api'
     break;
     //体验
    case  'trial':
      env.baseURL = 'https://gmall-prod.atguigu.cn/mall-api'
      break;
      //正式
    case  'release':
      env.baseURL = 'https://gmall-prod.atguigu.cn/mall-api'
      break;
      default:
        env.baseURL = 'https://gmall-prod.atguigu.cn/mall-api'
        break;
 }
 export {env}