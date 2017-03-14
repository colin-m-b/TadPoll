import React, { Component } from 'react'
import { browserHistory, Link } from 'react-router'
import accessPolls from './accessPolls'

export default class CompletePoll extends Component {

    render () {
        
        return (
            <div>
                <h3>The code for poll {this.props.getAppState.pollTitle} is {this.props.getAppState.pollCode}</h3>
                <br/>
                <p>This poll is {this.props.getAppState.pollOpen ? "open" : "closed"}</p>

                <Link to="/accessPolls">Click here to access your polls and open/close them</Link>
                
            </div>
        )
    }
}