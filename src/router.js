import Vue from "vue";
import Router from "vue-router";
import FillForm from "./views/FillForm.vue";
import Login from "./views/Login.vue";
import Home from "./views/Home.vue";
import CreateForm from "./views/CreateForm.vue";

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
      path: "/login",
      name: "Login",
      component: Login
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
    }
  ]
});
