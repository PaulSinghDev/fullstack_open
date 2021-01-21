import blogService from '../services/blogs'

export const postComment = (id, comment) => {
  return async (dispatch) => {
    const comment = await blogService.postComment(id, comment)
    dispatch({
      type: 'POST_COMMENT',
      payload: {
        comments: comment,
      },
    })
  }
}

export const initComments = (id) => {
  return async (dispatch) => {
    const comments = await blogService.getComments(id)
    dispatch({
      type: 'INIT_COMMENTS',
      payload: {
        comments: [...comments.comments],
      },
    })
  }
}

const commentsReducer = (state = [], action) => {
  switch (action.type) {
    case 'POST_COMMENT':
      console.log(action.payload)
      return state.concat(action.payload.comments)
    case 'INIT_COMMENTS':
      console.log(action.payload)
      return action.payload.comments
    default:
      return state
  }
}

export default commentsReducer
