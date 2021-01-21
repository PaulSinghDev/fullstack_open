import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = ({ openLabel, closeLabel, children }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => setVisible(!visible)

  const revealButton = () => (
    <button className="show-more" onClick={toggleVisibility}>
      {openLabel}
    </button>
  )
  const HideButton = () => (
    <button className="show-less" onClick={toggleVisibility}>
      {closeLabel}
    </button>
  )

  return (
    <>
      {visible ? (
        <>
          <HideButton />
          {children}
        </>
      ) : (
        revealButton()
      )}
    </>
  )
}

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  openLabel: PropTypes.string.isRequired,
  closeLabel: PropTypes.string.isRequired,
}

export default Togglable
