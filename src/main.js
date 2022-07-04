import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "material-design-icons-iconfont/dist/material-design-icons.css";

Vue.config.productionTip = false
import VueObserveVisibility from "vue-observe-visibility";
import vuetify from './plugins/vuetify'
Vue.use(VueObserveVisibility);
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
