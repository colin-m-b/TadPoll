import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Login extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    console.log(this.props.login)
    return (
      <div className="container row">
        <div className="col-md-2"></div>
        <form >
        <label><b>Username</b></label>
        <input type="text" placeholder="user name" id="userName" required />

        <label><b>Password</b></label>
        <input type="password" placeholder="password" id="pwd" required />

        <button onClick={this.props.login} type="button">Login</button>
        </form>
        <Link to='/createAccount'>Click here to create account</Link>
      </div>
    );
  }
}
