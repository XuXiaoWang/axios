<template>
  <div class="blocker">
    <h1>请求拦截器</h1>
  </div>
</template>

<script>

import axios from 'axios'
export default {
  name: 'blocker',
  components: {
  },
  created() {
    //请求拦截器
    axios.interceptors.request.use(config=>{
      //在发送请求前做些什么
      return config
    },err=>{
      //在请求错误的时候做些什么
      return Promise.reject(err);
    })


    //响应拦截器
    axios.interceptors.response.use(res=>{
      //请求成功对相应数据做处理
      return res;
    },err=>{
      //响应错误做什么
      return Promise.rejcet(err);
    })

    // 模拟一个实例
    axios.get().then(res=>{
        //成功的处理
    }).catch(err=>{
        //失败的处理
    })



    //取消拦截器(了解)
    let interceptors = axios.interceptors.request.use(config=>{
      return config
    })
    axios.interceptors.request.eject(interceptors)




  // 例子 登录状态（token:''）;
  // 需要登录时的接口
  let instance = axios.create({})
  instance.interceptors.request.use(config=>{
        config.headers.token = ''  //直接使用请求拦截器去将token添加到头部并返回回去
        return config;
  })

  // 不需要登录的接口
  let newInstance = axios.create({})

  // 移动端开发
  let instance_phone = axios.create({})
  instance_phone.interceptors.request.use(config=>{
    $('#model').show(); //等待的弹窗
    return config;
  })

  instance_phone.interceptors.response.use(res=>{
    $('#model').hide(); //等待的弹窗
    return res;
  })










  },
}
</script>
