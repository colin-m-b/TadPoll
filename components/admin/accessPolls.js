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
            success: data => {
                this.props.setAppState({
                    userPolls: data
                })

            }
        })
    }

    render() {

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
                        {this.props.getAppState.userPolls.map((x, i) => (
                            <TableRow 
                            key={i} code={x._id} title={x.title}>
                            </TableRow>)
                        )}
                        
                    </tbody>
                </table>
            </div>
        )
    }
        
}