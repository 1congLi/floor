/**
 *  @description  存储数据
 * @param {*} key 本地缓存中指定的key
 * @param {*} value 需要缓存的数据
 */

export  const setStorage =(key,value) =>{
  try{
    wx.setStorageSync(key, value)
  }catch(error){
    console.error(`存储${key}时出现了异常`,error)
  }
}

export  const  getStorage=(key) =>{
  try{
      const value = wx.getStorageSync(key)
      if(value){
        return  value
      }
  }catch(error){
    console.error(`读取指定${key}时出现了异常`,error)
  }
}
export  const removeStorage = (key) =>{
  try{
    wx.removeStorageSync(key)
  }catch(error){
    console.error(`移除指定${key}时出现了异常`,error)
  }
}
export  const clearStorage = () =>{
  try{
    wx.clearStorageSync()
  }catch(error){
    console.error(`清除全部${key}时出现了异常`,error)
  }
}

/**异步将数据存储到本地 */
export  const asyncSetStorage  =(key,data) =>{
  return  new Promise((resolve) =>{
    wx.setStorage({
      key,
      data,
      //complete回调函数，不管接口成功还是失败都执行，res是接口结果，要抛出去
      complete(res){
        resolve(res)
      }
    })
  })
}

export  const asyncGetStorage =(key) =>{
  return  new Promise((resolve)=>{
    wx.getStorage({
      key,
      complete(res){
        resolve(res)
      }
    })
  })
}
export  const asyncRemoveStorage =(key) =>{
  return  new Promise((resolve)=>{
    wx.removeStorage({
      key,
      complete(res){
        resolve(res)
      }
    })
  })
}
export  const asyncClearStorage =() =>{
  return  new Promise((resolve)=>{
    wx.clearStorage({
      complete(res){
        resolve(res)
      }
    })
  })
}