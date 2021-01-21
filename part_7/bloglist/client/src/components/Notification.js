import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  return (
    <div
      className="notification-modal"
      aria-hidden={notification ? 'false' : 'true'}
      data-type={notification && notification.type}
    >
      <div className="notification-wrapper">
        <h3>{notification && notification.type}</h3>
        <p>{notification && notification.message}</p>
      </div>
    </div>
  )
}

export default Notification
