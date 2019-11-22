<template>
  <div class="requ">
      <h1>requests并发请求</h1>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'requ',
  components: {
  },
  created() {
    // axios.all()  axios.spread();
    // axios的并发请求，同时请求多个接口，并统一处理
    axios.all([
      axios.get('/data.json'),
      axios.get('/city.json')
    ]).then(
      axios.spread((dataRes,cityRes)=>{
        console.log(dataRes,
        cityRes)
      })
    );

    // 创建axios实例
    // 原因：后端接口地址有多个，并且各个超时时长不一致
    // 使用实例去请求接口
    let instance = axios.create({
      baseURL:'http://localhost:8080',
      timeout:1000
    })
    let instance2 = axios.create({
      baseURL:'http://localhost:9090',
      timeout:5000
    })
    instance.get('/data.json').then(res=>{
      console.log(res)
    })
    instance2.get('/city.json').then(res=>{
      console.log(res)
    })


  },
}
</script>
