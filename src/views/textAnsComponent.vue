<template>
<div class="form-group">
    <label for="title">Question {{index+1}}</label>
    <input type="text" class="form-control" placeholder="Enter Question" v-model="question">
  </div>
</template>
<script>
// import {APIService} from './APIService.js'
// const apiService=new APIService();
export default{
	name : 'textAns',
	props:['index','type','quesType'],
	components:{

	},
	data(){
		return {
			question:''
		}
	},
	watch: {
    // whenever question changes, this function will run
    question: function (newQuestion, oldQuestion) {
    	this.$emit('question',this.question,this.quesType,this.index);
    }
  }
}
</script>