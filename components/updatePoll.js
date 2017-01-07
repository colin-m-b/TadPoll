import React, { Component } from 'react'
import { link, browserHistory } from 'react-router'
import Answer from './createAnswers'
import $ from 'jquery'

export default class UpdatePoll extends Component {

    constructor(props) {
        super(props)
        this.updatePoll = this.updatePoll.bind(this)
        this.buildAnswersArray = this.buildAnswersArray.bind(this)
        this.buildQuestionArray = this.buildQuestionArray.bind(this)
    }

    updatePoll(e) {
        e.preventDefault()
        let questionsArray = []
        $('.question-input').each(function() {
            let questionFromInput = $(this).val()
            if (questionFromInput) {
                let questionObj = {}
                questionObj.question = $(this).val()
                let className = '.' + $(this).attr("id")
                let answerArr = []
                $(className).each(function(){
                    answerArr.push({
                        answer: $(this).val(),
                        votes: 0
                    })
                    console.log()
                })
            }
        })
        let data = {
        }
    }

    buildAnswersArray(answers, index) {
        let answerArray = []
        for (let i = 0; i < 4; i++) {
            let answerValue = ''
            if (answers[i]) answerValue = answers[i].answer
            let className = "answer-input " + index
            answerArray.push(
                <span key={i} className="answer-span">
                    <label>Answer {i + 1}</label>
                    <input defaultValue={answerValue} key={i} className={className}/>
                </span>
                )
        }
        return answerArray
    }

    buildQuestionArray(questionObj) {
        console.log('questionObj: ' + questionObj)
        let questionArray = []
        let answers
        for (let i = 0; i < 10; i++) {
            let questionValue = ''
            if (questionObj[i]) {
                questionValue = questionObj[i].question
                answers = this.buildAnswersArray(questionObj[i].answers, i)
            }else{
                answers = this.buildAnswersArray([], i)
            }

            //create unique keys
            let divKey = 'divKey' + i
            let pKey = 'pKey' + i
            let formKey = 'formKey' + i
            let inputKey = 'inputKey' + i
            let titleKey = 'titleKey' + i

            //create question and answer fields, push them to array
            questionArray.push(
                <div className="edit-question-div" key={divKey}>
                    <p className="ques-label" key={pKey}>Question {i + 1}</p>
                    <form key={formKey}>
                        <input 
                        id={i}
                        key={inputKey}
                        defaultValue={questionValue}
                        className="question-input" 
                        size="100"
                        placeholder="question" 
                        maxLength="200" />
                        <title key={titleKey}>Answers</title>
                        {answers}
                    </form>
                </div>
            )
        }
        return questionArray
    }

    render() {

        let questions = this.buildQuestionArray(this.props.getAppState.questions)
        
        return (
            <div>
                <h1>Poll {this.props.getAppState.pollTitle}</h1>
                <h3>Edit questions below</h3>
                {questions}
                Click to save poll 
                <button type="button" onClick={this.updatePoll}>Save poll</button>
            </div>
        )
    }
        
    
}