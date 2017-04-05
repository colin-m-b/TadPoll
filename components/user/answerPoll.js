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

    chooseAnswer = (quesNum, ansNum) => {

    }

    buildQuestions() {
        console.log(this.props.getAppState.userQuestions)
        return this.props.getAppState.userQuestions.map((question, i) => {
            let answers = question.answers.map((answer, j) => {
                return (
                    <form className="answerForm">
                        <p key={j}>{answer.answer}</p>
                        <button className="answerBtn" onClick={this.chooseAnswer(i, j)}>Answer {j + 1}</button>
                    </form>
                )
            })
            return (
                <div>
                    <p>{question.question}</p>
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