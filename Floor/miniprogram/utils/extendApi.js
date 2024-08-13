
//可以传参也可不传，传入的对象作为参数，要解构
//const toast  =(options={}) =>{}

const toast  =({title='数据在加载',icon='none',duration=2000,mask=true}={}) =>{
    wx.showToast({
      title,
      icon,
      duration,
      mask
    })
}

const model = ({title='嘿嘿',content='你好 ',success ={},showCancel='true'} = {}) =>{
  return new Promise((resolve) =>{
    wx.showModal({
      title,
      content,
      success ,
      showCancel,
      complete({confirm,cancel}){
        confirm && resolve(true)
        cancel && resolve(false)
      }
    })
  })
   
}
const model333 =(option ={}) =>{
  //在方法内部需要通过promise返回用户的操作
  //点击了确定，通过resolve返回true
  return new Promise((resolve) =>{
   
      //默认的参数
      const defaultOpt = {
        title:'嘿嘿',
        content:'不好'
      }
      //传入的参数会覆盖默认的参数，后者覆盖前者
      const opts = Object.assign({},defaultOpt,option)
      wx.showModal({
        ...opts,
        complete({confirm,cancel}){
          confirm && resolve(true)
          cancel && resolve(false)
        }
    })
  })
}

wx.toast  =toast
wx.model = model
export  {toast, model333 ,model}