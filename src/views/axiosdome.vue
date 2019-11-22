<template>
  <div class="axiosdome">
    <h1>axiosDome</h1>
  </div>
</template>

<script>
// @ is an alias to /src
/*
  axios请求方法:get,psot,put,patch
  delete


  get:获取数据
  post:提交数据(表单提交+文件上传)
  put:更新数据 (所有数据推送到后端)
  patch：更新数据 (直降修改的数据推送到后端)
  delete:删除数据

*/
import axios from 'axios'
export default {
  name: 'axiosdome',
  components: {
  },
  created() {
    //get请求的两种书写方式
    //方式一：
    axios.get('/data.json',{
      params:{
        id:12
      }
    }).then((res)=>{
      console.log(res);
    })
    //方式二：
    axios({
      method:'get',
      url:'/data.json',
      params:[
        {id:12}
      ]
    }).then(res=>{
      console.log(res);
    })

    // post
    // form-data 表单提交(图片，文件上传)
    // applicition/json
    let data = {
      id:15
    }
    axios.post('/post',data).then(res=>{
      console.log(res)
    });

    axios({
      method:'post',
      url:'/post',
      data:data
    }).then(res=>{
      console.log(res);
    })

    // from-data
    let fromData = new FormData();
    for(let key in data){
      fromData.append(key,data[key])
    }

    axios.post('/post',fromData).then(res=>{
      console.log(res);
    })

    //put请求
    axios.put('/put',data).then(res=>{
      console.log(res)
    })
    //patch请求
    axios.patch('/patch',data).then(res=>{
      console.log(res);
    })



    //delete请求
    //Query String Parameters
    axios.delete('/delete',{
      params:{
        id:15
      }
    }).then(res=>{
      console.log(res)
    })
    //Request Payload
    axios.delete('/delete',{
      data:{
        id:15
      }
    }).then(res=>{
      console.log(res)
    })


    axios({
      method:'delete',
      url:'/delete',
      // 请求体在哪个位置使用哪个
      params:{}, //在url上的
      data:{}    //在请求体里的
    }).then(res=>{
      console.log(res)
    })

  },
}
</script>
