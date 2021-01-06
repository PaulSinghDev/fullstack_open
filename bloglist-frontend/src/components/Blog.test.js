import React from 'react'
import Blog from './Blog'
import { fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

let component

// Make a mock jest function as the Blog component requires a function passed in props
const mockHandler = jest.fn()

describe('<Blog />', () => {
  beforeEach(() => {
    const blog = {
      title: 'A blog',
      author: 'Jest',
      url: 'https://hey.com',
      likes: 3,
    }
    component = render(<Blog blog={blog} deleteBlog={mockHandler} />)
  })

  test('only shows title and author at start', () => {
    const revealButton = component.getByText('Show More...')

    expect(revealButton).toBeDefined()
    expect(component.container.querySelector('.blog-details')).toBeNull()
    expect(component.container).toHaveTextContent('A blog - Jest')
  })

  test('show url and likes after pressing button', () => {
    const revealButton = component.getByText('Show More...')
    fireEvent.click(revealButton)

    const url = component.getByText('https://hey.com')
    const likes = component.getByText('Likes: 3')

    expect(url).toBeDefined()
    expect(likes).toBeDefined()
  })

  test('function passed as props works', () => {
    const revealButton = component.container.querySelector('.show-more')
    fireEvent.click(revealButton)

    const deleteButton = component.getByText('Delete')
    fireEvent.click(deleteButton)
    fireEvent.click(deleteButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
