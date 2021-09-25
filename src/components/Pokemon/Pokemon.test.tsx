import React from 'react'
import { render, screen } from '@testing-library/react'
import Pokemon from './Pokemon'

test('Pokemon name is displayed', () => {
  render(<Pokemon pokemon={{ name: 'Pickachu', url: 'something' }} />)
  const pokemonNameTag = screen.getByText('Pickachu')
  expect(pokemonNameTag).toBeInTheDocument()
})
