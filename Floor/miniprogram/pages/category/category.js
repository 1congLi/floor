//导入封装的接口API函数
import  {reqCategoryData} from '@/api/ccategory'

Page({
  //初始化数据
  data:{
    categoryList:[], //商品分类列表的数据
    activeIndex:0  //代表被激活的那一项的索引，默认是0
  },
  //实现一级分类的切换效果
  updateActive(event){
    const {index} = event.currentTarget.dataset
      this.setData({
        activeIndex:index
      })
  },
   async getCategoryDate(){
      const res = await reqCategoryData()
      if(res.code ==200){
        this.setData({
          categoryList : res.data
        })
       
      }
      console.log(res)
  },
  //监听页面的加载
  onLoad(){
      this.getCategoryDate()
  }

})
