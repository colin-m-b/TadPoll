import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router'
import App from './App';
import Login from './login';
import Signup from './signup';
import Home from './home'
import BuildPoll from './BuildPoll'
import AnswerPoll from './answerPoll'
import CreateAccount from './createAccount'
import AccessPolls from './accessPolls'
import CompletedPoll from './completedPoll'
import ReviewPoll from './reviewPoll'
import UpdatePoll from './updatePoll'
import EnterPollCode from './enterPollCode'

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

