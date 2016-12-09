import React, { Component } from 'react'
import { link, browserHistory } from 'react-router'

export default class UpdatePoll extends Component {

    constructor(props) {
        super(props)
        this.updatePoll = this.updatePoll.bind(this)
    }

    updatePoll(e) {
        e.preventDefault()
        let data = {
        }
    }

    render() {
        let questions = []

        this.props.getAppState.questions.forEach(function(item) {
            questions.push(item)
        })
    }
}