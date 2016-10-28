import $ from 'jquery'
import React, { Component } from 'react'
import ReactDOM, { render } from 'react-dom'
import { browserHistory } from 'react-router'
import Home from './home'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: "",
      pollCode: null,
}
    this.createAccount = this.createAccount.bind(this)
    this.goAdmin = this.goAdmin.bind(this)
    this.goAnswer = this.goAnswer.bind(this)
    this.login = this.login.bind(this)
  }

  createAccount(e) {
    e.preventDefault()
    if ($("#pwd1").val() !== $("#pwd2").val()) {
      alert("Passwords don't match, please try again")
      return
    }
    let data = {
      userName: $("#username").val(),
      password: $("#pwd2").val(),
      email: $("#email").val()
    }
    $.ajax({
      url: "http://localhost:8080/createHost",
      method: "POST",
      data: data,
      success: function(x) {
        this.setState({user: data.userName}),
        browserHistory.push('/makePoll')
      }.bind(this)
    })
  }

  goAdmin(e) {
    e.preventDefault()
    browserHistory.push('/login')
  }

  goAnswer(e) {
    e.preventDefault()
    browserHistory.push('/answer')
  }

  setAppState(obj) {
    this.setState.bind(this)(obj)
  }

  login(e) {
    e.preventDefault()
    let data = {
      userName: $("#userName").val(),
      password: $("#pwd").val()
    }
    $.ajax({
      url: "http://localhost:8080/verifyHost",
      method: "POST",
      data: data,
      success: function(x) {
        this.setState({user: data.userName}),
        browserHistory.push('/makePoll')
      }.bind(this)
    })
  }


  render() {
    return (
      <div>
      {React.cloneElement(this.props.children, { 
        getAppState: this.state,
        setAppState: this.setAppState, 
        goAdmin: this.goAdmin, 
        createAccount: this.createAccount,
        login: this.login} ) }
      </div>
    )

  }

}

