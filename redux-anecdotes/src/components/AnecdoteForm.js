import React from 'react'
import { create } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {
  const createNoteHandler = async (event) => {
    event.preventDefault()
    const content = event.target.new_anecdote.value
    event.target.new_anecdote.value = ''
    props.create(content)
  }
  return (
    <div className="anecdote-form">
      <h2>create new</h2>
      <form onSubmit={createNoteHandler}>
        <div>
          <input name="new_anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    create: (value) => {
      dispatch(create(value))
      dispatch(setNotification(`You created: ${value}`, 10))
    },
  }
}
const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm
