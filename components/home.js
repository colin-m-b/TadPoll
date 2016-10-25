import React, { Component } from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router'
import login from './login'

export default class Home extends Component {

    goAdmin(e) {
        e.preventDefault()
        console.log('create clicked')
        browserHistory.push('/login')
    }

    goAnswer(e) {
        e.preventDefault()
        browserHistory.push('/answer')
    }

    render(){
        return (
            <div>
                <button type='submit' onClick={this.goAdmin}>Click here to create poll</button>
                <button type='submit' onClick={this.goAnswer}>Click here to answer poll</button>
                {this.props.children}
            </div>
        )
    }   
}