<template>
  <p>please wait !!</p>
</template>

<script>
export default {
  name: "callback",
  components: {},
  data() {
    return {};
  },
  mounted() {
    const params = window.location.search;
    if (window.opener) {
      window.opener.postMessage(params);
    }
    window.close();
  }
};
</script>