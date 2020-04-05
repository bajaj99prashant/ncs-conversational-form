import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueChatScroll from 'vue-chat-scroll'
import VueLocalStorage from 'vue-localstorage'

Vue.use(VueChatScroll)
Vue.use(VueLocalStorage)
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
