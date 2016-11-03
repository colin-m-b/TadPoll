import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import $ from 'jquery'
import TableRow from './tableRows'

export default class AccessPolls extends Component {
    constructor (props) {
        super(props)

    }



    showPolls(data) {
        this.props.setAppState({    
            showUserPolls: true,
            userPoll: data
        })
    }

    componentDidMount() {
        let data = {
                host: this.props.getAppState.user
            }
        console.log(this.props.getAppState.user, "data: " + data.host)
        $.ajax({
            url: "http://localhost:8080/getPollByUser",
            method: "GET",
            data: data,
            success: function(data) {
                this.props.setAppState({
                    userPolls: data
                })

            }.bind(this)
        })
    }

    render() {
        let userPolls = this.props.getAppState.userPolls
        let userPollTitles = []
        let userPollCodes = []
        for (let i = 0; i < userPolls.length; i++) {
            userPollTitles.push(<TableRow 
            key={i} code={userPolls[i]._id} title={userPolls[i].title}></TableRow>)
        }

        return(
            <div>
                <h3>{this.props.getAppState.user}'s Polls</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Poll Title</th>
                            <th>Poll Code</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userPollTitles}
                        {userPollCodes}
                    </tbody>
                </table>
            </div>
        )
    }
        // let pollTables = []
        // const pollData = this.props.getAppState.userPolls
        // for (let i = 0; i < pollData.length; i++) {
        //     let questions = []
        //     let poll = {}`  1`
        //     poll.questions = []
        //     poll.title = (
        //         <div>
        //             <h3>{pollData[i].pollTitle}</h3>
        //         </div>)
        //     for (let j = 0; j < pollData[i].questions.length; j++ ) {
        //         let quesObj = {}
        //         quesObj.question = <tr>{pollData[i].questions[j]}</tr>
        //         let answers = []
        //         for (let l = 0; l < pollData[i].questions[j].answers.length; l++) {
        //             answers.push(<li>{pollData[i].questions[j].answers[l]}</li>)
        //         }
        //         quesObj.answers = answers
        //         poll.questions.push(quesObj)
    //         }

    //     }
    // }
}