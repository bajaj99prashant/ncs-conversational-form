<template>
  <div>
    <header>
      <a class="logo">fixed nav</a>
      <nav>
        
      </nav>
    </header>
    <div>
      <button @click="googleLogin">google sign-in</button>
      <button @click="infoconnectLogin">infoconnect login</button>
      <button @click="createForm">create form</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {API} from "../components/apiService";

const api = new API();

export default {
  name: "Home",
  data() {
    return {
      previousUrl: null,
      windowObjectReference: null
    };
  },
  methods: {
    createForm() {
      if (localStorage.getItem("x-auth")) {
        this.$router.replace({ name: "CreateForm" });
      }
    },
    infoconnectLogin() {
      let url =
        "http://oauth.shobhitagarwal.me/login?q=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9qZWN0SUQiOiJCYWRSb2dnZXIxLmluZm9jb25uZWN0LmluIiwicHJvamVjdFNlY3JldCI6IjcwMWE5ZDI3Yzg5ZDdhOTVjNWIzYWRmN2IwOTZiN2E3N2VhYWVhMzBmNzM2YmZhMTVkMTJiODIzZmRiMjc2NjIiLCJpYXQiOjE1ODY4ODgwNjd9.tkSiLNYn40U3JvPdAzd1vT5Kz8U33ySzTszwKSDzx6I";
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
        event => this.recievInfo(event),
        false
      );
      this.previousUrl = url;
    },
    recievInfo(event) {
      if (event.origin === window.location.origin) {
        const { data } = event;
        const code = this.getUrlParameter(data, "code");

        if (code && code.length > 0){
          api.loginInfoconnect({code}).then(res => {
            localStorage.setItem("name", res.data.name);
            localStorage.setItem("x-auth", res.headers["x-auth"]);
          });

          window.removeEventListener('message', this.receiveMessage);
        }
      }
    },
    googleLogin() {
      let url =
        "https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&prompt=consent&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fplus.me%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email%20%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&response_type=code&client_id=328013180232-4tbbirno1l79l8ii917i0f9u4n93gdvu.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Fbadrogger.shobhitagarwal.me%2Fcallback";
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
        event => this.recieveGoogle(event),
        false
      );
      this.previousUrl = url;
    },
    recieveGoogle(event) {
      if (event.origin === window.location.origin) {
        const { data } = event;
        const code = this.getUrlParameter(data, "code");
        if (code && code.length>0){
          api.loginGoogle({code}).then(res => {
            localStorage.setItem("name", res.data.name);
            localStorage.setItem("x-auth", res.headers["x-auth"]);
          });

          window.removeEventListener('message', this.receiveMessage);
        }
      }
    },
    getUrlParameter(url,name) {
			    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
			    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
			    var results = regex.exec(url);
			    return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
		}
  }
};
</script>