import  {reqIndexData} from '@/api/index.js'
// import  reqIndexData from '../../api/index.js'  我一直报错(0 , _login.default) is not a function报错，引用未加{}，所有在下面的await reqIndexData()提示报错
Page({
//声明几个选项
//data初始化数据
data:{
  bannerList: [], // 轮播图数据
  categoryList: [], // 分类数据
  activeList: [], // 活动广告
  hotList: [], // 人气推荐
  guessList: [], // 猜你喜欢
  loading:true //是否显示骨架屏，默认显示
},
 //获取首页数据 由于reqIndexData()返回的promise，要加await
 async getIndexData(){
  const res = await reqIndexData()
      console.log(res)
      //后台获取数据打印了，data也初始化数据了，那就进行赋值呗
      this.setData({
        bannerList: res[0].data,
        categoryList:res[1].data,
        activeList: res[2].data,
        hotList: res[3].data,
        guessList:res[4].data,
        loading:false
      })
},
//监听页面的加载
onLoad(){
  this.getIndexData()
},
//转发给好友，群聊
onShareAppMessage(){
  
},
//转发到朋友圈
onShareTimeLine(){

}
})
