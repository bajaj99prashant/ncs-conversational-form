<template>
    <div class="main-container">
        <aside>
            <div class="aside-content">
                <h1 class="aside-heading">Chatbot - Form Builder</h1>
                <p class="aside-paragraph" v-if='para'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci ipsum explicabo, tenetur voluptates voluptate distinctio quasi reprehenderit consequatur repudiandae corrupti accusamus aliquid natus incidunt aliquam id porro, sit neque itaque?</p>
            </div>
            <h5>Made by Nibble Computer Society</h5>
        </aside>
        <main>
            <div class="message">
                <div class="question-list">
                    <div class="questionSection">
                        <h3>Event Details</h3>
                        <div class="title-description">
                            <div class="event-title layout">
                                <label for="title">Title</label>
                                <input type="text" name="text" v-model="title">
                            </div>
                            <div class="event-color-theme layout">
                                <label for="color">Color code (eg.#12D48E)</label>
                                <input type="text" name="color">
                            </div>
                        </div>
                        <div class="question-welcome">
                            <label for="description">Description</label>
                            <textarea name="description" cols="30" rows="3" v-model="description"></textarea>
                        </div>
                    </div>
                    <div class="questionSection" ref="contain" v-chat-scroll>
                        <h3>Questions</h3>
                        <div class="question-welcome">
                            <label for="welcome">Welcome Message</label>
                            <textarea name="welcome" cols="30" rows="3"></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div class="questionInput">
                <div class="box">
                    <select v-model="qType">
                        <option>Text Answer</option>
                        <option>Multiple-Choice</option>
                        <option>Admission No.</option>
                        <option>Phone</option>
                        <option>Email</option>
                    </select>
                </div>
                <button class="question-button" @click="addQuestion">Add question</button>
            </div>
            <div class="createButtonDiv">
                <button class="createFormButton" @click="createForm">Create Form</button>
            </div>
        </main>
    </div>
</template>

<script>
import Vue from 'vue'
import TextQuestion from '../components/createForm/TextQuestion'
import MultipleChoice from '../components/createForm/MultipleChoice'

export default {
    name: 'CreateForm',
    components: {
        TextQuestion,
        MultipleChoice
    },
    data() {
        return{
            para: false,
            qType: 'Text Answer',
            title: '',
            description: '',
            counter: 0,
            questions: []
        }
    },
    methods: {
        addQuestion(){
            this.counter++
            if(this.qType == 'Multiple-Choice'){
                this.addMultipleChoiceQuestion();
            }else if(this.qType == 'Phone'){
                this.addSingleQuestion('phone');

            }else if(this.qType == 'Email'){
                this.addSingleQuestion('email');
            }else if(this.qType == 'Admission No,'){
                this.addSingleQuestion('admission-no');
            }else{
                this.addSingleQuestion('text');
            }  
        },
        addSingleQuestion(questionType){
            var ComponentClass = Vue.extend(TextQuestion)
            var instance = new ComponentClass({
                propsData: { countNo: this.counter, quesType:questionType, ide: `que${this.counter - 1}` }
            })
            instance.$on('questionAns',this.addSingle)
            instance.$on('delText', this.delSingle)
            instance.$mount()
            this.$refs.contain.appendChild(instance.$el)
        },
        addSingle(index, question ,quesType){
			var obj={"type":quesType,
	 			"description":question,
				"required" : true
				};
			this.questions[ index - 1 ]=obj;
        },
        addMultipleChoiceQuestion(){
            var ComponentClass = Vue.extend(MultipleChoice)
            var instance = new ComponentClass({
                propsData: { index: this.counter, ide: `que${this.counter - 1}` }
            })
            instance.$on('question',this.addMultiple);
            instance.$on('que', this.delMultiple);
            instance.$mount()
            this.$refs.contain.appendChild(instance.$el)	
        },
        addMultiple(question,options,index){
            if(question){
                var obj={"type":"multiple-choice",
                    "description":question,
                    "required" : true,
                    "options" : options
				};
			    this.questions[index - 1]=obj
            }
			
        },
        delMultiple(question){
            this.questions = this.questions.filter(qe => {
                return qe.description !== question
            })
            console.log(this.questions)
        },
        createForm() {
            console.log(this.questions)
        },
        delSingle(question, cot, id) {
             this.questions = this.questions.filter(qe => {
                return qe.description !== question
            })
            for (var i = cot; i <= this.questions.length; i++){
                window.getElementById(`que${i}`).innerHTML = `Question-${cot - 1}`
            }
        }
    }
}
</script>