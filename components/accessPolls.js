import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import $ from 'jquery'

export default class AccessPolls extends Component {
    constructor (props) {
        super(props)
        this.noData = this.noData.bind(this)
        this.showPolls = this.showPolls.bind(this)
        this.getPollsArr = this.getPollsArr.bind(this)
    }

    getPollsArr() {

    }

    noData() {
        this.setAppState({
            noPolls: true
        })
    }

    showPolls(data) {
        this.props.setAppState({
            showUserPolls: true,
            userPoll: data
        })
    }

    componentDidMount() {
        $.ajax({
            url: "http://localhost:8080/getPollByUser",
            method: "GET",
            data: {
                userName: this.props.getAppState.user
            },
            success: function(data) {
                if (!data) {
                    this.props.setAppState({
                        showUserPolls: false
                    })
                }
                else {
                    let userPolls = []
                    for (let i = 0; i < data.length; i++) {
                        let pollObj = {
                            title: data[i].title
                        }
                    }
                    this.props.setAppState({
                        showUserPolls: true,

                    })
                }
            }.bind(this)
        })
    }

    render() {
        let pollTables = []
        const pollData = this.props.getAppState.userPoll
        for (let i = 0; i < pollData.length; i++) {
            let questions = []
            let poll = {}`  1`
            poll.questions = []
            poll.title = (
                <div>
                    <h3>{pollData[i].pollTitle}</h3>
                </div>)
            for (let j = 0; j < pollData[i].questions.length; j++ ) {
                let quesObj = {}
                quesObj.question = <tr>{pollData[i].questions[j]}</tr>
                let answers = []
                for (let l = 0; l < pollData[i].questions[j].answers.length; l++) {
                    answers.push(<li>{pollData[i].questions[j].answers[l]}</li>)
                }
                quesObj.answers = answers
                poll.questions.push(quesObj)
            }

        }
    }
}