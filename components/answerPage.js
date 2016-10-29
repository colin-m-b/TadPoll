import React, { Component } from 'react'
import { Link, browserHistroy } from 'react-router'

export default class AnswerPage extends Component {

    render() {
        return (
            <div>
                <form onSubmit={this.props.getPoll}>
                    <label>Enter 4-digit code here</label>
                    <input size="4" id="code" />
                </form>
            </div>
        )
    }

}