import $ from 'jquery'
import React, { Component } from 'react'
import ReactDOM, { render } from 'react-dom'
import Home from './home'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      pollCode: null,
      
    }
    this.createAccount = this.createAccount.bind(this)
  }

  createAccount(e) {
    e.preventDefault()
    console.log(e)
  }

  render() {
    return (
      <div>
      <Home />
      </div>
    )
  }

}

