import React, { Component } from 'react';
import { Link } from 'react-router'
import Answer from './createAnswers'
import $ from 'jquery'

export default class Question extends Component {
  constructor(props) {
    super (props)
    this.showState = this.showState.bind(this)
  }

  showState(e) {
    console.log(this.props.getAppState)
  }

  render() {
    let answers = []
    for (let i = 0; i < 4; i++) {
      answers.push(<Answer key={i} id={i}/>)
    }
    return (
      <div>
        <h3>Enter up to 10 questions for {this.props.getAppState.pollTitle}</h3>
        <hr/>
        <form>
          <title>Enter question below (200 character max)</title>
          <p>Enter question {this.props.getAppState.quesNum}</p>
          <input id="question" size="100" placeholder="question" maxLength="200" />
          <title>Enter up to four answer choices (50 characters max)</title>
          {answers}
          <button type="reset" id="addQuestion" onClick={this.props.addQuestion}>Add question to poll</button>
        </form>
        <button type="reset" value="Reset" onClick={this.props.savePoll}>Save poll</button>
      </div>
    );
  }
}
