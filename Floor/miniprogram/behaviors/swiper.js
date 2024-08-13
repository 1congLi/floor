 export const swipeCellBehavior = Behavior({
    data:{
      swipeCellQuene:[] , //用来存储滑动单元格实例，可能有好几个
    },
    methods:{
  //当用户打开滑块时触发
  swipeCellOpen(event){
    //获取单元格实例
    const instance =  this.selectComponent(`#${event.target.id}`)
    //把实例追加到数组里
    this.data.swipeCellQuene.push(instance)
    // this.setData({   把实例放到数组里
    //   swipeCellQuene: 
    // })
  },
  //给页面绑定点击事件，函数中能获取实例数组并遍历，最后调用close方法
  onSwipeCellPage(){
      this.onSwipeCellCommonClick()
  },
  //点击滑动单元格时触发的事件，获取单元格实例数组遍历
  onSwipeCellClick(){
    this.onSwipeCellCommonClick()
  },
  //上面两个事件逻辑一样，这里写关掉滑块的统一逻辑
  onSwipeCellCommonClick(){
      this.data.swipeCellQuene.forEach((instance) =>{
        instance.close()
      })
      //在把滑动单元格数组清空
      this.data.swipeCellQuene = []
  },    
    }
})