import React from 'react'
import People from './components/People'
import Notes from './components/Notes'

const App = () => {
  return (
    <div className="app-wrapper">
      <Notes />
      <People />
    </div>
  )
}

export default App
