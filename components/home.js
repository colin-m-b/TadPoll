import React, { Component } from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router'
import login from './login'

export default class Home extends Component {

    render(){
        console.log(this.props.createAccount)
        return (
            <div>
                <button type='submit' onClick={this.props.goAdmin}>Click here to create poll</button>
                <button type='submit' onClick={this.props.goAnswer}>Click here to answer poll</button>
                
            </div>
        )
    }   
}