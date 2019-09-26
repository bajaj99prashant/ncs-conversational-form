<template>
    <div class="text-compo">
        <div class="text-question layout">
            <label for="text-answer">Question-{{ countNo }}</label>
            <input type="text" name="text-answer" placeholder="Enter Question" v-model="questionAns">
        </div>
        <img src="@/assets/bin.svg" alt="delete-icon" class="delete-icon">
    </div>
</template>

<script>
export default {
    name: 'TextQuestion',
    props: ['countNo', 'quesType'],
    data() {
        return {
            questionAns: ''
        }
    },
    watch: {
        questionAns (newQuestion, oldQuestion){
            this.$emit('questionAns', this.countNo, this.questionAns, this.quesType)
        }
    }
}
</script>

<style>

</style>
