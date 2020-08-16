<template>
  <div class="main-container">
    <Aside
      heading="Bad Roger"
      showLog="Logout"
      link="../assets/info.svg/"
      purpose="logout"
      description="Conversational Form"
    />
    <main class="myform-main">
      <div class="myform-list">
        <div class="myform" v-for="(form, i) in forms" :key="i">
          <div class="myform-left">
            <h4>{{ form.name }} - {{ form.responses }} responses</h4>
            <a :href="form.displayUrl" target="_blank">{{ form.displayUrl }}</a>
          </div>
          <span>
            <img src="../assets/download.svg" />
          </span>
        </div>
      </div>
      <div class="gocreate-button">
        <button @click="createform">
          <img src="../assets/add.svg" />
          <span>New Form</span>
        </button>
      </div>
    </main>
  </div>
</template>

<script>
import Aside from "../components/Aside";
import { API } from "../components/apiService";

const api = new API();

export default {
  name: "MyForms",
  components: {
    Aside,
  },
  data() {
    return {
      forms: [],
    };
  },
  methods: {
    createform() {
      this.$router.replace({ name: "CreateForm" });
    },
  },
  mounted() {
    api.getMyForms().then((data) => {
      this.forms = data.data;
      this.forms.forEach((form) => {
        form.displayUrl = window.location.origin + "/form" + form.shortUrl;
      });
    });
  },
};
</script>