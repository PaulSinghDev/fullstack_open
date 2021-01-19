import React from 'react'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import Navigation from './components/Navigation'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/BlogPage.js'
import CreateBlog from './components/forms/CreateBlog'
import LoginForm from './components/forms/LoginForm'
import RegisterForm from './components/forms/RegisterForm'

const App = () => {
  const userMatch = useRouteMatch('/user/:id')
  const userId = userMatch ? userMatch.params.id : null

  const blogMatch = useRouteMatch('/blogs/:id')
  const blogId = blogMatch ? blogMatch.params.id : null

  return (
    <div style={{ fontFamily: 'roboto', textAlign: 'center' }}>
      <Navigation />
      <Notification />
      <Switch>
        <Route path="/user/:id">
          <User id={userId} />
        </Route>
        <Route path="/blogs/new">
          <CreateBlog />
        </Route>
        <Route path="/blogs/:id">
          <Blog id={blogId} />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/login">
          <LoginForm />
        </Route>
        <Route path="/register">
          <RegisterForm />
        </Route>
        <Route path="/">
          <Blogs />
        </Route>
      </Switch>
    </div>
  )
}

export default App
