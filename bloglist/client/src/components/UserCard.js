import React from 'react'
import userImg from '../img/default-user-image.png'
import { Link } from 'react-router-dom'

const UserCard = ({ user }) => {
  return (
    <div className="user-wrapper">
      <div className="user-card">
        <div className="user-thumb">
          <img src={userImg} width="75px" height="75px" />
          <p>({user && user.username})</p>
        </div>
        <div className="user-content">
          <div className="heading">
            <h2>{user && <Link to={`/user/${user.id}`}>{user.name}</Link>}</h2>
            {user && <p>{user.id}</p>}
          </div>
          <div className="content">
            <p>
              <span>Member Since:</span>
              {user &&
                new Date(user.created).toLocaleString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
            </p>
            <p>
              <span>Number of Posts:</span>
              {user && user.blogs.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserCard
