// pages/order/list/index.js
import {reqOrderList} from '../../../api/orderpay'
Page({
  // 页面的初始数据
  data: {
    orderList: [], // 单个订单列表
    page:1,  // 页码
    limit:10,
    total:0, // 多个订单列表总条数
    isLoading:false//通过节流阀给列表添加节流功能，判断数据是否记载完毕，true是正在加载
  },
  onLoad(){
    this.getOrderList()
  },
  //获取订单详情
   async getOrderList(){
     const {page,limit} = this.data
     //数据正在请求中
     this.data.isLoading = true
    const res = await reqOrderList(page,limit)
    // console.log(res)
      // 数据加载完毕
      this.data.isLoading = false
    if(res.code ===200){
       this.setData({
        //  这样就能即看见新加载的数据，还能看见以前加载的数据
        orderList:[...this.data.orderList,...res.data.records],
        total:res.data.total
       })
    }
  },
  //页面上拉触底事件的处理函数
  onReachBottom(){
      const {page,orderList,total,isLoading} = this.data
      // console.log(isLoading) 如果正在加载，函数就打断执行
      if(isLoading) return
// 数据总条数 和 订单列表长度进行对比
if (total === orderList.length) {
  wx.toast({ title: '数据加载完毕' })
  return
}
// 更新 page
this.setData({
  page: page + 1
})
  // 重新发送请求
  this.getOrderList()
  }

})
