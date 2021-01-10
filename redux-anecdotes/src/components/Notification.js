import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  console.log(notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: notification === 'NONE' ? 'none' : '',
  }
  return <div style={style}>{notification}</div>
}

export default Notification