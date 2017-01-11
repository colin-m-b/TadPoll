import React, { Component } from 'react'
import { link, browserHistory } from 'react-router'
import Answer from './createAnswers'
import $ from 'jquery'
import PollStatusButton from './pollStatusButton'

export default class UpdatePoll extends Component {

    constructor(props) {
        super(props)
        this.updatePoll = this.updatePoll.bind(this)
        this.buildAnswersArray = this.buildAnswersArray.bind(this)
        this.buildQuestionArray = this.buildQuestionArray.bind(this)
        this.buildDataForUpdate = this.buildDataForUpdate.bind(this)
        this.updateQuestions = this.updateQuestions.bind(this)
    }

    updatePoll(e) {
        e.preventDefault()
        console.log('firing update')
        let data = this.buildDataForUpdate()
        console.log(data)
        $.ajax({
            url: "http://localhost:8080/updateOldPoll",
            method: "PUT",
            data: data,
            success: function(updatedPollStatus) {
                console.log(updatedPollStatus)
            }.bind(this)
        })
    }

    buildDataForUpdate() {
        let questions = this.updateQuestions()

        let dataForUpdate = {
            _id: this.props.getAppState.pollCode,
            host: this.props.getAppState.user,
            title: this.props.getAppState.pollTitle,
            questions: questions,
            open: this.props.getAppState.pollOpen,
            created_at: Date.now()
        }   
        return dataForUpdate
    }

    updateQuestions() {
        let questionsArray = []
        $('.question-input').each(function() {
            if ($(this).val()) {
                console.log('val: ', $(this).val())
                let questionObj = {}
                questionObj.question = $(this).val()
                let className = '.' + $(this).attr("id")
                let answerArr = []
                $(className).each(function(){
                    if($(this).val())
                    answerArr.push({
                        answer: $(this).val(),
                        votes: 0
                    })
                })
                questionObj.answers = answerArr
                questionsArray.push(questionObj)
            }
            
        })
        console.log(questionsArray[0])
        this.props.setAppState({
            questions: questionsArray
        })
        return questionsArray
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

        let openOrClosed = this.props.getAppState.pollOpen ? 'open' : 'closed'
        let openCloseButtonVal = this.props.getAppState.pollOpen ? 'Close poll' : 'Open poll'
        let questions = this.buildQuestionArray(this.props.getAppState.questions)
        
        return (
            <div>
                <h1>Poll {this.props.getAppState.pollTitle}</h1>
                <h3>Edit questions below</h3>
                {questions}
                <div>
                    <h5>This poll is currently {openOrClosed}</h5> 
                    <p>Click to change poll status</p>
                    <PollStatusButton
                    getAppState={this.props.getAppState}
                    setAppState={this.props.setAppState}
                    ></PollStatusButton>
                </div>
                <div>
                    <h4>Click to save poll</h4>
                    <button type="button" onClick={this.updatePoll}>Update poll</button>
                </div>
                
            </div>
        )
    }
        
    
}