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
            userPollCode: '',
            badCode: false,
            userAccessingClosedPoll: false
        })
    }

    componentDidMount() {
        this.resetUserInputCode()
    }

    getPoll(e) {
        e.preventDefault()
        this.resetUserInputCode()

        const code = $('input').val()

        $.ajax({
            url: 'http://localhost:8080/getPoll',
            method: 'GET',
            data: {
                _id: code
            },
            success: data => {
                if (!data) {
                    this.props.setAppState({
                        badCode: true
                    })
                }
                else if(data === 'closed') {
                    console.log('closed')
                    this.props.setAppState({
                        userAccessingClosedPoll: true
                    })
                }
                else {
                    console.log('success')
                    this.props.setAppState({
                        userPollCode: code,
                        userPollTitle: data.title,
                        userQuestions: data.userQuestions
                    })

                    browserHistory.push('/answer')
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
                    <button type="submit">Click to enter code</button>
                </form>
            </div>
        )
    }

}
//	de6p