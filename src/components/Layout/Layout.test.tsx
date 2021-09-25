import React from 'react'
import { render, screen } from '@testing-library/react'
import Layout from './Layout'

test('Layout has prev button disabled', () => {
  render(<Layout />)
  const prevBtn = screen.getByTestId('prev')
  expect(prevBtn).toBeDisabled()
})

test('Layout has next button', () => {
  render(<Layout />)
  const nextBtn = screen.getByTestId('next')
  expect(nextBtn).toBeInTheDocument()
})
