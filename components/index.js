import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'
import App from './App';
import Login from './login.js';
import Signup from './signup.js';
import Home from './home.js'
import MakePoll from './makeQuestion'
import Answer from './answer.js'
import CreateAccount from './createAccount.js'

export default class Index extends Component{
    constructor(props) {
        super(props)
    }
    render () {
        return (
            <Router history={browserHistory} >
                <Route path='/' component={App} />
                <Route path='/login' component={Login} />
                <Route path='/createAccount' component={CreateAccount} />
                <Route path='/answer' component={Answer} />         
            </Router>
        )
    
    }
}

ReactDOM.render((<Index />), document.getElementById('main-container'));

