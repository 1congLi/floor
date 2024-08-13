import  instance from '@/utils/http.js'
import  {reqSwiperData} from '@/api/index'
Page({
  async handle(){
    const res = await reqSwiperData()
    console.log(res)
    //异步请求两种调用方式：1， .then() 2,async,await
    // instance.request({
    //   url:'https://gmall-prod.atguigu.cn/mall-api/index/findBanner',
    //   method:'GET',
    // }).then((res) =>{
    //   console.log(res)
    // })

    //  let result= await instance.request({
    //   url:'/index/findBanner',
    //   method:'GET',
    // })
    ///index/findBanner
    //这里配置是让一个按钮不显示loading,要是想让3个按钮都不显示就要去实例那里配置
        // const res = await instance.get('/cart/getCartList',null,{isLoading:false})
        // console.log(res)

        // return  Promise.reject(response)把错误抛出来， 这里就可以.catch捕获错误

        // const res = await instance.get('/cart/getCartList')
        // console.log(res)
       
  },

   handler1(){
    wx.request({
      url:'https://gmall-prod.atguigu.cn/mall-api/index/findBanner',
      method:'GET',
      isLoading:true,
      success:(res) =>{
        console.log(res)
      },
      fail:(err) =>{
        //一般网络出现异常（超时），会走fail
        console.log(err)
      }
    })
  },
  //测试并发请求 1。async,await第一个请求结束后，才发下一个请求，会造成请求阻塞，影响页面渲染速度
 async allhandler(){
//    await instance.get('/index/findBanner')
//    await instance.get('/index/findCategory1')
//    await instance.get('/index/findBanner')

  // Promise.all接收一个数组，数组每一项都是一个异步任务。3个请求同时发送。
  // await Promise.all([instance.get('/index/findBanner'),
  // instance.get('/index/findCategory1'),
  // instance.get('/index/findBanner')])

   const res =  await instance.all(instance.get('/index/findBanner'),
  instance.get('/index/findCategory1'),
  instance.get('/index/findBanner'),
  instance.get('/index/findCategory1'),
  instance.get('/index/findCategory1'),
  instance.get('/index/findCategory1'),
  instance.get('/index/findCategory1'),
  instance.get('/index/findCategory1')
  )
  console.log(res)

  },
  data:{
    avatarUrl:'../../assets/banner/banner-1.jpg'
  },
  //获取微信头像
  async chooseavatar(event){
    //目前的头像是临时路径，想上传到公司服务器就要wx.upload
    const { avatarUrl } = event.detail
    //使用封装后的实例方法
    // const { data: avatar } = await instance.upload('/fileUpload', avatarUrl, 'file')
       const  res =  await instance.upload('/fileUpload',avatarUrl,'file')
       //data解构，重命名为avata
       console.log(res)
       const avatar = res.data
    this.setData({
      avatarUrl:avatar
    })
     // 第一种实现本地资源上传的方式：  这里的方法都是没进行封装的
    // 在获取头像临时路径以后，需要将临时路径通过 wx.uploadFile 上传到服务器
    // wx.uploadFile({
    //   url: 'https://gmall-prod.atguigu.cn/mall-api/fileUpload', // 开发者服务器地址
    //   filePath: avatarUrl, // 要上传的文件资源路径
    //   name: 'file', // 文件对应的 key.服務器根據key获取文件的二进制信息
    //   header: {
    //     token: getStorage('token')
    //   },
    //   success: (res) => {
    //     // console.log(res)
    //     // 调用 uploadFile 方法，返回的数据是 JSON 字符串，需要自己使用 JSON.parse 进行转换
    //     const uploadRes = JSON.parse(res.data)
    //     // console.log(uploadRes)

    //     this.setData({
    //       'userInfo.headimgurl': uploadRes.data
    //     })
    //   }
    // })

    this.setData({
      'userInfo.headimgurl': avatarUrl
    })
  }
})
