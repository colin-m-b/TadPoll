import React, { Component } from 'react'

export default class PollStatusButton extends Component {

    constructor(props) {
        super(props)
        this.changeStatus = this.changeStatus.bind(this)
    }

    changeStatus(e) {
        e.preventDefault()
        console.log('poll status button firing')
        let pollOpen = !this.props.getAppState.pollOpen
        this.props.setAppState({
            pollOpen: pollOpen
        })
    }

    render() {
        let openOrClosed = this.props.getAppState.pollOpen ? "Close poll" : "Open poll"
        return (
            <div>
                <button type="button" 
                onClick={this.changeStatus}
                className="button poll-status-btn">{openOrClosed}</button>
            </div>
        )
    }
}