<template>
    <div class="text-compo" v-if="textSlide">
        <div class="text-question layout">
            <label for="text-answer" :id="ide">Question-{{ countNo }}</label>
            <input type="text" name="text-answer" placeholder="Enter Question" v-model="questionAns">
        </div>
        <img src="@/assets/bin.svg" alt="delete-icon" class="delete-icon" @click="delText">
    </div>
</template>

<script>
export default {
    name: 'TextQuestion',
    props: ['countNo', 'quesType', 'ide'],
    data() {
        return {
            questionAns: '',
            textSlide: true
        }
    },
    methods : {
        delText () {
            this.$emit('delText', this.questionAns, this.countNo, this.ide)
            this.textSlide = false
        }
    },
    watch: {
        questionAns (newQuestion, oldQuestion){
            this.$emit('questionAns', this.countNo, this.questionAns, this.quesType)
        }
    }
}
</script>