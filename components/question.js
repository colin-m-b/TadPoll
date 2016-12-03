import React, { Component } from 'react';
import { Link } from 'react-router'
import Answer from './createAnswers'
import $ from 'jquery'

export default class Question extends Component {
  constructor(props) {
    super (props)
    this.editPollTitle = this.editPollTitle.bind(this)
    this.addQuestion = this.addQuestion.bind(this)
  }

  editPollTitle() {
    this.props.setAppState({
      showCreatePollInput: true,
    })
  }

  addQuestion(e) {
    let questions = this.props.getAppState.questions
    let answers = []
    $(".answer").each(function(i) {
      let answerObj = {}
      if ($(this).val()) {
        answerObj.answer = ($(this).val())
        answerObj.votes = 0
        answers.push(answerObj)
      }
      
    })
    questions.push({
      question: $("#question").val(),
      answers: answers
    })
    this.props.setAppState({
      questions: questions,
      quesNum: questions.length + 1
    })
    alert('Question added!')
    if (questions.length === 10) $("#addQuestion").prop("disabled", true)
  }

  render() {
    let questionNum = this.props.getAppState.quesNum - 1
    let value = ''
    let answers = []
    if (this.props.getAppState.questions[questionNum] ){
      value = this.props.getAppState.questions[questionNum].question
      this.props.getAppState.questions[questionNum].answers.forEach(x => {
        answers.push(x.answer)
      })
    }else{
      for (let i = 1; i < 5; i++) {
        answers.push(<label key={i}>Answer {i}<Answer key={i} data-id={i}/></label>)
      }
    }
    let inputForm = (
      <form>
          <input 
          defaultValue={value}
          id="question" 
          size="100"
          placeholder="question" 
          maxLength="200" />
          <title>Enter up to four answer choices (50 characters max)</title>
          {answers}
          <button type="reset" id="addQuestion" onClick={this.addQuestion}>Save question to poll</button>
      </form>)

    return (
      <div>
        <h3>Enter up to 10 questions for poll "{this.props.getAppState.pollTitle}"</h3>
        <button onClick={this.editPollTitle}>Change poll title</button>
        <hr/>
        <title>Enter question below (200 character max)</title>
        <p>Enter question {this.props.getAppState.quesNum}</p>
        {inputForm}
        
        <form>
        <label>Open poll for responses
          <input type="checkbox" className="check" /></label>
        <button type="reset" value="Reset" onClick={this.props.savePoll}>Save poll</button>
        </form>
      </div>
    );
  }
}
