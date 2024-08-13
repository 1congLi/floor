//为什么采用类的方法封装：创建类，通过类的方式封装，会让代码更加具有复用性，也可以方便添加新的属性和方法
class WxRequest{
  //①定义实例属性，用来设置默认请求参数
  default={
    baseURL: '', // 请求基准地址
    url: '', // 接口的请求路径
    data: null, // 请求参数
    method: 'GET', // 默认的请求方法
    //用来设置请求头
    header:{
      "Content-type":'application/json' //设置数据的交互格式
    },
    timeout: 60000, // 默认的超时时长，小程序默认的超时时长是 1 分钟
    idLoading:true //默认都使用loading,若某一个按钮不想用就去按钮配置，
  }

  //默认拦截器对象，需要包含请求拦截器和响应拦截器，方便在请求之前、以及响应后的逻辑处理
    interceptors={
      //请求拦截器作用：在请求发送前，对请求参数进行新增或修改。
      request:(config) =>config
  ,
      response:(response) =>response
    }
    //定义数组队列，初始值是一个空数组，存储请求队列
    queue = []

      //③构造函数，可以用于创建和初始化类的属性和方法,可以修改默认请求参数
        constructor(params ={}){
          //在这里合并参数
        this.default= Object.assign({},this.default,params)
        }
    //request实例方法接收一个options对象类型的参数，和wx.request方法传递的参数一致
      request(options) {
        //注意：需要先合并完整的请求地址
        options.url =this.default.baseURL + options.url
        // ④再合并请求参数
        options = {...this.default , ...options}
        //在请求发送之前，添加loading效果
        // wx.showLoading()
        if(options.isLoading && options.method !== 'UPLOAD') {
        //判断queue队列是否为空，如果是空，则显示loading
        //如果不是空，就不显示，不调用wx.showLoading()
        this.queue.length === 0 && wx.showLoading()
        //然后立即向queue数组队列中添加请求标识
        //每个标识代表是一个请求，标识是自定义的
        this.queue.push('request')
        }    
        //在请求发生之前，调用请求拦截器
          options =  this.interceptors.request(options)
        //需要使用promise封装wx.request,处理异步请求
        return  new Promise((resolve,reject) =>{
          if(options.method === 'UPLOAD'){
            wx.uploadFile({
             //通过展开运算符，把options里的属性赋给另外一个wx.uploadFile对象
             ...options,
             success:(res) =>{
               //需要将服务器返回的字符串转换成对象
               res.data = JSON.parse(res.data)
               //合并参数，然后把参数抛给响应拦截器
              const mergeRes =  Object.assign({},res,{config:options,isSuccess:true})
              resolve(this.interceptors.response(mergeRes))
             },
             fail:(err) =>{
                //失败不用转对象
                //合并参数，然后把参数抛给响应拦截器
              const mergeErr =  Object.assign({},err,{config:options,isSuccess:false})
              reject(this.interceptors.response(mergeErr))  
             }
            })
          }else{
            wx.request({
              ...options,
              //当接口调用成功时,触发success回调函数
              success:(res) =>{
                //不管是成功响应还是失败响应，都要调用响应拦截器。还需接收服务器响应数据res,
                //再通过resolve把返回的数据res，给它抛出去
                //再给响应器传递参数时，要把请求参数一起传递。所以先合并参数，然后把合并的参数传给响应器
                 const mergeRes =  Object.assign({},res,{config:options,  isSuccess : true})
                resolve(this.interceptors.response(mergeRes))
              },
               //当接口调用失败时
              fail:(err)=>{
                //不管是成功响应还是失败响应，都要调用响应拦截器。还需接收服务器响应数据err,
                const mergeErr =   Object.assign({},err,{config:options,isSuccess:false})
                reject(this.interceptors.response(mergeErr))
              },
              //接口调用结束的回调函数（调用成功、失败都会执行）
              complete:() =>{
               if(options.isLoading){
                  //在每一个请求结束以后，都会执行complete回调函数
                //每次从queue队列中删除一个标识
                this.queue.pop()
                //在删除标识后，需要判断目前queue数组是否为空
                //如果是空，说明并发请求完成了。就要隐藏，并调用
                this.queue.length ===0 && wx.hideLoading()
  
                //不论请求成功还是失败，都要隐藏loading
                  // wx.hideLoading()
               }
              }
            })
          }
         
        })
      }
      //封装GET方法
      get(url,data={},config={}){
        //里面调用request方法,需要组织好参数，传递给request方法
        //当调用get方法时，需要将request方法的返回值return出去
         return this.request(Object.assign({url,data,method:'GET'},config))
      }
      //封装delete方法
      delete(url,data={},config={}){
        //里面调用request方法,需要组织好参数，传递给request方法
        //当调用get方法时，需要将request方法的返回值return出去
        return this.request(Object.assign({url,data,method:'DELETE'},config))
      }
       //封装POST方法
       post(url,data={},config={}){
        //里面调用request方法,需要组织好参数，传递给request方法
        //当调用get方法时，需要将request方法的返回值return出去
        return this.request(Object.assign({url,data,method:'POST'},config))
      }
       //封装PUT方法
       put(url,data={},config={}){
        //里面调用request方法,需要组织好参数，传递给request方法
        //当调用get方法时，需要将request方法的返回值return出去
        return this.request(Object.assign({url,data,method:'PUT'},config))
      }
      //all()方法，处理并发请求，接收一个参数，
        all(...promise){
          //以展开运算符的方式接收参数,...promise传入异步的任务，展开运算符把传入的参数对象转成了数组。
          return Promise.all(promise)
        }
        /**
   * @description upload 实例方法，用来对 wx.uploadFile 进行封装
   * @param {*} url 文件的上传地址、接口地址
   * @param {*} filePath 要上传的文件资源路径
   * @param {*} name 文件对应的 key
   * @param {*} config 其他配置项
   */
        upload(url, filePath, name = 'file', config = {}) {
          return this.request(
            Object.assign({ url, filePath, name, method: 'UPLOAD' }, config)
          )
        }
  }

export  default WxRequest