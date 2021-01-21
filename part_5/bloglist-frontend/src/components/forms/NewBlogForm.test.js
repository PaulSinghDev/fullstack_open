import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, act } from '@testing-library/react'
import NewBlogForm from './NewBlogForm'

let component
let mockHandler = jest.fn()

describe('<NewBlogFrom />', () => {
  beforeEach(() => {
    component = render(<NewBlogForm createBlog={mockHandler} />)
  })

  test('all fields are rendered', () => {
    const fields = ['title', 'author', 'url'].map((label) =>
      component.container.querySelector(`#new-blog-${label}`)
    )
    fields.forEach((field) => expect(field).not.toBeNull())
  })

  test('submit is rendered', () => {
    const button = component.container.querySelector('button[type="submit"]')
    expect(button).not.toBeNull()
  })

  test('callback is executed', () => {
    const submit = component.container.querySelector('button[type="submit"]')
    fireEvent.click(submit)
    expect(mockHandler.mock.calls).toHaveLength(1)
  })

  test('callback receives data', async () => {
    const titleInput = component.container.querySelector('#new-blog-title')
    const authorInput = component.container.querySelector('#new-blog-author')
    const urlInput = component.container.querySelector('#new-blog-url')
    const form = component.container.querySelector('form')

    fireEvent.change(titleInput, { target: { value: 'Test from Jest' } })
    fireEvent.change(authorInput, { target: { value: 'Jest' } })
    fireEvent.change(urlInput, { target: { value: 'https://url.com' } })

    await act(async () => {
      fireEvent.submit(form)
    })

    expect(mockHandler.mock.calls).toHaveLength(2)
    expect(mockHandler.mock.calls[1][0].title).toBe('Test from Jest')
    expect(mockHandler.mock.calls[1][0].author).toBe('Jest')
    expect(mockHandler.mock.calls[1][0].url).toBe('https://url.com')
  })

  test('field values update', () => {
    const titleInput = component.container.querySelector('#new-blog-title')
    const authorInput = component.container.querySelector('#new-blog-author')
    const urlInput = component.container.querySelector('#new-blog-url')

    fireEvent.change(titleInput, { target: { value: 'Test from Jest' } })
    fireEvent.change(authorInput, { target: { value: 'Jest' } })
    fireEvent.change(urlInput, { target: { value: 'https://url.com' } })

    expect(titleInput.value).toBe('Test from Jest')
    expect(authorInput.value).toBe('Jest')
    expect(urlInput.value).toBe('https://url.com')
  })
})
