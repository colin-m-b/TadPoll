import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import $ from 'jQuery'

export default class AnswerPoll extends Component {

    constructor(props) {
        super(props)
        this.buildAnswers = this.buildAnswers.bind(this)
    }

    buildAnswers() {
        console.log(this.props.getAppState.userQuestions)
        this.props.getAppState.userQuestions.answers.forEach(function(ans, i) {
            answerArray.push(
                <form>
                    <p>Answer {i + 1}: {ans}</p>
                    <button>Answr {i + 1}</button>
                </form>
            )
        })
    }

    render() {
        return <h1>hi</h1>
    }
}