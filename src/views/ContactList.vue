<template>
  <div class="home">
    <h1>联系人列表</h1>
    <van-button type="default">默认按钮</van-button>
    <van-contact-list :list="list" @add="onAdd" @edit="onEdit" />

    <van-popup v-model="showEdit" position="bottom">
      <van-contact-edit
        :contact-info="editingContact"
        :is-edit="isEdit"
        @save="onSave"
        @delete="onDelete"
      />
    </van-popup>
  </div>
</template>

<script>
import axios from "axios";

// import Button from 'vant/lib/button';
// import ContactList from 'vant/lib/contact-list';
// import Toast from 'vant/lib/toast'
// import 'vant/lib/button/style';
// import 'vant/lib/contact-list/style';

import {
  Button,
  ContactList,
  ContactCard,
  ContactEdit,
  Popup,
  Toast
} from "vant";
export default {
  name: "home",
  data() {
    return {
      list: [
        {
          id: 1,
          name: "",
          tel: ""
        }
      ],
      instacnce: null, //axios的实例
      showEdit: false, //编辑弹窗的显示隐藏
      isEdit: false, //控制新建或者编辑
      editingContact: {} //正在编辑的联系人数据
    };
  },
  components: {
    [Button.name]: Button,
    [ContactList.name]: ContactList,
    [ContactCard.name]: ContactCard,
    [ContactEdit.name]: ContactEdit,
    [Toast.name]: Toast,
    [Popup.name]: Popup
  },
  created() {
    this.instacnce = axios.create({
      baseURL: "http://localhost:9000/api",
      timeout: 1000
    });
    this.getList();
  },
  methods: {
    //获取联系人列表
    async getList() {
      // 使用封装的axios方法
     let res = await this.$Http.getContactList()
     this.list = res.data;
      // this.instacnce
      //   .get("/contactList")
      //   .then(res => {
      //     if (res.data.code === 200) {
      //       console.log(res);
      //       this.list = res.data.data;
      //     }
      //   })
      //   .catch(() => {
      //     Toast("提示内容");
      //   });
    },
    //添加联系人
    onAdd() {
      this.showEdit = true;
      this.isEdit = false;
    },
    //编辑联系人
    onEdit(info) {
      this.showEdit = true;
      this.isEdit = true;
      this.editingContact = info;
    },
    // 保存联系人
     async onSave(info) {
      if (this.isEdit) {
        //编辑保存
        let res = await this.$Http.editContact(info);
        if(res.code===200){
            Toast("编辑成功");
            this.showEdit = false;
            this.getList();
        }
        // this.instacnce.put('/contact/edit',info).then(res=>{
        //   if(res.data.code===200){
        //       Toast("编辑成功");
        //       this.showEdit = false;
        //       this.getList();
        //   }
        // }).catch(err=>{
        //   console.log(err)
        //   Toast('失败了')
        // })
      } else {
        //新建保存
        let res = await this.$Http.newContactJson(info,false);
        if (res.code === 200) {
            Toast("新建成功");
            this.showEdit = false;
            this.getList();
        }
        // let res = await this.$Http.newContactForm(info,true);
        // if (res.code === 200) {
        //     Toast("新建成功");
        //     this.showEdit = false;
        //     this.getList();
        // }

        // this.instacnce
        //   .post("/contact/new/json", info)
        //   .then(res => {
        //     if (res.data.code === 200) {
        //       Toast("新建成功");
        //       this.showEdit = false;
        //       this.getList();
        //     }
        //   })
        //   .catch(err => {
        //     console.log(err);
        //     Toast("新建失败");
        //   });
      }
    },
    // 删除联系人
    async onDelete(info) {
      let res = await this.$Http.delContact({
        id:info.id
      })
      if(res.code===200){
        Toast('删除成功')
        this.showEdit = false;
        this.getList()
      }
      // this.instacnce.delete('/contact',{
      //   params:{
      //     id:info.id
      //   }
      // }).then(res=>{
      //   if(res.data.code===200){
      //     Toast('删除成功')
      //     this.showEdit = false;
      //     this.getList()
      //   }
      // }).catch(()=>{
      //   Toast('删除失败了');
      // })
    }
  }
};
// async/await的基础用法：
/*
  1、方便级联调用：即调用一次发生的场景
  2、同步代码的编写方式：Promise使用then函数进行链式调用，一直点点点，
     是一种从左向右的横向写法；async/await从上到下，顺序执行，就像写
     同步代码一样，更符合代码编写习惯
  3、多个参数传递：Promise的then函数只能穿第一个参数，虽然可以通过包装成对象
     来传递多个参数，但是会导致传递冗余信息，频繁的解析又重新组合参数，比较麻烦
     async/await没有这个限制，可以当做普通的局部变量来处理，用let或者const定义
     的块级变量想怎么用就怎么用，想定义几个就定义几个，完全没有限制，也没有冗余工作
  4、同步的代码和异步的代码可以一起编写：使用Promise的时候最好将同步带吗和异步代码放在
     不同的then节点中，这样结构更加清晰；async、await整个书写习惯都是同步的，不需要纠结同步
     和异步的区别，当然，异步过程需要包装成一个Promise对象放在await关键字后面
  5、基于协程：Promise是根据函数式编程的范式，对异步过程进行了一层封装，async/await基于协程
     的机制，是真正的“保存上下文，控制权切换...控制权恢复”,取回上下文“这种机制”，是对异步过程
     更精准的一种描述
  6、async/await是对Promise的优化，async/await是基于Promise的，是进一步的一种优化，不过在
     写代码时，Promise本身的API出现的很少，很接近同步代码的写法
  7、




  async关键字：
      1、表明程序里面可能有异步过程，async关键字表明程序里面可能有异步过程，里面可以有await关键字
         当然全部是同步代码也没关系，但是这样async关键字就显得多余了；
      2、非阻塞：async函数里面如果有异步过程会等待，但是async函数本身会马上返回，不会阻塞当前
         线程，可以简单认为，async函数工作在主线程，同步执行，不会阻塞界面渲染，async函数内部由
         await关键修饰的异步过程，工作在响应的携程上，会阻塞等待异步任务的完成再返回；
      3、async函数返回类型为Promise对象：这是和普通函数本质上不同的地方，也是使用时重点注意的地方；
         (1):return newPromise():这个符合async函数本意
         (2):return data:这是是同步函数的写法：这里是要特别注意的，这个时候，其实就相当于Promise.resolve(data)
             还是一个Promise对象，但是在调用async函数的地方通过简单的=是拿不到这个data的，因为返回值是一个Promise对象
             所以需要用.then(data=>{})函数才可以拿到这个data
         (3):如果没有返回值，相当于反悔了Promise.resolve(undefined)
      4、无等待：联想到Promise的特点，在没有await的情况下执行async函数，它会立即执行，返回一个Promise对象
         并且绝对不会阻塞后面的语句，这和普通返回Promise对象的函数并无二致；
      5、await不处理异步error:await是不管异步过程的reject(error)消息的，async函数返回的这个Promise对象的catch
         函数负责统一抓取内部所有异步过程的错误；async函数内部只要有一个异步过程发生错误，整个执行过程就中断；
         这个返回的Promise对象的catch就能住区到这个错误；
      6、async函数的执行：async函数执行和普通函数一样，函数名带个()就可以了，参数个数随意，没有限制
         也需要有async关键字，只是返回值是一个Promise对象，可以用then函数得到返回值，用catch抓取整个流程中发生的错误；

*/
</script>
<style></style>
