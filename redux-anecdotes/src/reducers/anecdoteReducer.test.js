import deepFreeze from 'deep-freeze'
import reducer, { initialState, vote, create } from './anecdoteReducer'

describe('anecdotes reducer', () => {
  test('undefined returns correct initial state', () => {
    const action = { type: 'NULL' }
    deepFreeze(initialState)
    const newState = reducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('vote action works', () => {
    const id = initialState[0].id

    deepFreeze(initialState)
    const newState = reducer(initialState, vote(id))
    expect(newState[0].votes).toEqual(initialState[0].votes + 1)
  })

  test('create note works', () => {
    const content = 'This is not an anecdote'
    deepFreeze(initialState)
    const newState = reducer(initialState, create(content))
    const objectFromStore = newState.find((item) => item.content === content)
    expect(objectFromStore.id).toBeDefined()
  })
})
