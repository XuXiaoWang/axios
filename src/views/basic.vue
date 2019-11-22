<template>
  <div class="basic">
    
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'basic',
  components: {
    HelloWorld
  },
  created() {
    // axios的基本参数配置

    axios.create({
      baseURL:'',//请求的域名，地址
      timeout:1000,//请求超时的时长
      url:'',//请求路径
      method:'get,pos,put,petch,delete',//请求方法
      headers:{
        token:''
      },//请求头
      params:{},//请求参数拼接在url上
      data:{}, // 请求参数添加在请求体里
    })

    // axios的全局配置
    axios.defaults.timeout=1000;
    axios.defaults.baseURL='http://localhost:8080'
    // axios的实例配置
    let instance = axios.create();
    instance.defaults.timeout = 3000;//全局配置后还可以使用实例配置修改
    // axios的请求配置
    instance.get('/data.json',{
      timeout:5000
    })


    //三者的优先级  全局配置<实例配置<请求配置





    /***************************************/
    //实际开发
    //有两种请求接口
    //http:localhost:9090
    //http:localhost:9091
    let instance2 = axios.create({
      baseURL='http:localhost:9090',
      timeout:2000,
    });

    let instance3 = axios.create({
      baseURL='http:localhost:9091',
      timeout:3000,
    });

    instance2.get('/contactList').then(res=>{
      console.log(res);
    })



  },
}
</script>
