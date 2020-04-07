import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'

class NewQuestion extends Component {
  state = {
    textOne: '',
    textTwo: '',
  }

  componentDidMount() {
    Object.entries(this.props.history.location)[3][1] === undefined
    || !this.props.authedUser
    ? this.props.history.push('/login', { viaNave: true, nextPage: '/add' })
    : null
  }

  handleChange = (e) => {
    const target = e.target.id
    const value = e.target.value

    target === 'textOne'
    ? this.setState(() => ({
        textOne: value
      }))
    : this.setState(() => ({
        textTwo: value
      }))
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { textOne, textTwo } = this.state
    const { dispatch } = this.props

    dispatch(handleAddQuestion({ textOne, textTwo }))
    this.props.history.push('/')

    this.setState(() => ({
      textOne: textOne,
      textTwo: textTwo
    }))
  }

  render() {
    const { textOne, textTwo } = this.state

    return (
      <div>
        <h1 className='center'>Compose New Question</h1>
        <form className='new-question' onSubmit={this.handleSubmit}>
          <h3>Would You Rather</h3>
          <input
            id="textOne"
            type="text"
            placeholder="Whatcha got?"
            value={textOne}
            onChange={this.handleChange}
            className='textarea'
            maxLength={280}
          />
          <h3>or</h3>
          <input
            id="textTwo"
            type="text"
            placeholder="And this one?"
            value={textTwo}
            onChange={this.handleChange}
            className='textarea'
            maxLength={280}
          />
          <button
            className='btn'
            type='submit'
            disabled={textOne === '' && textTwo === ''}>
              Submit
          </button>
        </form>
      </div>
    )
  }
}

function mapStateToProps ({ authedUser }) {


  return {
    authedUser,
  }
}

export default connect(mapStateToProps)(NewQuestion)
