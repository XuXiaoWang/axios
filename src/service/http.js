import axios from 'axios'
import service from './contactApi'
import { Toast } from 'vant';

console.log(axios)
//service循环遍历输出不同的请求方法
let instance = axios.create({
  baseURL: 'http://localhost:9000/api',
  timeout: 1000,
})


//包裹请求方法的容器
const Http = {};



// ***请求格式、参数的统一
for (let key in service) {
  let api = service[key];  //url;
  //async作用：避免进入回调地狱
  // axios.get().then(res=>{
  //   axios.get().then(res=>{
  //   })
  // })

  // let res = null;
  // try{
  //    res =  await axios.get('url')
  // }catch{
  //     res=err;
  // }
  Http[key] = async function (
    params,//请求参数 get,delete:(url) put,post,patch(data)
    isFormData = false,//标识是否是form-data请求
    config = {}, //配置参数
  ) {
    // let url = api.url;
    let newParams = {};
    //content-type是否是form-data的判断
    if(params && isFormData){
      newParams = new FormData();
      for(let i in params){
        newParams.append(i,params[i])
      }
     }else{
       newParams = params
     }
      //不同请求的判断
      let response = {}; //请求的返回值;
      if(api.method === 'put'|| api.method === 'post' || api.method === 'patch'){
        console.log(response)
        try{
          response = await instance[api.method](api.url,newParams,config)
        }catch(error){
            response = error
        }
      }else if(api.method === 'delete' || api.method === 'get'){
        config.params = newParams;
        try{
          response = await instance[api.method](api.url,config)
        }catch(error){
            response = error
        }

      }
      return response ; //返回响应值
  }
    
}

// 请求拦截器
instance.interceptors.request.use(config=>{
  //发情请求前做些什么
  Toast.loading({
    mask:false,//是否有阴影
    duration:0,
    forbidClick:true,//是否禁止点击
    message:'加载中.....'
  })
  return config;
},()=>{
  Toast.clear();
  Toast('请求错误，请稍后重试');
})

// 响应拦截器
instance.interceptors.response.use(res=>{
  //请求成功
  Toast.clear();
  return res.data;
},()=>{
  Toast.clear()
  Toast('请求错误,请求稍后重试');
})


//抛出
export default Http;