import React, { useState, useImperativeHandle } from 'react'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  const revealButton = () => (
    <button onClick={toggleVisibility}>{props.label}</button>
  )
  const hideButton = () => <button onClick={toggleVisibility}>Hide</button>

  return (
    <div className="">
      {visible ? [hideButton(), props.children] : revealButton()}
    </div>
  )
})

export default Togglable
