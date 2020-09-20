<template>
  <div>
    <header>
      <div class="small-scr">
        <a class="logo" href="https://hackncs.com/">
          <img src="../assets/ncs-logo.svg" />
        </a>
        <img src="../assets/menu.svg" class="btn-menu" @click="toggleNav" />
      </div>
      <div class="navlinks" :class="{navShow: navState}">
        <ul>
          <li>
            <a href="https://hackncs.com/">Home</a>
          </li>
          <li>
            <a href="https://hackncs.com/project/">Projects</a>
          </li>
          <li>
            <a href="https://hackncs.com/team/">Team</a>
          </li>
          <li class="ho">
            <a class="btn-get" href="https://www.facebook.com/nibblecomputersociety">Get in Touch</a>
          </li>
        </ul>
      </div>
    </header>

    <div class="main-home">
      <div class="left-flex">
        <div class="head-flex">
          <img src="../assets/robot.png" />
          <div>
            <h1>Bad Roger</h1>
            <h3>Conversational Form</h3>
          </div>
        </div>
        <div class="main-para">
          <p>Google Forms weren’t cool enough, so we built our own! Bad Roger is a conversational chatbot, which makes filling forms easy & fun. Also, you can use the in-built form builder to create personalised forms.</p>
        </div>
        <div class="main-btn">
          <!-- <button @click="infoconnectLogin" class="btn-social btn-infoconnect">
            <span>Sign in with InfoConnect</span>
            <img src="../assets/info.svg" />
          </button> -->
          <button @click="googleLogin" class="btn-social btn-google">
            <span>Sign in with Google</span>
            <img src="../assets/google-logo.svg" />
          </button>
          <!-- <button @click="createForm">create form</button> -->
        </div>
        <!-- <button class="btn-login-small">
          <span>Login to Bad Roger</span>
          <img src="../assets/arrow-right-circle.svg" />
        </button> -->
      </div>
      <div class="right-flex"></div>
    </div>
    <div></div>
  </div>
</template>

<script>
import axios from "axios";
import { API } from "../components/apiService";

const api = new API();

export default {
  name: "Home",
  data() {
    return {
      previousUrl: null,
      windowObjectReference: null,
      navState: false,
    };
  },
  methods: {
    toggleNav() {
      this.navState = !this.navState;
    },
    createForm() {
      // if (localStorage.getItem("x-auth")) {
      //   this.$router.replace({ name: "CreateForm" });
      // }
      this.$router.replace({ name: "CreateForm" });
    },
    infoconnectLogin() {
      let url =
        "http://oauthv2.shoa-apps.live";
      let name = "infoconnect-login";
      window.removeEventListener("message", this.recievInfo);

      const strWindowFeatures =
        "toolbar = no, menubar = no, width = 600, height = 700, top = 100, left = 100";

      if (
        this.windowObjectReference === null ||
        this.windowObjectReference.closed
      ) {
        this.windowObjectReference = window.open(url, name, strWindowFeatures);
      } else if (this.previousUrl !== url) {
        this.windowObjectReference = window.open(url, name, strWindowFeatures);
        this.windowObjectReference.focus;
      } else {
        this.windowObjectReference.focus;
      }

      window.addEventListener(
        "message",
        (event) => this.recievInfo(event),
        false
      );
      this.previousUrl = url;
    },
    recievInfo(event) {
      if (event.origin === window.location.origin) {
        const { data } = event;
        const code = this.getUrlParameter(data, "code");

        if (code && code.length > 0) {
          api.loginInfoconnect({ code }).then((res) => {
            localStorage.setItem("name", res.data.name);
            localStorage.setItem("x-auth", res.headers["x-auth"]);
            this.$router.replace({ name: "MyForms" });
          });

          window.removeEventListener("message", this.receiveMessage);
        }
      }
    },
    googleLogin() {
      let url =
        "https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&prompt=consent&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fplus.me%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&response_type=code&client_id=328013180232-4tbbirno1l79l8ii917i0f9u4n93gdvu.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Fregister.hackncs.com%2Fcallback";
      let name = "google-login";
      window.removeEventListener("message", this.recieveGoogle);

      const strWindowFeatures =
        "toolbar = no, menubar = no, width = 600, height = 700, top = 100, left = 100";

      if (
        this.windowObjectReference === null ||
        this.windowObjectReference.closed
      ) {
        this.windowObjectReference = window.open(url, name, strWindowFeatures);
      } else if (this.previousUrl !== url) {
        this.windowObjectReference = window.open(url, name, strWindowFeatures);
        this.windowObjectReference.focus;
      } else {
        this.windowObjectReference.focus;
      }

      window.addEventListener(
        "message",
        (event) => this.recieveGoogle(event),
        false
      );
      this.previousUrl = url;
    },
    recieveGoogle(event) {
      if (event.origin === window.location.origin) {
        const { data } = event;
        const code = this.getUrlParameter(data, "code");
        if (code && code.length > 0) {
          api.loginGoogle({ code }).then((res) => {
            localStorage.setItem("name", res.data.name);
            localStorage.setItem("x-auth", res.headers["x-auth"]);
            this.$router.replace({ name: "MyForms" });
          });

          window.removeEventListener("message", this.receiveMessage);
        }
      }
    },
    getUrlParameter(url, name) {
      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
      var results = regex.exec(url);
      return results === null
        ? null
        : decodeURIComponent(results[1].replace(/\+/g, " "));
    },
  },
};
</script>