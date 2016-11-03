import React, { Component } from 'react'
import { Link, browserHistroy } from 'react-router'
import $ from 'jquery'

export default class ReviewPoll extends Component {
    constructor (props) {
        super()
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
                    pollCode: data[0]._id
                })
            }.bind(this)
        })
    }

    render() {
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
                            <td>{this.props.getAppState.pollTitle}</td>
                            <td>{this.props.getAppState.pollCode}</td>
                        </tr>
                    </thead>
                    <tbody>
                        {questions}
                    </tbody>
                </table>
            </div>
        )
    }
}