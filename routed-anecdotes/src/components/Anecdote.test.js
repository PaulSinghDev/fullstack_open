import React from 'react'
import { render } from '@testing-library/react'
import Anecdote from './Anecdote'

let component
describe('<Anecdote />', () => {
  beforeEach(() => {
    component = render(
      <Anecdote
        anecdote={{ content: 'hey', author: 'Jest', info: 'link', votes: 4 }}
      />
    )
  })
  test('renders', () => {
    const wrapper = component.container.querySelector('.anecdote-info')
    expect(wrapper).toBeDefined()
  })
  test('has correct content', () => {
    const content = component.getByText('hey')
    expect(content).toBeDefined()
  })
  test('has correct author', () => {
    const author = component.getByText('Jest')
    expect(author).toBeDefined()
  })
  test('has correct info', () => {
    const info = component.getByText('link')
    expect(info).toBeDefined()
  })
  test('has correct votes', () => {
    const votes = component.getByText('4')
    expect(votes).toBeDefined()
  })
})
