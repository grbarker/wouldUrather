import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import { setAuthedUser } from '../actions/authedUser'

class Dashboard extends Component {
  state = {
    showingAnswered: false
  }

  componentDidMount() {
    this.props.authedUser
    ? null
    : this.props.history.push('/login', { viaNave: true, nextPage: '/' })
  }

  onChange = (id) => {
    const { dispatch } = this.props

    dispatch(setAuthedUser(id))
  }

  toggleQuestionLists = () => {
    const { showingAnswered } = this.state

    this.setState({
      showingAnswered: !showingAnswered
    })
  }

  displayHome = () => {
    const { users, authedUser, questions } = this.props
    return (
      <div>
        <div className="container">
        <h1 className='center'>
          {users[authedUser].name}'s
          {this.state.showingAnswered ? " Answered" : " Unanswered"} Questions
        </h1>
          <div className="toggle-btn-container">
            <button
              className='toggle-btn btn'
              type='button'
              onClick={() => this.toggleQuestionLists()}
              >
              {this.state.showingAnswered === true
                ? 'Show Unanswered Questions'
                : 'Show Answered Questions'}
            </button>
          </div>
        </div>
        {this.state.showingAnswered
          ? (
            <div>
              <ul className='dashboard-list'>
                {Object.entries(questions)
                  .filter((q) =>
                    q[1].optionOne.votes.includes(authedUser)
                    || q[1].optionTwo.votes.includes(authedUser)
                  ).map((q) => (
                    <li key={q[1].id}>
                      <Question id={q[1].id}/>
                    </li>
                ))}
              </ul>
            </div>
          ) : (
            <div>
              <ul className='dashboard-list'>
                {Object.entries(questions)
                  .filter((q) =>
                    !q[1].optionOne.votes.includes(authedUser)
                    && !q[1].optionTwo.votes.includes(authedUser)
                  ).map((q) => (
                    <li key={q[1].id}>
                      <Question id={q[1].id}/>
                    </li>
                ))}
              </ul>
            </div>
          )
        }
      </div>
    )
  }

  render() {
    const { authedUser } = this.props

    return authedUser ? this.displayHome() : null
  }
}

function mapStateToProps ({ questions, users, authedUser }) {
  return {
    users,
    authedUser,
    questions: Object.keys(questions)
      .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
      .map((id) => questions[id]),
    questionIds: Object.keys(questions)
      .sort((a,b) => questions[a].timestamp - questions[b].timestamp)
  }
}

export default connect(mapStateToProps)(Dashboard)
