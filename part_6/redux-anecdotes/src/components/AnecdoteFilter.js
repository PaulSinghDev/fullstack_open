import React from 'react'
import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const AnecdoteFilter = (props) => {
  return (
    <div className="anecdote-filter">
      <h3>Filter Results</h3>
      <input
        name="filter"
        type="text"
        onChange={({ target }) => props.setFilter(target.value)}
      />
    </div>
  )
}

const mapDispatchToProps = {
  setFilter,
}

const ConnectedFilter = connect(null, mapDispatchToProps)(AnecdoteFilter)
export default ConnectedFilter
