import React from 'react'
import AnecdoteFilter from './components/AnecdoteFilter'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'

const App = () => {
  return (
    <div>
      <Notification />
      <AnecdoteList />
      <AnecdoteFilter />
      <AnecdoteForm />
    </div>
  )
}

export default App
