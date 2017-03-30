import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import $ from 'jQuery'

export default class AnswerPoll extends Component {

    constructor(props) {
        super(props)
        // this.buildAnswers = this.buildAnswers.bind(this)
        this.buildQuestions = this.buildQuestions.bind(this)
    }
//qu61
    /*buildAnswers() {
        return this.props.getAppState.userQuestions.answers.map(function(ans, i) {
            return (
                <form>
                    <p>Answer {i + 1}: {ans}</p>
                    <button>Answer {i + 1}</button>
                </form>
            )
        })
    }*/

    buildQuestions() {
        console.log(this.props.getAppState.userQuestions)
        return this.props.getAppState.userQuestions.map((question, i) => {
            let answers = question.answers.map((answer, j) => {
                return (
                    <form className="answerForm">
                        <p>{answer.answer}</p>
                        <button className="answerBtn">Answer {j + 1}</button>
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