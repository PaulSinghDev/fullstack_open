export const setFilter = (filter) => {
  return {
    type: 'SET_FILTER',
    payload: { filter },
  }
}

const filterReducer = (state = 'NONE', action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.payload.filter
    default:
      return state
  }
}

export default filterReducer
