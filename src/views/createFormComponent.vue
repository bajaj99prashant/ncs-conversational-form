<template>
<div>
	
	<button class="btn btn-default" @click="logout" :style="{'float':'right'}">Logout</button>
	<button class="btn btn-default" @click="myforms" :style="{'float':'right'}">My Forms</button>
	<section id="loginform" class="outer-wrapper">

  <div class="inner-wrapper">
<div class="container">
  <div class="row">
    <div class="col-sm-4 col-sm-offset-4">
      <h2 class="text-center">Create Form</h2>
      <form role="form" @submit.prevent>
  <div class="form-group">
    <label for="title">Title</label>
    <input type="text" class="form-control" id="title" placeholder="Enter title" v-model='title'>
  </div>
  <div class="form-group">
    <label for="description">Description</label>
   <textarea class="form-control" rows="3" id="description" v-model='description'></textarea>
  </div>
  <ol ref="container">
  	
  </ol>
  <div class="form-inline">
  	<select v-model="quesType">
  		<option>Text Ans</option>
  		<option>Multiple-Choice</option>
  		<option>Admission No.</option>
  		<option>Phone</option>
  		<option>Email</option>
  	</select>
  	<button style="margin-left: 16px" @click="addQuestion">Add Question</button>
  </div>
  <button type="submit" class="btn btn-default" @click="createForm">Create</button>
</form>
    </div>
  </div>
</div>
</div>

</section>
</div>
</template>
<script>
import Vue from 'vue'
import {APIService} from './APIService.js'
import textAns from './textAnsComponent'
import mulAns from './multipleChoiceAnsComponent'
const apiService=new APIService();

export default{
	name : 'createForm',
	components:{

	},
	data(){
		return {
			title:'',
			description:'',
			quesType:'Text Ans',
			questions:[],
			count:-1
		};
	},
	methods:{
		createForm(){
			var obj={
				name:this.title,
				description:this.description,
				questions:this.questions
			};
			apiService.createForm(obj).then((data)=>{
				alert(window.location.origin+"/form/"+data.data.shortUrl);
			});
		},
		addQuestion(){
		this.count++;
		if(this.quesType==='Multiple-Choice'){
			this.addMultipleChoiceQuestion();
		}else if(this.quesType==='Phone'){
			this.addSingleQuestion('phone','phone');

		}else if(this.quesType==='Email'){
			this.addSingleQuestion('email','email');
		}else if(this.quesType==='Admission No,'){
			this.addSingleQuestion('text','admission-no');
		}else{
			this.addSingleQuestion('text','text');
		}  
		},
		addSingle(question,quesType,index){
			var obj={"type":quesType,
	 			"description":question,
				"required" : true
				};
			this.questions[index]=obj;
		},
		addMultiple(question,options,index){
			var obj={"type":"multiple-choice",
	 			"description":question,
				"required" : true,
				"options" : options
				};
			this.questions[index]=obj;
		},
		addMultipleChoiceQuestion(){
		  var ComponentClass = Vue.extend(mulAns)
          var instance = new ComponentClass({
            propsData: { index: this.count }
          })
          instance.$on('question',this.addMultiple);
          instance.$mount()
          this.$refs.container.appendChild(instance.$el)	
		},
		addSingleQuestion(type,quesType){
			var ComponentClass = Vue.extend(textAns)
          var instance = new ComponentClass({
            propsData: { index: this.count, type:type , quesType:quesType }
          })
          instance.$on('question',this.addSingle);
          instance.$mount()
          this.$refs.container.appendChild(instance.$el)
		},
		logout(){
			localStorage.removeItem('x-auth');
			window.location.href="/login";
		},
		myforms(){
			window.location.href="/myforms"	
		}

	},
	mounted(){
		if(!localStorage.getItem('x-auth')){
			window.location.href="/login";
		}
	}
}
	
</script>

<style type="text/css">
.centered-form{
	align-items: center;
	background: blue;
}
.outer-wrapper { 
display: table;
width: 100%;
height: 100%;
}

.inner-wrapper {
  display:table-cell;
  vertical-align:middle;
  padding:15px;
}
</style>