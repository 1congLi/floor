// pages/goods/detail/index.js
import { reqGoodsInfo } from '../../../api/goods'
// import {BehaviorWithStore} from 'behaviors'
import { userBehavior } from '../../../behaviors/userBehavior'
import { reqAddCart,reqCartList } from '@/api/cart'
Page({
  behaviors: [userBehavior],
  // 页面的初始数据
  data: {
    goodsInfo: {}, // 商品详情
    show: false, // 控制加入购物车和立即购买弹框的显示
    count: 1, // 商品购买数量，默认是 1
    blessing: '',// 祝福语
    buyNow: 0, //0是加入购物车，1是立即购买
    allCount:'', //商品的总购买数量
  },
  //全屏预览图片
  previewImage() {
    wx.previewImage({
      urls: this.data.goodsInfo.detailList
    })
  },

  // 加入购物车
  handleAddcart() {
    this.setData({
      show: true,
      buyNow: 0
    })
  },

  // 立即购买
  handeGotoBuy() {
    this.setData({
      show: true,
      buyNow: 1
    })
  },

  // 点击关闭弹框时触发的回调
  onClose() {
    this.setData({ show: false })
  },

  // 监听是否更改了购买数量
  onChangeGoodsCount(event) {
    // console.log(event.detail) 需要转成number类型
    this.setData({
      count: Number(event.detail)
    })
  },
  //获取商品详情的数据
  async getGoodsInfo() {
    const { data: goodsInfo } = await reqGoodsInfo(this.goodsId)
    // console.log(res)
    this.setData({
      goodsInfo
    })

  },
  onLoad(options) {
    console.log(options)
    //接收传递的商品ID，并且将商品ID挂载到this上面.获取id后，调用接口函数，获取详情的数据
    this.goodsId = options.goodsId
    //调用获取商品详情数据的方法
    this.getGoodsInfo()

    //调用获取购买的数量方法
    this.getCartCount()
  },
  //弹窗的确定按钮触发的事件
  async handleSubmit() {
    const { token, buyNow, count, blessing } = this.data
    const goodsId = this.goodsId
    // console.log(blessing)
    if (!token) {
      wx.navigateTo({
        url: '/pages/login/login',
      })
      return
    }
    //如果点的是加入购物车
    if (buyNow === 0) {
      const res = await reqAddCart({ goodsId, count, blessing })
      console.log(res)
      if(res.code === 200){
        wx.toast({
          title:'加入购物车成功'
        })
      }
      //加入购物车后，重新计算购物车右上角显示的商品数量
      this.getCartCount()
      this.setData({
        show:false
      })
    }else{
        wx.navigateTo({
          url: `/modules/orderPayMoudle/pages/order/detail/detail?goodsId=${goodsId}&blessing=${blessing}`,
        })
    }
  },
  //计算购物车商品的数量
   async getCartCount(){
      //使用token判断是否登录
      if(!this.data.token) return
      //如果有token，说明已登录，获取购物车列表的数据
      //然后计算出购买的数量
      const res = await reqCartList()
      console.log(res)
      if(res.data.leng !==0){
        //累加得到的几种商品的总数
        let allCount = 0
        res.data.forEach((item) =>{
          allCount += item.count
        })
        this.setData({
          //info属性值要求是字符串类型，大于99还显示99
          //隐式转换成字符串类型
          allCount: (allCount>99 ? '99+' : allCount) + ''
        })
      }
  },
  //转发给好友，群聊
onShareAppMessage(){
  return {
    title:"所有的怦然心动都是你",
    path:"/pages/index/index",
    imageUrl:'../../../../../assets/images/love.jpg'
  }
},
//转发到朋友圈
onShareTimeLine(){

}
})
