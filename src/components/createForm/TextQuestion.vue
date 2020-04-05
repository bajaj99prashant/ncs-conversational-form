<template>
  <div class="text-compo">
    <div class="text-question layout">
      <label for="text-answer">Question-{{ countNo + 1 }}</label>
      <input type="text" name="text-answer" placeholder="Enter Question" v-model="questionAns" />
    </div>
    <img src="@/assets/bin.svg" alt="delete-icon" class="delete-icon" @click="delText" />
  </div>
</template>

<script>
export default {
  name: "TextQuestion",
  props: ["countNo", "description"],
  data() {
    return {
      questionAns: this.description
    };
  },
  methods: {
    delText() {
      this.$emit("delText", this.questionAns);
    }
  },
  watch: {
    questionAns(newQuestion, oldQuestion) {
      this.$emit("questionAns", this.countNo, this.questionAns);
    }
  }
};
</script>