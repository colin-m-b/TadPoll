import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import Modal from 'react-modal'
import $ from 'jquery'
import PollStatusButton from './pollStatusButton'

export default class ReviewPoll extends Component {
    constructor (props) {
        super(props)
        this.changePollStatus = this.changePollStatus.bind(this)
        this.editPoll = this.editPoll.bind(this)
        this.buildQuestionsArray = this.buildQuestionsArray.bind(this)
        this.openDeleteModal = this.openDeleteModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.deletePoll = this.deletePoll.bind(this)
    }

    componentDidMount() {
        $.ajax({
            url: 'http://localhost:8080/getPoll',
            method: "GET",
            data: {
                _id: this.props.params.poll
            },
            success: function(data) {
                this.props.setAppState({
                    pollTitle: data[0].title,
                    questions: data[0].questions,
                    pollCode: data[0]._id,
                    pollOpen: data[0].open,
                    showQuestion: true
                })
            }.bind(this)
        })
    }

    buildQuestionsArray() {

        let questions = []

        for (let i = 0; i < this.props.getAppState.questions.length; i++) {
            console.log(this.props.getAppState.questions[i])
            let questionTemp = (
                <td key={i}>{this.props.getAppState.questions[i].question}</td>
                )

        let answers = []

        for (let j = 0; j < this.props.getAppState.questions[i].answers.length; j++) {
            let answerTemp = (<li key={i + j}>{this.props.getAppState.questions[i].answers[j].answer}, votes: {this.props.getAppState.questions[i].answers[j].votes}</li>)
            answers.push(answerTemp)
        }
        questions.push(
            <tr key={i}>{questionTemp}
                <td><ol>{answers}</ol></td>
            </tr>)
        }
        return questions
    }

    changePollStatus(e) {
        e.preventDefault()

        let data = {
            open: (!this.props.getAppState.pollOpen),
            _id: this.props.getAppState.pollCode
        }

        $.ajax({
            url: 'http://localhost:8080/updatePollInDB',
            method: "PUT",
            data: data,
            success: function(x) {
                console.log(x)
                this.props.setAppState({
                    pollOpen: (!this.props.getAppState.pollOpen)
                })
            }.bind(this)
        })
    }

    deletePoll(e) {
        e.preventDefault()

        let data = {
            _id: this.props.getAppState.pollCode
        }

        $.ajax({
            url: 'http://localhost:8080/deletePoll',
            data: data,
            method: "DELETE",
            success: function(data) {
                browserHistory.push('/accessPolls')
            }
        })
    }

    editPoll(e) {
        e.preventDefault()

        browserHistory.push(`/updatePoll`)
    }

    openDeleteModal(e) {

        e.preventDefault()

        this.props.setAppState({
            deleteModalOpen: true
        })
    }

    closeModal(e) {
        e.preventDefault()

        this.props.setAppState({
            deleteModalOpen: false
        })
    }

    render() {

        const customStyles = {
            content : {
                top                   : '50%',
                left                  : '50%',
                right                 : 'auto',
                bottom                : 'auto',
                marginRight           : '-50%',
                transform             : 'translate(-50%, -50%)'
            }
            };
        
        let openOrClosed = this.props.getAppState.pollOpen ? 'open' : 'closed'
        let questions = this.buildQuestionsArray
        return (
            <div>
                <table style={{verticalAlign: "top"}}>
                    <thead>
                        <tr>
                            <th>{this.props.getAppState.pollTitle}</th>
                            <th>{this.props.getAppState.pollCode}</th>
                        </tr>
                        <tr>

                        </tr>
                    </thead>
                    <tbody>
                        {questions}
                    </tbody>
                </table>
                <div>
                This poll is <b>{openOrClosed}</b>. Click button to change status
                <PollStatusButton 
                getAppState={this.props.getAppState} 
                setAppState={this.props.setAppState}
                className="test">
                </PollStatusButton>
                <button type="submit" onClick={this.editPoll}>Edit Poll</button>
                <button type="submit" onClick={this.openDeleteModal}>Delete Poll</button>
                <Modal
                isOpen={this.props.getAppState.deleteModalOpen}
                onRequestClose={this.closeModal}
                contentLabel="Delete Poll"
                //style={customStyles}
                >
                    <h3>Are you sure you want to delete this poll?</h3>
                    <p>{this.props.getAppState.pollTitle}</p>
                    <p>{this.props.getAppState.pollCode}</p>
                    <button type="submit" onClick={this.deletePoll}>Delete Poll</button>
                    <button type="submit" onClick={this.closeModal}>Cancel</button>
                </Modal>
                </div>
            </div>
        )
    }
}