import React from 'react'
import { render, screen } from '@testing-library/react'
import Pokemon from './Pokemon'

test('Pokemon name is displayed', () => {
  render(
    <Pokemon
      pokemon={{
        name: 'metapod',
        url: 'https://pokeapi.co/api/v2/pokemon/11/'
      }}
    />
  )
  setTimeout(() => {
    const pokemonNameTag = screen.getByText('Metapod')
    expect(pokemonNameTag).toBeInTheDocument()
  }, 1000)
})
