<template>
    <div>
        <div class="text-compo">
            <div class="text-question layout">
                <label for="text-answer">Question-{{ index + 1 }}</label>
                <input type="text" name="text-answer" placeholder="Enter Question" v-model="question">
            </div>
            <img src="@/assets/bin.svg" alt="delete-icon" class="delete-icon" @click="deleteCompo()">
        </div>
        <div v-for="(op, ind) in options" :key="ind">
            <Opt :option="op" :count="ind" @ch="addOpt" @deleteOption="delOp" />
        </div>
        <button class="option-button" @click="addOption">Add Option</button>
    </div>
</template>

<script>
import Vue from 'vue'
import Opt from './Option'
export default {
    name: 'MultipleChoice',
    props: ['index', 'description', 'option'],
    components: {
        Opt
    },
    data () {
        return {
            question: this.description,
            options: this.option,
        }
    },
    methods: {
        addOption () {
            var option = '';
            this.options.push(option)
        },
        addOpt(option, ct){
            this.options[ct] = option
        },
        deleteCompo(){
            this.$emit('que', this.question)

        },
        delOp (opt) {
            this.options = this.options.filter (op => {
                return op !== opt
            })
            this.$emit('dop', this.options, this.index)
        }
    },
    watch: {
    	question: function (newQuestion, oldQuestion) {
    		this.$emit('question', this.question, this.options, this.index)
    	},
    	options: function(newOptions,oldOptions){
    		this.$emit('question',this.question, this.options,this.index)	
    	}

      }
}
</script>
