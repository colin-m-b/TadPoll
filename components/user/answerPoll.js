import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import $ from 'jQuery'

export default class AnswerPoll extends Component {

    constructor(props) {
        super(props)
        this.buildQuestions = this.buildQuestions.bind(this)
        this.chooseAnswer = this.chooseAnswer.bind(this)
    }
//qu61

    chooseAnswer (e) {
        e.preventDefault()
        console.log(e.currentTarget)
    }

    buildQuestions() {
        console.log(this.props.getAppState.userQuestions)
        return this.props.getAppState.userQuestions.map((question, i) => {
            let divKey = "div" + i
            let answers = question.answers.map((answer, j) => {
                let btnKey = "btn" + j
                let pKey = "p" + j
                let formKey = "form" + j
                let value = i + "." + j
                return (  
                    <form key={formKey} className="answerForm">
                        <p key={pKey}>Answer {j+ 1}: {answer.answer}</p>
                        <button key={btnKey} className="answerBtn" value={value} onClick={this.chooseAnswer}>Choose answer {j + 1}</button>
                    </form>
                )
            })
            return (
                <div key={divKey}>
                    <p key={i}>{question.question}</p>
                    {answers}
                </div>
            )
        })
    }

    render() {
        return (
            <div>
                <h1>{this.props.getAppState.userPollTitle}</h1>
                {this.buildQuestions()}
            </div>
        )
    }
}