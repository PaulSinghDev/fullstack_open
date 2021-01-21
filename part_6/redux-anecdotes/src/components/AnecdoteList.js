import React from 'react'
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const voteHandler = (id) => {
    const anecdoteObject = props.anecdotes.find(
      (anecdote) => anecdote.id === id
    )
    props.vote(id)
    props.setNotification(`You voted for '${anecdoteObject.content}'`, 10)
  }

  return (
    <div className="anecdote-list">
      <h2>Anecdotes</h2>
      {props.anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteHandler(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

const mapStateToProps = (state) => {
  if (state.filter === 'NONE') {
    return {
      anecdotes: state.anecdotes.sort((a, b) => (a.votes > b.votes ? -1 : 1)),
    }
  }
  return {
    anecdotes: state.anecdotes
      .filter((anecdote) => anecdote.content.includes(state.filter))
      .sort((a, b) => (a.votes > b.votes ? -1 : 1)),
  }
}

const mapDispatchToProps = {
  vote,
  setNotification,
}

const ConnectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
export default ConnectedAnecdotes
