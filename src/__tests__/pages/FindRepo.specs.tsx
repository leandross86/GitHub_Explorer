import { render } from '@testing-library/react'
import React from 'react'
import Home from '../../pages/home/index'

describe('Home app', () => {
  it('Find repo', () => {
    const { debug } = render(<Home />)
    debug()
  })
})