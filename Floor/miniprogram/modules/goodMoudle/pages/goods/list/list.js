// pages/goods/list/index.js
import {reqGoodsList} from '../../../api/goods'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goodsList: [], // 商品列表数据
    total:0,
    isFinish: false, // 判断数据是否加载完毕
    idLoading:false,//判断数据是否加载完毕
    //商品列表请求参数
    requestData:{
      page:1,
      limit:10,
      category1Id:'' ,//一级分类id
      category2Id:'' //二级分类id
    }
  },
  onLoad(options){
    //需要把传递过来的参数进行赋值
    Object.assign(this.data.requestData,options)
    //获取商品列表详情
    this.getGoodsList()
  },
  //获取商品列表详情
  async getGoodsList(){
    //在请求发送前，需要将idLoading设置为true,表示请求正在发送中
    this.data.idLoading = true
    const {data} = await reqGoodsList(this.data.requestData)
    this.setData({
      // 先解构上一页的数据...this.data.goodsList,再解构第二页，再合并。 数组展开运算符合并
      goodsList:[...this.data.goodsList ,...data.records],
      total:data.total
    })
    this.data.idLoading = false
  },
  //监听页面的上拉操作
  onReachBottom(){
      // console.log('1')
    //获取页面,解构数据
    const {total,goodsList,requestData,isLoading} = this.data
    const {page} = requestData
    //判读idLoading的状态，如果为true，不往下进行
    if(isLoading) return
    //开始让两个长度对比，如果相等就加载完毕后续逻辑不进行了
    if(goodsList.length == total){
      this.setData({
        isFinish:true
      })
      return
    }
    //页面+1， 对象展开运算符解构赋值
    this.setData({
      requestData:{...this.data.requestData ,page:page+1}
    })
    //基于最新页面获取商品数据,但是只能看到第二页，看不到第一页了，怎么解决？ 一页和二页合并呗
    this.getGoodsList()
  },
  //监听页面下拉刷新操作
  onPullDownRefresh(){
    //将页面数据进行重置
      this.setData({
        goodsList:[],
        total:0,
        isFinish:false,
        requestData:{...this.data.requestData , page:1}
      })
    //使用最新的参数发请求
    this.getGoodsList()
    //手动关闭下拉刷新
    wx.stopPullDownRefresh()

  },
//转发给好友，群聊
onShareAppMessage(){
  
},
//转发到朋友圈
onShareTimeLine(){

}
})
