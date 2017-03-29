import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'
import App from './App';
import Login from './admin/login';
import Signup from './admin/signup';
import Home from './home'
import BuildPoll from './admin/buildPoll'
import AnswerPoll from './user/answerPoll'
import CreateAccount from './admin/createAccount'
import AccessPolls from './admin/accessPolls'
import CompletedPoll from './admin/completedPoll'
import ReviewPoll from './admin/reviewPoll'
import UpdatePoll from './admin/updatePoll'
import EnterPollCode from './user/enterPollCode'

export default class Index extends Component{
    constructor(props) {
        super(props)
    }
    render () {
        return (
            <Router history={browserHistory} >
                <Route path='/' component={App} >
                <IndexRoute component={Home} />
                    <Route path='/login' component={Login} />
                    <Route path='/enterPollCode' component={EnterPollCode} />
                    <Route path='/answer' component={AnswerPoll} />  
                    <Route path='/createAccount' component={CreateAccount} />  
                    <Route path='/makePoll' component={BuildPoll} />
                    <Route path='/accessPolls' component={AccessPolls} />
                    <Route path='/completedPoll' component={CompletedPoll} />
                    <Route path='/reviewPoll/:poll' component={ReviewPoll} />
                    <Route path='/updatePoll' component={UpdatePoll} />
                 </Route>
      
            </Router>
        )
    
    }
}

ReactDOM.render((<Index />), document.getElementById('main-container'));

