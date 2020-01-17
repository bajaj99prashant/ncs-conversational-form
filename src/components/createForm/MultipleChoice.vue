<template>
    <div v-if="show">
        <div class="text-compo">
            <div class="text-question layout">
                <label for="text-answer">Question- {{ index + 1 }} - Multiple Choice Question</label>
                <input type="text" name="text-answer" placeholder="Enter Question" v-model="question">
            </div>
            <img src="@/assets/bin.svg" alt="delete-icon" class="delete-icon" @click="deleteCompo()">
        </div>
        <div ref="container">
        </div>
        <button class="option-button" @click="addOption">Add Option</button>
    </div>
</template>

<script>
import Vue from 'vue'
import opt from './Option'
export default {
    name: 'MultipleChoice',
    props: ['index'],
    components: {
        opt
    },
    data () {
        return {
            question: '',
            options: [],
            count: 0,
            show: true
        }
    },
    methods: {
        addOption () {
            this.count
            var ComponentClass = Vue.extend(opt)
            var instance = new ComponentClass({
                propsData: { count: this.count }
            })
            instance.$on('choice', this.add)
            instance.$mount()
            this.$refs.container.appendChild(instance.$el)
        },
        add(option,count){
            this.options[count]=option
        },
        deleteCompo(){
            this.$emit('que', this.question)
            this.show = false

        }
    },
    watch: {
    	question: function (newQuestion, oldQuestion) {
    		this.$emit('question',this.question,this.options,this.index)
    	},
    	options: function(newOptions,oldOptions){
    		this.$emit('question',this.question,this.options,this.index)	
    	}

      },
      mounted(){
  			this.count++;
            var ComponentClass = Vue.extend(opt)
            var instance = new ComponentClass({
                propsData: { count: this.count }
            })
            instance.$on('choice',this.add);
            instance.$mount()
            this.$refs.container.appendChild(instance.$el)
  	}
}
</script>

<style>

</style>
