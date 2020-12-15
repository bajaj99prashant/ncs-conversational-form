<template>
  <aside>
    <div class="aside-content">
      <h1 class="aside-heading">{{ heading }}</h1>
      <a class="svgg" @click="changeState">
        <img src="../assets/info.svg" v-if="purpose === 'fillForm'" />
        <img src="../assets/discard.svg" v-if="purpose === 'discard'" />
        <img src="../assets/logout.svg" v-if="purpose === 'logout'" />
      </a>
      <p
        class="asideParagraph aso"
        :class="{asideShow : showPara}"
        v-html="description"
        v-if="description"
      ></p>
    </div>
    <div class="aside-bottom">
      <button class="logout-discard" v-if="showLog" @click="changeRoute">{{ showLog }}</button>
      <h5>
        <a href="http://hackncs.com" target="_blank">Made by Nibble Computer Society</a>
      </h5>
    </div>
  </aside>
</template>

<script>
export default {
  name: "Aside",
  props: ["heading", "showLog", "link", "purpose", "description"],
  data() {
    return {
      showPara: false
    };
  },
  methods: {
    changeState() {
      if (this.purpose === "fillForm") {
        this.showPara = !this.showPara;
      } else if (this.purpose === "logout") {
        this.$router.replace({ name: "Home" });
      } else if (this.purpose === "discard") {
        this.$router.replace({ name: "MyForms" });
      }
    },
    changeRoute() {
      if (this.purpose === "discard") {
        this.$router.replace({ name: "MyForms" });
      } else if (this.purpose === "logout") {
        this.$router.replace({ name: "Home" });
      }
    }
  }
};
</script>

<style scoped>
</style>