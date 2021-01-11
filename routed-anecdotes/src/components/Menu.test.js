import React from 'react'
import { render } from '@testing-library/react'
import Menu from './Menu'
import { BrowserRouter as Router } from 'react-router-dom'

describe('<Menu />', () => {
  test('renders', () => {
    const component = render(
      <Router>
        <Menu />
      </Router>
    )
    const menu = component.container.querySelector('.main-menu')
    expect(menu).toBeDefined()
  })
})
