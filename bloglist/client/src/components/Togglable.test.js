import React from 'react'
import Togglable from './Togglable'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'

describe('<Togglable />', () => {
  // First initialise the component into a re-assignable variable
  let component
  // Run this code before each test
  beforeEach(() => {
    component = render(
      <Togglable buttonLabel="Show More...">
        <span className="test">Test</span>
      </Togglable>
    )
  })

  test('hide children at start', () => {
    expect(component.container.querySelector('.test')).toBeNull()
  })

  test('hide show less button at start', () => {
    expect(component.container.querySelector('.show-less')).toBeNull()
  })

  test('reveal children after button click', () => {
    const button = component.container.querySelector('.show-more')
    fireEvent.click(button)
    const content = component.container.querySelector('.test')
    expect(content).not.toBeNull()
    expect(content.textContent).toBe('Test')
  })

  test('hide children again after reveal', () => {
    const revealButton = component.container.querySelector('.show-more')
    fireEvent.click(revealButton)

    const hideButton = component.container.querySelector('.show-less')
    fireEvent.click(hideButton)

    const content = component.container.querySelector('.test')
    expect(content).toBeNull()
  })

  test('render show button at start', () => {
    expect(component.container.querySelector('.show-more')).toBeDefined()
  })
})
