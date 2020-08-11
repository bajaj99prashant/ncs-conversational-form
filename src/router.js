import Vue from "vue";
import Router from "vue-router";
import FillForm from "./views/FillForm.vue";
import Home from "./views/Home.vue";
import CreateForm from "./views/CreateForm.vue";
import MyForms from "./views/MyForms.vue";
import callback from "./views/Callback.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/form/:id",
      name: "FillForm",
      component: FillForm
    },
    {
      path: "/createform",
      name: "CreateForm",
      component: CreateForm
    },
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/myforms",
      name: "MyForms",
      component: MyForms
    },
    {
      path: "/callback",
      name: 'callback',
      component: callback
    }
  ]
});
