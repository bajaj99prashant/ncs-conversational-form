import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueChatScroll from 'vue-chat-scroll'
import VueLocalStorage from 'vue-localstorage'

Vue.use(VueChatScroll)
Vue.use(VueLocalStorage)
Vue.config.productionTip = false;

router.beforeEach((to, from, next)=>{
  if (to.name === 'FillForm' || to.name === 'Home' || to.name === 'callback'){
    next();
  }else if (!localStorage.getItem("x-auth")){
    next({name: 'Home'});
  }else {
    next();
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
