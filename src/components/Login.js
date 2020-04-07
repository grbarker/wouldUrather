import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser, handleLogOut } from '../actions/authedUser'

class Login extends Component {

  componentDidMount() {
    const { dispatch } = this.props
    const { logOut } = this.props.history.location.state

    logOut ? dispatch(handleLogOut()) : null
  }

  onChange = (id) => {
    const { dispatch } = this.props

     dispatch(setAuthedUser(id))
     this.props.history.push(
       this.props.history.location.state.nextPage, { viaNave: true }
     )
  }

  render() {
    const { users, authedUser } = this.props
    return (
      <div className='select-container center'>
        <div><p>{authedUser}</p></div>
          <div><h2>Please log in by choosing a user</h2></div>
        <select
          className='select'
          defaultValue="none"
          onChange={(e) => this.onChange(e.target.value)}
        >
          <option value="none" disabled>Choose a user...</option>
          {Object.entries(users).map((user) => {
            return (
              <option
                key={user[1].id} className="user-name"
                value={user[1].id}
              >
                {user[1].name}
              </option>
            )
          })}
        </select>
      </div>
    )
  }
}

function mapStateToProps ({ authedUser, users }) {
  return {
    users,
    authedUser,
  }
}

export default connect(mapStateToProps)(Login)
