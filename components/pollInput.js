import React, { Component } from 'react'
import $ from 'jquery'

export default class PollInput extends Component {
    constructor(props) {
        super(props)
        this.saveTitle = this.saveTitle.bind(this)
    }

    saveTitle(e) {
        e.preventDefault()
        this.props.setAppState({
            pollTitle: $("#pollTitle").val(),
            showQuestion: true,
            showCreatePollInput: false
        })
    }

    render() {
        return (
            <div>
                
            <form>
                <label>Poll TItle (50 characters max)</label>
                <input type="text" width="50" className='poll-title' id="pollTitle" maxLength="50"/>
                <button type="button" onClick={this.saveTitle}>Save title</button>
            </form>
          </div>
        )
    }
}