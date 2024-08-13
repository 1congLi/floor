import {reqOrderAddress,reqBuyNowGoods,reqOrderInfo,reqSubmitOrder,reqPrePayInfo,reqPayStatus} from '../../../api/orderpay'
// 导入格式化时间的方法
import {formatTime} from '../../../utils/formatTime'
// 引入async-validator 对参数进行验证
import Schema from 'async-validator'
//导入防抖函数
import {debounce} from 'miniprogram-licia'

 //获取应用实例  
const app = getApp()
Page({
  data: {
    buyName: '', // 订购人姓名
    buyPhone: '', // 订购人手机号
    deliveryDate: '', // 期望送达日期
    blessing: '', // 祝福语
    show: false, // 
    orderAddress:{}, //订单地址
    orderInfo:[],//订单商品详情
    minDate: new Date().getTime(),
    currentDate: new Date().getTime()
  },
  //处理提交订单，首先从data中解构数据，需要根据接口要求组织请求参数，组织后要对请求参数验证
   submitOrder: debounce(async function(){
    const {buyName, buyPhone, deliveryDate, blessing, orderAddress, orderInfo} = this.data
    //需要根据接口要求组织请求参数
    const params = {
      buyName,
      buyPhone,
      cartList:orderInfo.cartVoList,
      deliveryDate,
      remarks:blessing,
      userAddressId:orderAddress.id
    }
     const {valid} =  await this.validatorPerson(params)
    //  console.log(valid)
     if(!valid) return
     const res =  await reqSubmitOrder(params)
    //  console.log(res)
     if(res.code ===200){
       //服务器订单号挂载在实例上
       this.orderNo = res.data
     }
     //获取预付单信息、支付参数
     this.advancePay()
  }, 500) ,
  //
  async advancePay(){
      try{
        const payParams = await reqPrePayInfo(this.orderNo)
        if(payParams.code ===200) {
         // payParams.data就是获取的支付参数
          // console.log(payParams.data) 调用wx.requestPayment发起微信支付
           const payInfo =  await wx.requestPayment(payParams.data)
           console.log(payInfo)
           //获取支付的结果
           if(payInfo.errMsg === 'requestPayment: ok'){
               // 查询支付的状态
            const payStatus = await reqPayStatus(this.orderNo)
            if (payStatus.code === 200) {
              wx.redirectTo({
                url: '/modules/orderPayModule/pages/order/list/list',
                success: () => {
                  wx.toast({
                    title: '支付成功',
                    icon: 'success'
                  })
                }
              })
            }
           }
        }
      }catch(error){
          wx.toast({
            title:'支付失败请联系客户',
            icon:'error'
          })
      }
  },
  //验证参数方法  对收货人订购人信息进行验证
  validatorPerson(params){
 // 验证收货人，是否只包含大小写字母、数字和中文字符
 const nameRegExp = '^[a-zA-Z\\d\\u4e00-\\u9fa5]+$'
 // 验证手机号，是否符合中国大陆手机号码的格式
 const phoneReg = '^1(?:3\\d|4[4-9]|5[0-35-9]|6[67]|7[0-8]|8\\d|9\\d)\\d{8}$'
 const rules = {
    userAddressId:{required:true,message:'请选择收货地址'},
     buyName:[
     {required: true ,message:'请输入订购人姓名'},
     {pattern: nameRegExp, message:'订购人姓名不合法'}
    ],
    buyPhone:[
     {required:true,message:'请输入订购人手机号'},
     {pattern:phoneReg,message:'订购人手机号不合法'}
   ],
    deliveryDate:{required:true,message:'请选择送达日期'}
 }
 //创建自定义校验对象，返回一个promise, 里面调用对象的validate方法校验请求参数
    const  validator = new Schema(rules)
    return new Promise((resolve) =>{
      validator.validate(params,(errors,fields) =>{
        if(errors){
          wx.toast({ title: errors[0].message })
          // 如果属性值是 false，说明验证失败
          resolve({ valid: false })
        }else{
          // 如果属性值是 true，说明验证成功
          resolve({valid:true})
        }
      })
    })
  },

  // 选择期望送达日期
  onShowDateTimerPopUp() {
    this.setData({
      show: true
    })
  },

  // 期望送达日期确定按钮
  onConfirmTimerPicker(event) {
    //使用vant提供的时间选择组件，获取的时间是时间戳。要把它转换成年月日
    //可以调用小程序提供的日期格式化方法，对时间进行准换
    // console.log(event.detail)
    //formatTime方法接收JS的日期对象New Date作为参数
     const timeRes =  formatTime(new Date(event.detail))
     console.log(timeRes)
    this.setData({
      show: false,
      deliveryDate:timeRes
    })
  },

  // 期望送达日期取消按钮 以及 关闭弹框时触发
  onCancelTimePicker() {
    this.setData({
      show: false,
      minDate: new Date().getTime(),
      currentDate: new Date().getTime()
    })
  },

  // 跳转到收货地址
  toAddress() {
    wx.navigateTo({
      url: '/modules/settingModule/pages/address/list/index'
    })
  },
  //获取订单页面的收货地址
  async getAddress(){
    //判断全局共享的address是否存在数据
    //如果存在数据，就需要从全局共享的address中取到数据进行赋值
    const addressId = app.globalData.address.id
    if(addressId){
      this.setData({
        orderAddress:app.globalData.address
      })
      return
    }
    //如果全局共享的address没有数据，就调用接口获取收货地址数据渲染
      const {data:orderAddress} = await reqOrderAddress()
      // console.log(res)
      this.setData({
        orderAddress
      })
  },
  //获取订单页面信息
  async getOrderInfo(){
    //onLoad页面加载时，把传递的参数拿到了，并且赋值给了data,所以在这里我能把他俩解构出来
    const {goodsId,blessing} =this.data
    const {data:orderInfo} =  goodsId ? await reqBuyNowGoods({goodsId,blessing}) :  await reqOrderInfo()
    // console.log(orderInfo)
    //判断是否存在祝福语，筛选
    const orderGoods =  orderInfo.cartVoList.find(item => item.blessing !== '')
    this.setData({
      orderInfo,
      blessing: !orderGoods ? ' ' : orderGoods.blessing
    })

  },
  //页面加载的时候触发,options能够获取传递的参数,把参数赋值给data里的状态
  onLoad(options){
    // console.log(options) 打印的参数是goodsId和blessIng
    this.setData({
      //与data里的状态对比，如果存在同名的字段就赋值，不存在就新增个字段
      ...options
    })
  },
  //页面展示时触发
  onShow(){
    //地址
      this.getAddress()
       // 获取需要下单商品的详细信息
       this.getOrderInfo()
  },
  //当前页面销毁后，需要把全局共享的address进行销毁才可以，如果用户再进入结算页面，需要从接口获取数据
  onUnload(){
    app.globalData.address = {}
  }
})
