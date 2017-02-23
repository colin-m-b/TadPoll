import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import $ from 'jquery'

export default class AnswerPage extends Component {
    constructor(props) {
        super(props)
        this.getPoll = this.getPoll.bind(this)
        this.resetUserInputCode = this.resetUserInputCode.bind(this)
    }

    resetUserInputCode() {
        this.props.setAppState({
            badCode: false,
            userAccessingClosedPoll: false
        })
    }

    componentDidMount() {
        resetUserInputCode()
    }

    getPoll(e) {
        e.preventDefault()
        resetUserInputCode()

        const code = $('input').val()

        $.ajax({
            url: 'http://localhost:8000/getPoll',
            method: 'GET',
            data: {
                _id: code
            },
            success: function(data) {
                if (!data) {
                    this.props.setAppState({
                        badCode: true
                    })
                }
                else if(data === 'closed') {
                    this.props.setAppState({
                        userAccessingClosedPoll: true
                    })
                }
                else {
                    this.props.setAppState({
                        userPollCode: code,
                        userPollTitle: data.title,
                        userQuestions: data.userQuestions
                    })
                    browserHistory.push('/answerPoll')
                }
            }
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.getPoll}>
                    <label>Enter 4-digit code here</label>
                    <input size="4" id="code" />
                </form>
            </div>
        )
    }

}