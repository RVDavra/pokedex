import React from 'react'
import { render, screen } from '@testing-library/react'
import SearchBar from './SearchBar'

test('SearchBar has search input', () => {
  render(<SearchBar />)
  const searchInput = screen.getByTestId('search-input')
  expect(searchInput).toBeInTheDocument()
})

test('SearchBar has search button', () => {
  render(<SearchBar />)
  const searchBtn = screen.getByTestId('search-btn')
  expect(searchBtn).toBeInTheDocument()
})
