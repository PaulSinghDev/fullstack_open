import React from 'react'
import { render } from '@testing-library/react'
import Country from './Country'

describe('<Country />', () => {
  test('renders', () => {
    const component = render(<Country />)
    const wrapper = component.container.querySelector('.country-info')
    expect(wrapper).toBeDefined()
  })
})
