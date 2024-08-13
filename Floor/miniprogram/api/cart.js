import http from '@/utils/http'
//加入购物车确定按钮接口
export const reqAddCart = ({goodsId,count,...data}) =>{
  return http.get(`/cart/addToCart/${goodsId}/${count}`,data)
}
//购物车列表接口
export const reqCartList = () => {
  return http.get('/cart/getCartList')
}
//更新商品状态
export const reqUpdateChecked = (goodsId, isChecked) => {
  return http.get(`/cart/checkCart/${goodsId}/${isChecked}`)
}


//全选与全不选
export const reqCheckAllStatus = (isChecked) => {
  return http.get(`/cart/checkAllCart/${isChecked}`)
}

//删除购物车商品
export const reqDelCartGoods = (goodsId) => {
  return http.get(`/cart/delete/${goodsId}`)
}