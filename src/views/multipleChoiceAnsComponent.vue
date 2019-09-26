<template>
<div class="form-group">
    <label for="title">Question {{index+1}}</label>
    <input type="text" class="form-control" placeholder="Enter Question" v-model="question">
    <ol ref="container">

    </ol>
    <button @click="addOption">Add Option</button>
  </div>
</template>
<script>
import Vue from 'vue'
import option from './optionComponent'
export default{
	name : 'mulAns',
	props:['index'],
	components:{

	},
	data(){
		return {
			question:'',
			options:[],
			count:0
		}
	},
	methods:{
		addOption(){
		  this.count++;
		  var ComponentClass = Vue.extend(option)
          var instance = new ComponentClass({
            propsData: { count: this.count }
          })
          instance.$on('option',this.add);
          instance.$mount()
          this.$refs.container.appendChild(instance.$el)
		},
		add(option,count){
			this.options[count-1]=option;
		}
	},     
	watch: {
    // whenever question changes, this function will run
    	question: function (newQuestion, oldQuestion) {
    		this.$emit('question',this.question,this.options,this.index);
    	},
    	options: function(newOptions,oldOptions){
    		this.$emit('question',this.question,this.options,this.index);	
    	}

  	},
  	mounted(){
  			this.count++;
		  var ComponentClass = Vue.extend(option)
          var instance = new ComponentClass({
            propsData: { count: this.count }
          })
          instance.$on('option',this.add);
          instance.$mount()
          this.$refs.container.appendChild(instance.$el)
  	}
}
</script>