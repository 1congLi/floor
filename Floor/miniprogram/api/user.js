import  http from "../utils/http"
// 进行登录操作， code是临时登录凭证
 export const reqLogin =(code) =>{
   return http.get(`/weixin/wxLogin/${code}`)
 }
 /**
 * @description 获取用户信息
 * @returns Promise
 */
 export const reqUserInfo = () => {
  return http.get('/weixin/getuserInfo')
}
export const  reqUploadFile = (filePath,name) =>{
  return  http.upload('/fileUpload',filePath,name)
}
export  const reqUpdateUserInfo =(userInfo) =>{
    return  http.post('/weixin/updateUser',userInfo)
}