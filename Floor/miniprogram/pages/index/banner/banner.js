// pages/index/banner/banner.js
Component({
  /**
   * 组件的属性列表
   */
  //properties是组件对外的属性，组件使用者传递给组件内部的
  properties: {
    // 轮播图数据。bannerList属性要传递给index.wxml里的banner组件
    bannerList: {
      type: Array,
      value: [  ]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    activeIndex:0 //被激活的轮播图索引
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //获取被激活的轮播图索引，使用event事件对象
    getSwiperIndex(event){
        // console.log(event )
        //把current索引解构出来，赋值给activeIndex
        const {current} =event.detail
        this.setData({
          activeIndex:current
        })
    }
  }
})
