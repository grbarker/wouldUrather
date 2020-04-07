import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleQuestionAnswer } from '../actions/questions'
import { formatQuestion } from '../utils/helpers'

class QuestionPage extends Component {

  componentDidMount() {
    Object.entries(this.props.history.location)[3][1] === undefined
    || !this.props.authedUser
    ? this.props.history.push(
      '/login', { viaNave: true, nextPage: `/question/${this.props.id}` }
    )
    : null
  }

  handleVote = (answer) => {
    const { dispatch, authedUser, id} = this.props

    dispatch(handleQuestionAnswer({
      authedUser,
      id,
      answer: answer
    }))
  }
  optionOneVotes = () => {
    const { optionOne, optionTwo } = this.props

    return {
      votes: optionOne.votes.length,
      share: Math.round(
        (optionOne.votes.length /
          (optionTwo.votes.length + optionOne.votes.length)
        ) * 100)
    }
  }
  optionTwoVotes = () => {
    const { optionOne, optionTwo } = this.props

    return {
      votes: optionTwo.votes.length,
      share: Math.round(
        (optionTwo.votes.length /
          (optionOne.votes.length + optionTwo.votes.length)
        ) * 100)
    }
  }

  displayQuestion = () => {
    const { optionOne, optionTwo, question, authedUser  } = this.props

    return (
      <div className='container'>
        <h1 className='center'> Question </h1>
        <div className='question'>
          <span className='question-head'>Would you Rather</span>
          <div className='center'>
            <div className='av-div'>
              <img
                src={question.avatar}
                alt={`Avatar of ${question.author}`}
                className='avatar'
              />
            </div>
          </div>
          {!question.hasVoted
            ? null
            : optionOne.votes.includes(authedUser)
            ? <div className='center'>
                <strong>
                  You  would rather {optionOne.text} than {optionTwo.text}!
                </strong>
              </div>
            : <div className='center'>
                You  would rather {optionTwo.text} than {optionOne.text}!
              </div>
          }
          <div className='question-info'>
            {question.hasVoted
              ? (
                <div>
                  <p>
                    {this.optionOneVotes().votes}
                    {this.optionOneVotes().votes === 1
                      ? " person "
                      : " people "
                    }
                     chose "{optionOne.text}"
                  </p>
                  <p>
                    {this.optionOneVotes().share}% chose "{optionOne.text}"
                  </p>
                </div>
                )
                : null
              }
            <button
              className={
                question.hasVoted && optionOne.votes.includes(authedUser)
                ? 'btn-chosen'
                : 'btn'
              }
              type='button'
              disabled={question.hasVoted}
              onClick={() => this.handleVote("optionOne")}>
                {optionOne.text}
            </button>
            <hr/>
            <button
              className={
                question.hasVoted && optionTwo.votes.includes(authedUser)
                ? 'btn-chosen'
                : 'btn'
              }
              type='button'
              disabled={question.hasVoted}
              onClick={() => this.handleVote("optionTwo")}>
                {optionTwo.text}
            </button>
            {question.hasVoted
              ? (
                <div>
                  <p>
                    {this.optionTwoVotes().votes}
                    {this.optionTwoVotes().votes === 1
                      ? " person "
                      : " people "
                    }
                     chose "{optionTwo.text}"
                  </p>
                  <p>
                    {this.optionTwoVotes().share}% chose "{optionTwo.text}"
                  </p>
                </div>
                )
              : null
            }
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { optionOne, optionTwo, question, authedUser  } = this.props

    return question
      ? this.displayQuestion()
      : (
        <div className="center">
          <h1>404 -- That page does not exist.</h1>
        </div>
        )
  }
}

function mapStateToProps ({ authedUser, questions, users }, props) {
  const { id } = props.match.params
  const question = questions[props.match.params.id]
  const optionOne = question ? question.optionOne : null
  const optionTwo = question ? question.optionTwo : null

  return {
    id,
    authedUser,
    optionOne,
    optionTwo,
    question: question
      ? formatQuestion(question, users[question.author], authedUser)
      : null
  }
}

export default connect(mapStateToProps)(QuestionPage)
