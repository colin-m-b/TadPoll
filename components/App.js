import $ from 'jquery'
import React, { Component } from 'react'
import ReactDOM, { render } from 'react-dom'
import { browserHistory } from 'react-router'
import Home from './home'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      pollCode: null,
      
    }
    this.createAccount = this.createAccount.bind(this)
    this.goAdmin = this.goAdmin.bind(this)
    this.goAnswer = this.goAnswer.bind(this)
  }

  createAccount(e) {
    e.preventDefault()
    console.log('hi')
  }

  goAdmin(e) {
    e.preventDefault()
    console.log('create clicked')
    browserHistory.push('/login')
  }

  goAnswer(e) {
    e.preventDefault()
    browserHistory.push('/answer')
  }

  render() {
    return (
      <div>
      <Home state={this.state} createAccount={this.createAccount} goAdmin={this.goAdmin} goAnswer={this.goAnswer}/>

      {this.props.children}
      </div>
    )

  }

}

