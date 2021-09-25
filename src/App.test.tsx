import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

test('App has Done', () => {
  render(<App />)
  const linkElement = screen.getByText(/Done/i)
  expect(linkElement).toBeInTheDocument()
})
