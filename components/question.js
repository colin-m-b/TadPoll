import React, { Component } from 'react';
import { Link } from 'react-router'
import Answer from './createAnswers'
import $ from 'jquery'

export default class Question extends Component {
  constructor(props) {
    super (props)
    this.showState = this.showState.bind(this)
    this.editPollTitle = this.editPollTitle.bind(this)
  }

  editPollTitle() {
    this.props.setAppState({
      showCreatePollInput: true,
    })
  }

  showState(e) {
    console.log(this.props.getAppState)
  }

  render() {
    let answers = []
    for (let i = 1; i < 5; i++) {
      answers.push(<label key={i}>Answer {i}<Answer key={i} data-id={i}/></label>)
    }
    return (
      <div>
        <h3>Enter up to 10 questions for poll "{this.props.getAppState.pollTitle}"</h3>
        <button onClick={this.editPollTitle}>Change poll title</button>
        <hr/>
        <form>
          <title>Enter question below (200 character max)</title>
          <p>Enter question {this.props.getAppState.quesNum}</p>
          <input id="question" size="100" placeholder="question" maxLength="200" />
          <title>Enter up to four answer choices (50 characters max)</title>
          {answers}
          <button type="reset" id="addQuestion" onClick={this.props.addQuestion}>Add question to poll</button>
        </form>
        <form>
        <label>Open poll for responses
          <input type="checkbox" className="check" value="open"/></label>
        <button type="reset" value="Reset" onClick={this.props.savePoll}>Save poll</button>
        </form>
      </div>
    );
  }
}
