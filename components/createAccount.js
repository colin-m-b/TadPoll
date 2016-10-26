import React, { Component } from 'react'

export default class CreateAccount extends Component {

  createAccount(e) {
    e.preventDefault()
    console.log('hi')
  }

    render () {
        return (
            <div>
                <h3>Create Account</h3>
                <form >
                    User Name
                    <input type="text" name="username" placeholder="name" />
                    Email
                    <input type="email" name="email" placeholder="email" />
                    Password
                    <input type="password" id="pwd1" name="password" placeholder="password" />
                    Verify password
                    <input type="password" id="pwd2" placeholder="password" />
                    <button onClick={this.createAccount} type="button">Submit</button>
                </form>
            </div>
        )
    }
}