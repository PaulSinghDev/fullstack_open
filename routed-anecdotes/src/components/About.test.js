import React from 'react'
import { render } from '@testing-library/react'
import About from './About'

describe('<About />', () => {
  test('renders', () => {
    const component = render(<About />)
    const about = component.container.querySelector('.about-section')
    expect(about).toBeDefined()
  })
})
