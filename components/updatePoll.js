import React, { Component } from 'react'
import { link, browserHistory } from 'react-router'
import Answer from './createAnswers'

export default class UpdatePoll extends Component {

    constructor(props) {
        super(props)
        this.updatePoll = this.updatePoll.bind(this)
    }

    updatePoll(e) {
        e.preventDefault()
        let data = {
        }
    }

    render() {
        let questions = []
        for (let i = 1; i < 11; i++) {
            let quesVal = ""
            if (this.props.getAppState.questions[i]) {
                let item = this.props.getAppState.questions[i]
                quesVal = item.question
                let answers = []
                for (let j = 1; j < 5; j++) {
                    let answerVal = ""
                    if (item.answers[j]) answerVal = item.answers[j].answer 
                    answers.push(
                    <span>
                        <label>Answer {j}</label>
                        <input defaultValue={answerVal} key={j} className="answer-input"/>
                    </span>
                    )
                }

                questions.push(
                    <div className="edit-question-div" key={i}>
                        <p className="ques-label">Question {i}</p>
                        <form>
                            <input 
                            defaultValue={item.question}
                            id="question" 
                            size="100"
                            placeholder="question" 
                            maxLength="200" />
                            <title>Aswers</title>
                            {answers}
                        </form>
                    </div>
                )
            }
        }
        return (
            <div>
                <h1>Poll {this.props.getAppState.pollTitle}</h1>
                <h3>Edit questions below</h3>
                {questions}
                Click to save poll 
                <button type="button" onClick={this.updatePoll}>Save poll</button>
            </div>
        )
    }
        
    
}