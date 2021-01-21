import deepFreeze from 'deep-freeze'
import reducer, { notifyVote } from './notificationReducer'

describe('notification reducer', () => {
  test('undefined returns correct state', () => {
    const action = { type: 'NULL' }
    deepFreeze('NONE')
    const newState = reducer(undefined, action)
    expect(newState).toBe('NONE')
  })
  test('can notify of vote', () => {
    const initialState = 'NONE'
    deepFreeze(initialState)
    const newState = reducer(initialState, notifyVote('Hey Hey Hey'))
    expect(newState).toBe("You voted for 'Hey Hey Hey'!")
  })
})
