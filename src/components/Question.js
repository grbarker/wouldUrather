import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'
import { Link, withRouter } from 'react-router-dom'

class Question extends Component {

  render() {
    const { question } = this.props

    if (question === null) {
      return <p>This Question doesn't exist</p>
    }

    const {
      id, optionTwo, optionOne
    } = question

    return (
      <Link
        to={{
          pathname: `/question/${id}`,
          state: { viaNav: true }
        }}
        className='question'>
        <span className='question-head'>Would you Rather</span>
        <div className='question-info'>
          <div className='q-info'>
            <p>{optionOne.text}</p>
            <br/>
            <p>or</p>
            <br/>
            <p>{optionTwo.text}</p>
          </div>
        </div>
      </Link>
    )
  }
}

function mapStateToProps ({authedUser, users, questions}, { id }) {
  const question = questions[id]

  return {
    authedUser,
    question: question
      ? formatQuestion(question, users[question.author], authedUser)
      : null
  }
}

export default withRouter(connect(mapStateToProps)(Question))
