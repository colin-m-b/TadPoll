import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import $ from 'jquery'

export default class ReviewPoll extends Component {
    constructor (props) {
        super(props)
        this.changePollStatus = this.changePollStatus.bind(this)
        this.editPoll = this.editPoll.bind(this)
    }

    componentDidMount() {
        $.ajax({
            url: 'http://localhost:8080/getPoll',
            method: "GET",
            data: {
                _id: this.props.params.poll
            },
            success: function(data) {
                console.log(Array.isArray(data), data[0].questions)
                this.props.setAppState({
                    pollTitle: data[0].title,
                    questions: data[0].questions,
                    pollCode: data[0]._id,
                    pollOpen: data[0].open,
                    showQuestion: true
                })
            }.bind(this)
        })
    }

    changePollStatus(e) {
        e.preventDefault()
        let data = {
            open: (!this.props.getAppState.pollOpen),
            _id: this.props.getAppState.pollCode
        }
        $.ajax({
            url: 'http://localhost:8080/updatePoll',
            method: "PUT",
            data: data,
            success: function(x) {
                console.log(x)
                this.props.setAppState({
                    pollOpen: (!this.props.getAppState.pollOpen)
                })
            }.bind(this)
        })
    }

    editPoll(e) {
        e.preventDefault()
        console.log(e)
        browserHistory.push("/makePoll")
    }

    render() {
        let open = ''
        let Button 
        if (this.props.getAppState.pollOpen) {
            open = 'open'
            Button = <button type="button" onClick={this.changePollStatus}>Close Poll</button>
        }else {
            open = 'closed'
            Button = <button type="button" onClick={this.changePollStatus}>Open Poll</button>
        }``
        let questions = []
        console.log(this.props.getAppState.questions)
        for (let i = 0; i < this.props.getAppState.questions.length; i++) {
            let questionTemp = (<td key={i}>{this.props.getAppState.questions[i].question}</td>)
            let answers = []
            for (let j = 0; j < this.props.getAppState.questions[i].answers.length; j++) {
                let answerTemp = (<li key={i + j}>{this.props.getAppState.questions[i].answers[j].answer}, votes: {this.props.getAppState.questions[i].answers[j].votes}</li>)
                answers.push(answerTemp)
            }
            questions.push(<tr key={i}>{questionTemp}<td><ol>{answers}</ol></td></tr>)
        }
        return (
            <div>
                <table style={{verticalAlign: "top"}}>
                    <thead>
                        <tr>
                            <th>{this.props.getAppState.pollTitle}</th>
                            <th>{this.props.getAppState.pollCode}</th>
                        </tr>
                        <tr>

                        </tr>
                    </thead>
                    <tbody>
                        {questions}
                    </tbody>
                </table>
                <div>
                This poll is <b>{open}</b>. Click button to change status
                {Button}
                Click button to edit poll
                <button type="submit" onClick={this.editPoll}>Edit Poll</button>
                </div>
            </div>
        )
    }
}