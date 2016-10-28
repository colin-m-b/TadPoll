import React, { Component } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router'

// import React from 'react';
// import PollModel from './database/Models/PollModel'

export default class MakeQuestion extends Component {
  constructor (props) {
    super(props)
  }
  // _questionChange(e) {
  //   this.setState({question: e.target.value})
  // }

  // _titleChange(e) {
  //   this.setState({title: e.target.value})
  // }

  // _createQuestion() {
  //   return {title: this.state.title,
  //     question: this.state.question,
  //   };
  // }

  render() {
    // return (
    //   <div className="question-div">
    //   Enter the title for your question
    //   <input type="text" className="title-input" placeholder="title" onChange={_titleChange}/>
    //   Enter a yes/no question here
    //   <input type="text" className="question-input" placeholder="question" onChange={_questionChange}/>
    //   <button type="button" className="save-btn">Save Question</button>
    //   </div>
    // )
    console.log(this.props.user);
    return(
      <div>
        <div>
          <h1> Welcome {this.props.getAppState.user}</h1>
          <Link to='/accessPolls/:{user}'>Click here to access previous polls</Link>
          <hr/>
        </div>
          <h3>Create a new poll below</h3>
          <label>POLL TITLE</label>
          <input type="text" className='poll-title'/>
          <label>Question to ask?</label>
          <input type='text' className='question'/>
          <button onClick={this.props.addQuestion} >ADD</button>
          <button onClick={this.props.createPoll} type="submit">Create Poll</button>
          <p className='secret-inject'></p>
      </div>
      );

  }
}
