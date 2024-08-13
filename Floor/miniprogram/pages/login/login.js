// pages/login/login.js
// 导入封装的通用模块方法
import  {toast} from '@/utils/extendApi'
// 导入接口请求函数
import  {reqLogin,reqUserInfo} from "@/api/user"
// 导入本地存储api
import  {setStorage} from "@/utils/storage"
// 导入 ComponentWithStore 方法
//让页面和store对象建立关联，ComponentWithStore方法可以做到，并且替换干掉Component
import { ComponentWithStore } from 'mobx-miniprogram-bindings'
// 导入store对象
import  {userStore} from '@/stores/userstore'
//防抖
import {debounce} from 'miniprogram-licia'
ComponentWithStore({
  //让页面和store对象建立关联，
  storeBindings:{
    // 当前页面需要和哪一个store对象进行绑定
    store:userStore,
    // 需要从上面的store对象中映射哪些数据
    fields:['token','userInfo'],
    //需要从上面的store对象中映射哪些方法
    actions:['setToken','setUserInfo']

  },
  methods:{
  // 授权登录. 因为防抖，所以login改为普通函数，加个function。
  //再加debouncce,debouncce有两个参数，第一个是回调函数，二是时间
  login: debounce(function(){
    wx.login({
      success: async({code}) => {
        if(code){
          // 在获取到临时登录凭证code后，带给开发服务器
         const  {data} = await  reqLogin(code)
        //  登录成功后，把服务器响应的自定义登录态token存储到本地
         setStorage('token', data.token)
         //将token存储到store对象
         this.setToken(data.token)
           // 获取用户信息.如果这里不调用storage里面就获取不到UserInfo
           this.getUserInfo()
           //返回上一页面
           wx.navigateBack()

        }else{
          toast({title:"授权失败"})
        }
      },
    })
  }, 500),
  //获取用户信息
   async getUserInfo(){
      const {data} = await reqUserInfo()
      console.log(data)
      //将data存储到本地
      setStorage('userInfo',data)
      //将用户信息存储到 Store 对象
      this.setUserInfo(data)
  }
  }



})
