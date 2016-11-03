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
        
}