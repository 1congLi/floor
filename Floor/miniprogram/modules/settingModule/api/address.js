import  http from '../../../utils/http'
// 新增收货地址
export  const reqAddAddress = (data)=>{
  return http.post('/userAddress/save', data )
}
//获取收货地址列表接口
export  const reqAddressList  =()=>{
  return  http.get('/userAddress/findUserAddress')
}
//获取收货地址详情
export const reqAddressInfo =(id)=>{
  return  http.get(`/userAddress/${id}`)
}
//更新收货地址/userAddress/update
export const reqUpdateAddress  =(data)=>{
  return  http.post('/userAddress/update',data)
}
//删除收货地址
export const reqDelAddress = (id) => {
  return http.get(`/userAddress/delete/${id}`)
}