import React from 'react'
import { render } from '@testing-library/react'
import AnecdoteList from './AnecdoteList'
import { BrowserRouter as Router } from 'react-router-dom'

let component
describe('<AnecdoteList />', () => {
  beforeEach(() => {
    const anecdotes = [
      {
        content: 'If it hurts, do it more often',
        author: 'Jez Humble',
        info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
        votes: 0,
        id: '1',
      },
      {
        content: 'Premature optimization is the root of all evil',
        author: 'Donald Knuth',
        info: 'http://wiki.c2.com/?PrematureOptimization',
        votes: 0,
        id: '2',
      },
    ]
    component = render(
      <Router>
        <AnecdoteList anecdotes={anecdotes} />
      </Router>
    )
  })
  test('renders', () => {
    const wrapper = component.container.querySelector('.anecdote-list')
    expect(wrapper).toBeDefined()
  })
  test('renders correct number of li elements', () => {
    const li = component.container.querySelectorAll('li')
    expect(li).toHaveLength(2)
  })
})
