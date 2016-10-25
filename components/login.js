import React, { Component } from 'react';
import { } from 'react-bootstrap';
import { Link } from 'react-router';
import createAccount from './createAccount'

export default class Login extends Component {


  render() {
    console.log(this.props)
    return (
      <div className="container row">
        <div className="col-md-2"></div>
        <form >
        <label><b>Username</b></label>
        <input type="text" placeholder="user name" name="name" required />

        <label><b>Password</b></label>
        <input type="password" placeholder="password" name="psw" required />

        <button onClick={this.props.login} type="submit">Login</button>
        </form>
        <Link to='/createAccount'>Click here to create account</Link>
      </div>
    );
  }
}
