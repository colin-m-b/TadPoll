import React, { Component } from 'react';
import { render } from 'react-dom';

export default class Answer extends Component {
    
    render () {
        return (
            <div>
                <form onSubmit={this.props.getPoll}>
                Enter 4-character poll code below
                    <input type="text" name="code" />
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}