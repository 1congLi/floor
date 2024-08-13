
import  {setStorage,getStorage,removeStorage,clearStorage} from './utils/storage'
import  {asyncSetStorage,asyncGetStorage,asyncRemoveStorage,asyncClearStorage} from './utils/storage'
App({
  //globalData是指全局共享的数据
  //点击收货地址时，需要将点击的收货地址赋值给 address
  //订单结算页面，需要判断 address 是否存在数据
  //如果存在数据，就展示 address 数据，如果没有数据，就从接口获取数据进行渲染
  globalData:{
    address:{}
  },
  async onShow(){
    // const a = asyncGetStorage('name')
    // console.log(a)
    asyncGetStorage('name').then((res)=>{
      console.log(res)
    })
    // asyncRemoveStorage('name').then(res=>{
    //   console.log(res)
    // })
    //  //获取小程序账号信息
    // const accountInfo =  wx.getAccountInfoSync()
    // console.log(accountInfo)
  }
})