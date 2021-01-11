import React from 'react'
import { render } from '@testing-library/react'
import Footer from './Footer'

describe('<Footer />', () => {
  test('renders', () => {
    const component = render(<Footer />)
    const footer = component.container.querySelector('.main-footer')
    expect(footer).toBeDefined()
  })
})
