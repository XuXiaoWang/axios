import Vue from 'vue'
import App from './App.vue'
import router from './router'
// import Vant from 'vant'
// import 'vant/lib/index.css'
import Http from './service/http'
Vue.config.productionTip = false
// 把HTTP挂载到Vue的实例上
Vue.prototype.$Http = Http;
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
