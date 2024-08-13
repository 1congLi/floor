import http from '../utils/http'

// 获取商品分类的数据
export  const reqCategoryData =() =>{
     return http.get('/index/findCategoryTree')
}
