import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  const revealButton = () => (
    <button onClick={toggleVisibility}>{props.buttonLabel}</button>
  )
  const hideButton = () => <button onClick={toggleVisibility}>Hide</button>

  return (
    <div className="">
      {visible ? [hideButton(), props.children] : revealButton()}
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
