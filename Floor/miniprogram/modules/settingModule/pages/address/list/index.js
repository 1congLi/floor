import {reqAddressList,reqDelAddress} from '../../../api/address'
import {swipeCellBehavior} from '@/behaviors/swiper'
//获取应用实例  
const app = getApp()
Page({
  behaviors: [swipeCellBehavior],
  data:{
    addressList:[],
  },
  onShow(){
      this.getAddressList()     
  },
  //onLoad是页面加载时触发
   onLoad(options){
      //接收链接传递的参数，挂载到页面的实例上，方便在其他方法中使用
      this.flag = options.flag
   },
  //获取收货数据  先把data解构出来，然后重命名为addressList
  async getAddressList(){
    const {data:addressList} =  await reqAddressList()
    // console.log(addressList)
    this.setData({
      addressList
    })
  },
  toEdit(event){
    const {id} = event.currentTarget.dataset
    wx.navigateTo({
      // url:`/modules/settingModule/pages/address/add/index/${id}`,
      url:`/modules/settingModule/pages/address/add/index?id=${id}`,
    })
  },
  //删除功能
  async delAddress(event){
        const {id} = event.currentTarget.dataset
      // 询问用户是否确认删除
      const modalRes = await wx.model({
        content: '您确认删除该收货地址吗 ?'
      })
        if (modalRes) {
          await reqDelAddress(id)
          wx.toast({ title: '收货地址删除成功' })
          // this.reqAddressList()是错误的
          this.getAddressList()
        }
       
  },
  //更新收货地址
  changeAddress(event){
    //判断是否是从结算支付页面进入的收货地址列表页面
    //  如果是，才能获取点击的收货地址。否则不执行
    if(this.flag !=='1') return   
    const addressId = event.currentTarget.dataset.id
  
    // if(addressId){  这是错误的，不写这个
    //   this.setData({
    //     addressList:this.globalData.address
    //   })
    //   return
    // }
    //需要从收货地址列表中，根据收货地址ID查找到点击的收货地址详情
    //  const selectAddress =  this.data.addressList.find((item) =>{
    //     item.id === addressId
    // })
    const selectAddress = this.data.addressList.find((item) => item.id === addressId)
    
      if(selectAddress){
        //如果获取收货地址成功后，需要赋值给全局共享的数据
        app.globalData.address = selectAddress
        wx.navigateBack()
      }
      console.log(addressId)
  }




})