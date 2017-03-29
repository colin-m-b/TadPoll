import React, { Component } from 'react'
import { render } from 'react-dom'
import { Link, browserHistory } from 'react-router'
import login from './admin/login'

export default class Home extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <Link to="/login">Click here if you're creating/editing a poll</Link>
                <Link to="/enterPollCode">Click here if you're answering a poll</Link>
            </div>
        )
    }
}   
