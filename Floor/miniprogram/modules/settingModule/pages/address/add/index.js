
//位置服务逆地址解析 和 表单验证
import  QQMapWX  from '../../../libs/qqmap-wx-jssdk.min'
import Schema from 'async-validator'
import {reqAddAddress, reqUpdateAddress,reqAddressInfo} from '../../../api/address'
Page({
  
  //页面的初始数据
  data:{
    // address:{ 需要将请求参数放到data对象下，方便在模板中绑定数据
      name: "",   //收货人
      phone: "",    //手机号码
      provinceName: "",   //省
      provinceCode: "",   //省编码
      cityName: "",   //市
      cityCode: "",   //市编码
      districtName: "",   //区
      districtCode: "",   //市编码
      address: "",    //详细地址
      fullAddress: "",    //完整地址
      isDefault: false  //是否设置为默认地址，0表示不设置为默认地址
  },
  //保存收货地址
  async  saveAddrssForm(){
    //组织参数（完整地址、是否设置为默认地址）
      const {
        provinceName,
        cityName,
        districtName,
        address,isDefault}  = this.data
    //最终需要发送的请求参数 把data里的数据都赋值给params
    const params = {
      ...this.data,
      fullAddress : provinceName  + cityName + districtName+ address,
      isDefault:isDefault ? 1: 0
    }
    //对组织后的参数params进行验证，验证通过后调用新增的API接口，实现新增地址的功能,validatorAddress方法返回的是promise,所以await
   const {valid} = await  this.validatorAddress(params)
    // console.log(res)
    //如果valid是false，失败就不往下进行了，如果成功调接口
    if(!valid){   return  }
    //有id是更新收货地址功能， 没有id是新增
    const res = this.addressId? await reqUpdateAddress(params)  : await reqAddAddress(params)
    if(res.code===200){
      //返回收货地址列表页
      wx.navigateBack({
        success:()=>{
          wx.toast({title:  this.addressId? '更新收货地址成功'   : '新增收货地址成功！'})
        }
      })
     
    }
    
  },
  //对新增收货地址请求参数进行验证
  validatorAddress(params){
 // 验证收货人，是否只包含大小写字母、数字和中文字符
 const nameRegExp = '^[a-zA-Z\\d\\u4e00-\\u9fa5]+$'
 // 验证手机号，是否符合中国大陆手机号码的格式
 const phoneReg = '^1(?:3\\d|4[4-9]|5[0-35-9]|6[67]|7[0-8]|8\\d|9\\d)\\d{8}$'
    const rules = {
      name:[
        { required: true, message: '请输入收货人姓名'  },
        {pattern: nameRegExp,  message: '收货人姓名不合法'}
      ],
      phone:[
        {required: true, message: '请输入收货人手机号'},
        {pattern:phoneReg,message: '收货人手机号不合法'}
      ],
      provinceName:{
        required: true, message: '请选择收货人所在地区' },
      address:{
        required: true, message: '请输入详细地址' }
    }
    //新增收货地址表单验证 // 传入验证规则进行实例化
    const validator =  new Schema(rules)
    // 注意：我们希望将验证结果通过 Promise 的形式返回给函数的调用者
    return new Promise((resolve) => {
      validator.validate(params,(errors) =>{
          if(errors){
            wx.toast({ title: errors[0].message })
            // 如果属性值是 false，说明验证失败
            resolve({ valid: false })
          }else{
            // 如果属性值是 true，说明验证成功
            resolve({valid:true})
          }
      })
    })
    
  },
  //省市区选择
    onAddressChange(event){
      // 解构省市区以及编码
      const [provinceName,cityName,districtName] =event.detail.value
      const [provinceCode, cityCode, districtCode] = event.detail.code
      //解构获取完该保存，然后显示了
      this.setData({
        provinceName,
        cityName,
        districtName,
        provinceCode,
        cityCode,
        districtCode
      })
    },
    //用来处理更新收货地址
    async showAddressInfo(id){
      if(!id) return
      const {data} = await reqAddressInfo(id)
      this.setData(data)
      wx.setNavigationBarTitle({
        title:'更新收货地址'
      })
    },
    onLoad:function(options){
      //实例化QQMapWX，挂载到this上可以给其他使用
      this.qqmapswx = new QQMapWX({
        key: '4YBBZ-HWIKB-PKJUN-NOEAD-PPRUV-QMFCN'
    });
    // console.log(options.id)
    this.showAddressInfo(options.id)
    },
    //获取用户地理位置信息
    // async onLocation(){
    //   //能够获取当前经纬度、高度，需要定义app.json里的permission
    //   // const res =   await wx.getLocation()
    //   // console.log(res)console.log(res)
    //   //能够让用户自己选择地理位置，不需要定义permission，返回的有经纬度，省市区，但是没有接口需要的省市区名称代码
    //   const {name,latitude,longitude}=await wx.chooseLocation()
    //   //而腾讯地图有，所以使用reverseGeocoder逆地址解析
    //   this.qqmapswx.reverseGeocoder({
    //     location:{
    //       longitude,
    //       latitude
    //     },
    //     success:(res)=>{
    //       //获取省市区编码、省市区
    //       const {adcode,province,city,district} = res.result.ad_info
    //       const {street,street_number}  = res.result.address_component
    //       const {standard_address} =res.result.formatted_addresses
    //       //对获取的数据进行格式化、组织，然后赋值给data中字段
    //       this.setData({
    //         provinceName: province,   
    //         //如果是省前2位有值，后面4个是0
    //         provinceCode: adcode.replace(adcode.substring(2,6),'0000') ,   
    //         cityName: city,   
    //         //如果是市前4位有值，后面2位是0
    //         cityCode: adcode.replace(adcode.substring(4,6),'00'),   
    //         districtName: district,   
    //         //东莞市、中山市 4个市其下无区县级，所以&& district
    //         districtCode:  district && adcode ,   
    //         address: street + street_number +name,    
    //         // fullAddress: province +city+ district + address,    
    //         fullAddress: standard_address +name
    //       })
    //     }
    //   })
    // },
   
   
  
})