import http from '../../../utils/http'
// 获取商品列表数据，共4个参数。 ...data是获取剩余参数
export  const reqGoodsList =({page,limit,...data}) =>{
  return http.get(`/goods/list/${page}/${limit}`,data)
}
//获取商品的详情
export const reqGoodsInfo = (goodsId) =>{
  return http.get(`/goods/${goodsId}`)
}