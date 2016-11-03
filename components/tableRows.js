import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'

export default class TableRow extends Component {
    constructor(props) {
        super()
    }

    render() {
        let title = this.props.title
        let code = this.props.code
        return (
            <tr>
                <td>
                    <Link to='/reviewPoll/{path}'>{title}</Link>
                </td>
                <td>
                    <Link to='/reviewPoll/{path}'>{code}</Link>
                </td>
            </tr>
        )
    }
} 