import React, { Component } from 'react';
import { render } from 'react-dom';
import { } from 'react-bootstrap';
import { Link } from 'react-router'

export default class Signup extends Component {
  render() {
    return(

      <div className='container'>
        <label><b>Username</b></label>
        <input onChange={this.props.userName} type="text" placeholder="Enter Username" name="uname" required />

        <label><b>Password</b></label>
        <input onChange={this.props.password} type="password" placeholder="Enter Password" name="psw" required />

        <button onClick={this.props.createAcc} type="submit">Create Account</button>

        <button type="submit" onClick={this.props.login}>Click here to Log In</button>
      </div>
    );
  }
}
