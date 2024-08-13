// pages/cart/component/cart.js
// import { swipeCellBehavior } from '@/behaviors/swiper'
import {ComponentWithStore} from 'mobx-miniprogram-bindings'
import {userStore} from '@/stores/userstore'
import {reqCartList,reqUpdateChecked,reqCheckAllStatus,reqAddCart,reqDelCartGoods} from '@/api/cart'
import  {debounce} from 'miniprogram-licia'
//导入让删除滑块自动弹回的behavior
import {swipeCellBehavior} from '@/behaviors/swiper'
//导入computed 提供的behavior
const computedBehavior = require('miniprogram-computed').behavior
ComponentWithStore({
  //注册behavior
  behaviors:[computedBehavior,swipeCellBehavior],
  //让页面和store对象建立联系
  storeBindings:{
    store:userStore,
    fields:['token']
  },
  // 组件的初始数据
  data: {
    cartList: [],//购物车的数据
    emptyDes: '还没有添加商品，快去添加吧～',
    totalPrice:'', //所有购买商品的总价格

  },
  computed:{
    //判断是否是全选，从而控制全选按钮的选中效果。定义个计算属性函数,计算属性会被挂载到对象中
    selectAllStatus(data){
    //computed函数不能使用this访问data里的数据，如果想需要使用形参data,计算属性必须有return
    return  (  data.cartList.length !== 0 && data.cartList.every((item) => item.isChecked === 1)
    )
    },
    //计算订单总金额
    totalPrice(data){
      let totalPrice = 0
      //对购物车列表数据进行遍历
      data.cartList.forEach(item =>{
        //需要判断商品 是否是选中的状态 ischecked ==1
        if(item.isChecked ===1){
          //计算被选中的总价
          totalPrice += item.price *item.count
        }       
        //而不是在这里return
      })
      //在这里return
      return totalPrice
    }

  },
  // 组件的方法列表
  methods: {
      //展示文案的同时获取购物车列表数据
      async showTipGetList(){
          const {token} = this.data
          if(!token){
            this.setData({
              emptyDes:'还没有添加商品，快去添加吧～',
              cartList: [],
            })
            return
          } 
          //有token，就获取购物车列表数据
          const {code,data:cartList} = await reqCartList()
          // console.log(res)
          if(code == 200){
            this.setData({
              cartList,
              emptyDes: cartList.length ===0 && '还没有添加商品，快去添加吧～'
            })
          }
          
      },

    //如果使用component方法来构建页面，钩子函数要写到这里
    onShow(){
        this.showTipGetList()
    },
    onHide(){
      //在页面隐藏的时候，需要让滑块自动隐藏
      this.onSwipeCellCommonClick()
    },
    //更新商品的购买状态
    async updateChecked(event){
      // console.log(event)
      //获取最新的购买状态
      const {detail} = event
      //获取传递的商品ID和索引
      const {id, index} = event.target.dataset
      //将最新购买状态转换为接口需要的 1 和 0
      const isChecked = detail? 1:0
      const res = await reqUpdateChecked(id,isChecked)
      // console.log(res)
      if(res.code ===200){
        // this.showTipGetList() 这是第一种方式，第二种方式不发请求，直接更新本地的数据
        this.setData({
          [`cartList[${index}].isChecked`] : isChecked
         
        })
      }
    },
    //实现点击全选按钮，全部选择和 全不选择
    async selectAllStatus(event){
      //获取全选按钮的选中状态  
      const {detail} = event
      console.log(detail)
      //需要将选中的状态转化为接口要的数据isChecked
      // if(detail){    
      // }
      const isChecked = detail? 1:0
        const res = await reqCheckAllStatus(isChecked)
        // console.log(res)
        if(res.code ===200){
          // this.showTipGetList() 第二种方法不通过调用接口更新数据，而通过更新本地数据的方式，更新选中的状态
          // this.data.cartList.forEach((item) =>{
          //   this.setData({
          //     [`cartList[${index}].isChecked`]  :isChecked
          //   })    频繁调用setdata会产生性能问题，先将cartList深拷贝,而不是直接对data里的数组遍历
          // })

           const newCartList =  JSON.parse(JSON.stringify(this.data.cartList))
           newCartList.forEach(item => item.isChecked = isChecked)
           this.setData({
            cartList: newCartList
           })
          //  const newCartList =  Object.assign({}, cartList) 报错，因为是对对象玩的
          // const newCartList =[...cartList]  报错，因为它还是浅拷贝
          //  this.setData({
          //   cartList: newCartList
          //  })
        }
    },
    //更新购买的数量
    changeBuyNum: debounce(async function (event) {
      // 获取最新的购买数量
      // 如果用户输入的购买数量大于 200，需要把购买数量设置为 200
      // 最大购买数量是 200，目前购买数量是 1，假设用户输入了 666，666 - 1 = 665，665 + 1 = 666
      // 最大购买数量是 200，如果用户输入的购买数量是 666，重置为 200， 200 - 1 = 199，199 + 1 = 200
      const newBuyNum = event.detail > 200 ? 200 : event.detail

      // 获取商品的 id、索引、之前的购买数量
      const { id, index, oldbuynum } = event.target.dataset

      // 使用正则验证用户输入的购买数量，是否是 1-200 之间的正整数
      const reg = /^([1-9]|[1-9]\d|1\d{2}|200)$/

      // 对用户输入的值进行验证，验证通过 true，验证失败 false
      const regRes = reg.test(newBuyNum)

      // 如果验证没有通过，说明用户输入的购买数量不合法或者小于 1，需要还原为之前的购买数量
      if (!regRes) {
        this.setData({
          [`cartList[${index}].count`]: oldbuynum
        })

        // 如果验证没有通过，需要阻止代码继续往下运行
        return
      }

      // 如果验证通过，就需要计算差值，然后把差值发送给公司的服务器，让服务器进行逻辑处理
      const disCount = newBuyNum - oldbuynum

      // 判断购买数量是否发生了改变，如果购买数量没有发生改变，不发送请求
      if (disCount === 0) return

      // 如果购买数量发生了改变，需要调用接口，传递差值
      const res = await reqAddCart({ goodsId: id, count: disCount })

      // 如果服务器更新购买数量成功，需要更新本地的购买数量
      if (res.code === 200) {
        this.setData({
          [`cartList[${index}].count`]: newBuyNum,
          // 如果购买数量发生了变化，需要让当前商品变成选中的状态
          [`cartList[${index}].isChecked`]: 1
        })
      }
    }, 500),
    //删除某个商品，金额重新加载
    async delCartGoods(event){
        console.log(event)
        const {id} = event.target.dataset
        const modalRes = await   wx.model({
          content:'确定删除吗'
        })
        if(modalRes){
          await reqDelCartGoods(id)
          this.showTipGetList()
        }
    },
    //跳转到订单结算页面
    toOrder(){
      //先判断用户有没有选择商品，
      if(this.data.totalPrice === 0){
        wx.toast(
          { title: '请选择需要购买的商品'}
          )
        return
      }
      wx.navigateTo({
        url: '/modules/orderPayMoudle/pages/order/detail/detail'
      })
    }
  } 
})
