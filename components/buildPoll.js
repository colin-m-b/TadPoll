import React, { Component } from 'react'
import $ from 'jquery'
import { render } from 'react-dom'
import { Link, browserHistory } from 'react-router'
import Question from './question'
import PollInput from './pollinput'


export default class MakeQuestion extends Component {
  constructor (props) {
    super(props)
  }

  componentWillMount() {
    this.props.setAppState({
      showQuestion: false,
    })
  }

  submitPoll(e) {
    e.preventDefault()
    let data = {
      userName: this.state.user,
      pollTitle: this.state.pollTitle || $("#pollTitle").val(),
    }
  }

  render() {
    const user = this.props.getAppState.user
    const pollInputJSX = (
      <PollInput 
        setAppState={this.props.setAppState} 
        getAppState={this.props.getAppState}/>
    )
    const questionJSX = (
      <Question 
        getAppState={this.props.getAppState} 
        setAppState={this.props.setAppState}
        addQuestion={this.props.addQuestion}
        savePoll={this.props.savePoll}/>
    )
    return(
      <div>
        <div>
          <h1> Welcome {this.props.getAppState.user}</h1>
          <Link to='/accessPolls'>Click here to access previous polls</Link>
          <hr/>
          <h3>Create a poll below</h3>
        </div>
          {this.props.getAppState.showCreatePollInput ? pollInputJSX : null}
          {this.props.getAppState.showQuestion ? questionJSX : null}
      </div>
      );

  }
}
