import React, { Component } from 'react'
import $ from 'jquery'
import { render } from 'react-dom'
import { Link } from 'react-router'
import Question from './question'


export default class MakeQuestion extends Component {
  constructor (props) {
    super(props)
    this.saveTitle = this.saveTitle.bind(this)
  }

  componentWillMount() {
    this.props.setAppState({
      showQuestion: false
    })
  }


  saveTitle(e) {
    e.preventDefault()
    let code = this.genCode()
    this.props.setAppState({
      pollTitle: $("#pollTitle").val(),
      showQuestion: true
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
    console.log(this.props.getAppState)
    return(
      <div>
        <div>
          <h1> Welcome {this.props.getAppState.user}</h1>
          <Link to='/accessPolls/:{user}'>Click here to access previous polls</Link>
          <hr/>
        </div>
          <h3>Create a new poll below</h3>
          <form>
            <label>Poll TItle (50 characters max)</label>
            <input type="text" width="50" className='poll-title' id="pollTitle" maxLength="50"/>
            <button type="button" onClick={this.saveTitle}>Save title</button>
          </form>
          { this.props.getAppState.showQuestion ? <Question getAppState={this.props.getAppState} addQuestion={this.props.addQuestion}/> : null}
      </div>
      );

  }
}
