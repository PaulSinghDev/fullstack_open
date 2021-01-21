import deepFreeze from 'deep-freeze'
import reducer, { setFilter } from './filterReducer.js'

describe('filter reducer tests', () => {
  test('undefined returns state', () => {
    const initialState = 'NONE'
    const newState = reducer(undefined, { type: 'NULL' })
    expect(newState).toBe(initialState)
  })

  test('Can change filter', () => {
    const initialState = 'NONE'
    const newState = reducer(initialState, setFilter('first'))
    expect(newState).toBe('first')
  })
})
