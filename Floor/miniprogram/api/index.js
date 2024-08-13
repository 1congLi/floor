//导入封装的 网络请求模块实例
import  http from '../utils/http.js'

// 获取首页轮播图数据
// export const reqSwiperData =() =>{
//    return http.get('/index/findBanner')
// }
// export const reqSwiperData =()=>http.get('/index/findBanner')
export const reqIndexData = () =>{
  //通过Promise.all并发请求获取首页数据，提升页面渲染速度
  //  return Promise.all({
  //      http.get('/index/findBanner'),
  //   http.get('/index/findCategory1'),
  //   http.get('/index/advertisement'),
  //   http.get('/index/findListGoods'),
  //   http.get('/index/findRecommendGoods')
  // })
  //使用封装的all方法发送请求
  return http.all(  
    http.get('/index/findBanner'),
    http.get('/index/findCategory1'),
    http.get('/index/advertisement'),
    http.get('/index/findListGoods'),
    http.get('/index/findRecommendGoods')
    )
}