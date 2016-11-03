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
      pollCode: "",
      pollTitle: "",
      pollOpen: false,
      userPolls: [],
      questions: [],
      quesNum: 1,
      codeBuilder: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
      codeArr: [],
      showCreatePollInput: true
    }
    this.createAccount = this.createAccount.bind(this)
    this.goAdmin = this.goAdmin.bind(this)
    this.goAnswer = this.goAnswer.bind(this)
    this.login = this.login.bind(this)
    this.setAppState = this.setAppState.bind(this)
    this.addQuestion = this.addQuestion.bind(this)
    this.savePoll = this.savePoll.bind(this)
    //this.genCode = this.genCode.bind(this)
  }

  savePoll(e) {
    e.preventDefault()
    let data = {
      host: this.state.user,
      title: this.state.pollTitle,
      questions: this.state.questions,
      open: $(".check").prop( "checked" )
    }
    console.log(data)
    $.ajax({
      url: "http://localhost:8080/savePoll",
      method: "POST",
      data: data,
      success: function(x) {
        this.setAppState({
          pollCode: x.code,
          pollOpen: x.open
        })
        browserHistory.push('/completedPoll')
      }.bind(this)
    })
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
        if(x) {
        this.setState({user: data.userName}),
        browserHistory.push('/makePoll')
      } else console.log('no')
      }.bind(this)
    })
  }

  addQuestion(e) {
    let questions = this.state.questions
    let answers = []
    $(".answer").each(function(i) {
      if ($(this).val()) answers.push($(this).val())
    })
    questions.push({
      question: $("#question").val(),
      answers: answers
    })
    this.setAppState({
      questions: questions,
      quesNum: questions.length + 1
    })
    alert('Question added!')
    if (questions.length + 1 === 11) $("#addQuestion").prop("disabled", true)
  }

  render() {
    return (
      <div>
      {React.cloneElement(this.props.children, { 
        getAppState: this.state,
        setAppState: this.setAppState, 
        goAdmin: this.goAdmin, 
        createAccount: this.createAccount,
        addQuestion: this.addQuestion,
        savePoll: this.savePoll,
        login: this.login} ) }
      </div>
    )

  }

}

