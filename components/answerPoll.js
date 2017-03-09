import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import $ from 'jQuery'

export default class AnswerPoll extends Component {

    constructor(props) {
        super(props)
        this.buildAnswers = this.buildAnswers.bind(this)
    }

    buildAnswers() {
        const answerArray = []
        console.log(this.props.getAppState.userQuestions)
        this.props.getAppState.userQuestions.answers.forEach()
    }
}