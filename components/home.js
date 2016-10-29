import React, { Component } from 'react'
import { render } from 'react-dom'
import { Link, browserHistory } from 'react-router'
import login from './login'

export default class Home extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <Link to="/login">Click here to create poll</Link>
                <Link to="/answer">Click here to answer poll</Link>
            </div>
        )
    }
}   
