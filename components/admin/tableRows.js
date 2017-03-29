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
                    <Link to={`/reviewPoll/${code}`}>{title}</Link>
                </td>
                <td>
                    <Link to={`/reviewPoll/${code}`}>{code}</Link>
                </td>
            </tr>
        )
    }
} 