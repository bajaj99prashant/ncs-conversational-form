<template>
  <div class="main-container">
    <Aside
      :heading="name"
      :showLog="false"
      link="../assets/info.svg"
      purpose="fillForm"
      :description="description"
    />
    <main>
      <div class="message">
        <div class="message-list" ref="container" v-chat-scroll></div>
      </div>
      <div class="input">
        <form @submit.prevent="sendResponse">
          <input
            :type="type"
            class="main-field"
            v-model="ans"
            :placeholder="place"
            :autofocus="foc"
            :disabled="disable"
          />
          <a class="Active" @click="sendResponse" v-if="!disable">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.1056 12.4472L2.00046 22.9998C1.22733 23.3863 0.361048 22.6762 0.588484 21.8422L2.9119 13.323C2.96521 13.1276 3.13121 12.9836 3.33226 12.9585L11 12L3.33226 11.0415C3.13121 11.0164 2.96521 10.8724 2.9119 10.677L0.588484 2.15778C0.361048 1.32384 1.22733 0.613663 2.00046 1.00023L23.1056 11.5528C23.4741 11.737 23.4741 12.263 23.1056 12.4472Z"
                :fill="color"
              />
            </svg>
          </a>
        </form>
      </div>
    </main>
  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import Question from "../components/fillForm/Question";
import Answer from "../components/fillForm/Answer";
import Single from "../components/fillForm/SingleOptionAnswer";
import Aside from "../components/Aside";

export default {
  name: "FillForm",
  components: {
    Question,
    Answer,
    Single,
    Aside
  },
  data() {
    return {
      data: null,
      ans: null,
      type: null,
      disable: true,
      place: "",
      index: 0,
      foc: false,
      answers: {},
      name: "",
      description: "",
      color: "#9e9e9e"
    };
  },
  methods: {
    sendOption(option) {
      this.ans = option;
      this.sendResponse();
    },
    mountAnswer() {
      this.foc = false;
      this.addAnswer(this.ans);
      this.place = "";
      this.disable = true;
      this.answers[this.data.questions[this.index].description] = this.ans;
      this.index++;
      this.ans = null;
      this.addComponent();
    },
    addAnswer(data) {
      var ComponentClass = Vue.extend(Answer);
      var instance = new ComponentClass({
        propsData: { Answer: data }
      });
      instance.$mount();
      this.$refs.container.appendChild(instance.$el);
    },
    sendResponse() {
      let type = this.data.questions[this.index].type;
      if (type == "text") {
        if (!this.ans) {
          this.errorHandler("Please enter a valid answer");
        } else {
          this.mountAnswer();
        }
      } else if (type == "multiple-choice") {
        if (!this.ans) {
          this.errorHandler("You must select an option.");
        } else {
          this.mountAnswer();
        }
      } else if (type == "phone") {
        var pheno = /^\d{10}$/;
        if (!this.ans.match(pheno) || !this.ans) {
          this.errorHandler("You must enter a valid phone number.");
        } else {
          this.mountAnswer();
        }
      } else if (type == "email") {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.ans)) {
          this.mountAnswer();
        } else {
          this.errorHandler("You must enter a valid email address");
        }
      } else if (this.type == "admission-no") {
        if (/(\d{2})(\w{2,5})(\d{3})/.test(this.ans)) {
          if (this.verifyRegex()) {
            this.mountAnswer();
          } else {
            this.errorHandler("You must enter a valid admission number");
          }
        } else {
          this.errorHandler("You must enter a valid admission no.");
        }
      }
    },
    verifyRegex() {
      var branch = [
        "cs",
        "it",
        "ec",
        "me",
        "eee",
        "ic",
        "ee",
        "ce",
        "cse",
        "ece",
        "dlcs",
        "dlit",
        "dlec",
        "dlme",
        "dleee",
        "dlic",
        "dlee",
        "dlce",
        "dlcse"
      ];
      var string = this.ans;
      var year = [17, 18, 19, 16];
      var ar = string.split(/(\d{2})(\w{2,5})(\d{3})/);
      return (
        branch.find(item => ar[2].toLowerCase() == item) &&
        year.find(yr => ar[1] == yr)
      );
    },
    initialHandler(option) {
      if (option == "Alright!") {
        this.addAnswer("Alright!");
        this.addComponent();
      } else {
        this.initialFinalHandler();
      }
    },
    addComponent() {
      if (this.index < this.data.questions.length) {
        let type = this.data.questions[this.index].type;
        if (type == "text") {
          this.type = "text";
          this.disable = false;
          setTimeout(() => {
            this.place = "Type your answer here";
          }, 1000);
          this.addTextComponent();
        } else if (type == "multiple-choice") {
          this.addMultipleOptions();
          setTimeout(() => {
            this.place = "Select an option";
          }, 1000);
        } else if (type == "phone") {
          setTimeout(() => {
            this.place = "Enter contact number";
          }, 1000);
          this.disable = false;
          this.addTextComponent();
        } else if (type == "email") {
          setTimeout(() => {
            this.place = "Example: example@gmail.com";
          }, 1000);
          this.disable = false;
          this.addTextComponent();
        } else if (type == "admission-no") {
          this.type = "admission-no";
          this.disable = false;
          setTimeout(() => {
            this.place = "Example: 19cse180";
          }, 1000);
          this.addTextComponent();
        }
      } else {
        this.addFinalComponent();
      }
    },
    addTextComponent() {
      var ComponentClass = Vue.extend(Question);
      var instance = new ComponentClass({
        propsData: { querydata: this.data.questions[this.index].description }
      });
      instance.$mount();
      this.$refs.container.appendChild(instance.$el);
      this.foc = true;
      setTimeout(() => {
        this.$refs.container.scrollTop = this.$refs.container.scrollHeight;
      }, 1000);
    },
    addMultipleOptions() {
      var ComponentClass = Vue.extend(Single);
      var instance = new ComponentClass({
        propsData: {
          dr: this.data.questions[this.index].description,
          options: this.data.questions[this.index].options,
          showing: "true"
        }
      });
      instance.$on("option", this.sendOption);
      instance.$mount();
      this.$refs.container.appendChild(instance.$el);
      setTimeout(() => {
        this.$refs.container.scrollTop = this.$refs.container.scrollHeight;
      }, 1000);
    },
    addFinalComponent() {
      var ComponentClass = Vue.extend(Single);
      var instance = new ComponentClass({
        propsData: {
          dr: "Do you want to confirm and submit your details?",
          options: ["Alright!", "Nope"],
          showing: "false"
        }
      });
      instance.$on("option", this.finalHandler);
      instance.$mount();
      this.$refs.container.appendChild(instance.$el);
      setTimeout(() => {
        this.$refs.container.scrollTop = this.$refs.container.scrollHeight;
      }, 1000);
    },
    initialFinalHandler() {
      this.addAnswer("Nope");
      this.place = "";
      this.finalComponent(
        "Thanks for visiting! For more info visit our <a href='http://hackncs.com'>website</a>"
      );
    },
    finalHandler(option) {
      if (option == "Alright!") {
        this.addAnswer("Alright!");
        console.log(this.answers);
        axios
          .post("http://cform.shoa-apps.live/api/form/submit", {
            _id: this.data._id,
            response: this.answers
          })
          .then(consequence => {
            this.finalComponent(
              "Thanks for registering! For more info visit our <a href='http://hackncs.com'>website</a>"
            );
            setTimeout(() => {
              this.$refs.container.scrollTop = this.$refs.container.scrollHeight;
            }, 1000);
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.addAnswer("Nope");
        this.place = "";
        this.finalComponent(
          "Thanks for visiting! For more info visit our <a href='http://hackncs.com'>website</a>"
        );
        setTimeout(() => {
          this.$refs.container.scrollTop = this.$refs.container.scrollHeight;
        }, 1000);
      }
    },
    finalComponent(compoData) {
      var ComponentClass = Vue.extend(Question);
      var instance = new ComponentClass({
        propsData: { querydata: compoData }
      });
      instance.$mount();
      this.$refs.container.appendChild(instance.$el);
    },
    errorHandler(message) {
      var ComponentClass = Vue.extend(Question);
      var instance = new ComponentClass({
        propsData: { querydata: message }
      });
      instance.$mount();
      this.$refs.container.appendChild(instance.$el);
    }
  },
  watch: {
    ans: function(newAnsewr, oldAnswer) {
      if (this.ans) {
        this.color = "#12d48e";
      } else if (!this.ans) {
        this.color = "#9e9e9e";
      }
    }
  },
  created() {
    // axios.get('http://cform.shobhitagarwal.me/api/form/o8K')
    // .then((response) => {
    //     this.data = response.data
    //     console.log(this.data._id)
    // })
  },
  mounted() {
    axios
      .get(`http://cform.shoa-apps.live/api/form/${this.$route.params.id}`)
      .then(response => {
        this.data = response.data;
        this.name = this.data.name;
        this.description = this.data.description;
        this.errorHandler(
          "Hello there!<br> <b>Roger</b> this side, I am here to guide you through the recruitment registration process and take you a step closer to becoming a Nibblite."
        );
        setTimeout(() => {
          var ComponentClass = Vue.extend(Single);
          var instance = new ComponentClass({
            propsData: {
              dr: "Follow my lead and we'll be there in no time✌🏻",
              options: ["Alright!", "Nope"],
              showing: "true"
            }
          });
          instance.$on("option", this.initialHandler);
          instance.$mount();
          this.$refs.container.appendChild(instance.$el);
        }, 1500);
        setTimeout(() => {
          this.place = "Select an option";
        }, 3500);
      })
      .catch(err => {
        this.name = "Invalid Form";
        this.description = "Please open correct form";
      });
  }
};
</script>