<template>
  <div class="main-container">
    <aside>
      <div class="aside-content">
        <h1 class="aside-heading">Chatbot - Form Builder</h1>
        <p
          class="aside-paragraph"
          v-if="para"
        >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci ipsum explicabo, tenetur voluptates voluptate distinctio quasi reprehenderit consequatur repudiandae corrupti accusamus aliquid natus incidunt aliquam id porro, sit neque itaque?</p>
      </div>
      <h5>Made by Nibble Computer Society</h5>
    </aside>
    <main>
      <div class="message">
        <div class="question-list" v-chat-scroll>
          <div class="questionSection">
            <h3>Event Details</h3>
            <div class="title-description">
              <div class="event-title layout">
                <label for="title">Title</label>
                <input type="text" name="text" v-model="title" />
              </div>
              <div class="event-color-theme layout">
                <label for="color">Color code (eg.#12D48E)</label>
                <input type="text" name="color" />
              </div>
            </div>
            <div class="question-welcome">
              <label for="description">Description</label>
              <textarea name="description" cols="30" rows="3" v-model="description"></textarea>
            </div>
          </div>
          <div class="questionSection">
            <h3>Questions</h3>
            <div class="question-welcome">
              <label for="welcome">Welcome Message</label>
              <textarea name="welcome" cols="30" rows="3"></textarea>
            </div>
          </div>
          <div class="questionSection" v-for="(ques, i) in questions" :key="i">
            <MultipleChoice
              v-if="ques.type === 'multiple-choice'"
              :index="i"
              :description="ques.description"
              :option="ques.options"
              @question="addMultiple"
              @que="delQuestion"
              @dop="delOp"
            />
            <TextQuestion
              v-else
              :countNo="i"
              :description="ques.description"
              @questionAns="addSingle"
              @delText="delQuestion"
            />
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
import Vue from "vue";
import TextQuestion from "../components/createForm/TextQuestion";
import MultipleChoice from "../components/createForm/MultipleChoice";

export default {
  name: "CreateForm",
  components: {
    TextQuestion,
    MultipleChoice
  },
  data() {
    return {
      para: false,
      qType: "Text Answer",
      title: "",
      description: "",
      questions: []
    };
  },
  methods: {
    addQuestion() {
      if (this.qType == "Multiple-Choice") {
        this.addMultipleChoiceQuestion();
      } else if (this.qType == "Phone") {
        this.addSingleQuestion("phone");
      } else if (this.qType == "Email") {
        this.addSingleQuestion("email");
      } else if (this.qType == "Admission No.") {
        this.addSingleQuestion("admission-no");
      } else {
        this.addSingleQuestion("text");
      }
    },
    addSingleQuestion(questionType) {
      var obj = { type: questionType, required: true, description: "" };
      this.questions.push(obj);
    },
    addSingle(index, question) {
      this.questions[index].description = question;
      this.$localStorage.set('questions', JSON.stringify(this.questions));
    },
    addMultipleChoiceQuestion() {
      var obj = {
        type: "multiple-choice",
        required: true,
        description: "",
        options: []
      };
      this.questions.push(obj);
    },
    addMultiple(question, options, index) {
        this.questions[index].description = question;
        this.questions[index].options = options;
        this.$localStorage.set('questions', JSON.stringify(this.questions));
    },
    delOp(options, index){
        this.questions[index].options = options;
        this.$localStorage.set('questions', JSON.stringify(this.questions));
        window.location.reload();
    },
    createForm() {
      console.log(this.questions);
    },
    delQuestion(question) {
      this.questions = this.questions.filter(qe => {
        return qe.description !== question;
      });
      this.$localStorage.set('questions', JSON.stringify(this.questions))
      window.location.reload();
    }
  },
  mounted () {
      const questions = JSON.parse(this.$localStorage.get('questions'))
      if (questions) {
        this.questions = questions
     }
  }
};
</script>