import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0,
  }

  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING',
    }
    deepFreeze(state)
    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD',
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0,
    })
  })

  test('bad is incrementing', () => {
    const action = {
      type: 'BAD',
    }
    const state = initialState
    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({ good: 0, bad: 1, ok: 0 })
  })

  test('ok is incrementing', () => {
    // Set the action which will tell the reducer what to do with the state
    const action = { type: 'OK' }
    // Set the initial state of the app
    const state = initialState
    // Ensure that this object is not changed by the reducer
    deepFreeze(state)
    // Get the new state by calling the reducer which will take the original state
    // and then update it according to the action specified
    const newState = counterReducer(state, action)
    //Ensure the new state has been updated
    expect(newState).toEqual({ good: 0, bad: 0, ok: 1 })
  })
})
