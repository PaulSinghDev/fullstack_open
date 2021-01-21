import { createStore } from 'redux'
import { applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import bloglistReducer from './reducers/bloglistReducer'
import authReducer from './reducers/authReducer'
import notificationReducer from './reducers/notificationReducer'
import userlistReducer from './reducers/userlistReducer'
import userReducer from './reducers/userReducer'
import commentsReducer from './reducers/commentsReducer'

const reducer = combineReducers({
  bloglist: bloglistReducer,
  auth: authReducer,
  notification: notificationReducer,
  userlist: userlistReducer,
  user: userReducer,
  // comments: commentsReducer,
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
