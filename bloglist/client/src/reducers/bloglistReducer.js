import blogService from '../services/blogs'
import { resetTimer } from './notificationReducer'

export const initBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOG',
      payload: blogs,
    })
  }
}

export const initUserBlogs = (id) => {
  return async (dispatch) => {
    const blogs = await blogService.getByUserId(id)
    dispatch({
      type: 'INIT_USER_BLOG',
      payload: {
        bloglist: blogs,
      },
    })
  }
}

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    const storageUser = blogService.checkForToken()
    if (!storageUser) return
    blogService.setToken(storageUser.token)
    try {
      await blogService.remove(blog)
      dispatch({
        type: 'DELETE_BLOG',
        payload: blog,
      })
      resetTimer(dispatch, 10)
    } catch (error) {
      dispatch({
        type: 'DELETE_POST_FAIL',
        payload: 'You do not have the permission to delete this post',
      })
      resetTimer(dispatch, 10)
    }
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    const storageUser = blogService.checkForToken()
    blogService.setToken(storageUser.token)
    const savedBlog = await blogService.create(blog)
    dispatch({
      type: 'CREATE_BLOG',
      payload: savedBlog,
    })
    resetTimer(dispatch, 10)
  }
}

export const updateBlog = (blog) => {
  return async (dispatch) => {
    const payload = await blogService.update(blog)
    dispatch({
      type: 'UPDATE_BLOG',
      payload,
    })
    resetTimer(dispatch, 10)
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const payload = await blogService.update(blog)
    dispatch({
      type: 'LIKE_BLOG',
      payload,
    })
    resetTimer(dispatch, 10)
  }
}

export const getById = (id) => {
  return async (dispatch) => {
    const blog = await blogService.getById(id)
    dispatch({
      type: 'INIT_BLOG_BY_ID',
      payload: {
        bloglist: blog,
      },
    })
  }
}

const bloglistReducer = (state = [], action) => {
  switch (action.type) {
    case 'CREATE_BLOG':
      return state.concat(action.payload)
    case 'DELETE_BLOG':
      return state.filter((blog) => blog.id !== action.payload)
    case 'UPDATE_BLOG':
      return state.map((blog) =>
        blog.id !== action.payload.id ? blog : action.payload
      )
    case 'LIKE_BLOG':
      return state.map((blog) =>
        blog.id !== action.payload.id ? blog : action.payload
      )
    case 'INIT_USER_BLOG':
      return [...action.payload.bloglist]
    case 'INIT_BLOG_BY_ID':
      return [action.payload.bloglist]
    case 'INIT_BLOG':
      return [...action.payload]
    default:
      return state
  }
}

export default bloglistReducer
