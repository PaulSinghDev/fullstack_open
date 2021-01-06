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
    <button className="show-more" onClick={toggleVisibility}>
      {props.buttonLabel}
    </button>
  )
  const HideButton = () => (
    <button className="show-less" onClick={toggleVisibility}>
      Show Less
    </button>
  )

  return (
    <div className="togglable-content">
      {visible ? (
        <>
          <HideButton />
          {props.children}
        </>
      ) : (
        revealButton()
      )}
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Togglable
