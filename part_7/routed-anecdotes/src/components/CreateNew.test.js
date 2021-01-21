import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import CreateNew from './CreateNew'

let component
describe('<CreateNew />', () => {
  beforeEach(() => {
    component = render(<CreateNew />)
  })
  test('renders', () => {
    const wrapper = component.container.querySelector('.create-new')
    expect(wrapper).toBeDefined()
  })

  test('has three inputs', () => {
    const inputs = component.container.querySelectorAll('input')
    expect(inputs).toHaveLength(3)
  })

  test('can submit', () => {
    const addNew = jest.fn()
    component = render(<CreateNew addNew={addNew} />)
    const submit = component.container.querySelector('[type="submit"]')
    fireEvent.click(submit)
    expect(addNew.mock.calls).toHaveLength(1)
  })

  test('can type', () => {
    const input = component.container.querySelector('input')
    fireEvent.change(input, { target: { value: 'hey' } })
    expect(input.value).toBe('hey')
  })
})
