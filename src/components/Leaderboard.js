import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleGetUsers } from '../actions/users'

class Leaderboard extends Component {

  componentDidMount() {
    Object.entries(this.props.history.location)[3][1] === undefined
    || !this.props.authedUser
    ? this.props.history.push(
      '/login', { viaNave: true, nextPage: '/leaderboard' }
      )
    : null
    this.props.dispatch(handleGetUsers())
  }


  render() {
    const { users } = this.props
    let ranked = Object.entries(users).map((user) => {
      return {
        ...user,
        score: user[1].questions.length + Object.entries(user[1].answers).length
      }
    }).sort((a,b) => b.score - a.score)

    return (
      <div>
        <div className='container'>
        <h1 className='center'>Leaderboard</h1>
        <h5 className='center'>
          -ranking based on number of questions asked and answered-
        </h5>
          <ul className='user-list'>
          {ranked.map((u) => {
            return (
              <li key={u[1]['id']}>
                <div  className='user'>
                  <div className='av-div'>
                    <img
                      src={u[1].avatarURL}
                      alt={`Avatar of ${u[0]}`}
                      className='avatar'
                    />
                  </div>
                  <div className='user-info'>
                    <p><strong>{Object.entries(u)[1][1].name}</strong></p>
                    <p>Questions asked: {u[1].questions.length}</p>
                    <p>
                      Questions answered: {Object.entries(u[1].answers).length}
                    </p>
                  </div>
                  <div className='rank'>
                    <p># {ranked.indexOf(u) + 1}</p>
                  </div>
                </div>
              </li>
            )
          })}
          </ul>
        </div>
      </div>

    )
  }
}

function mapStateToProps ({ authedUser, users, questions }) {


  return {
    users,
    authedUser,
    questions
  }
}

export default connect(mapStateToProps)(Leaderboard)
