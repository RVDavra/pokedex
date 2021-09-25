import React from 'react'
import { render, screen } from '@testing-library/react'
import PokemonModal from '.'

test('Pokemon name is displayed', () => {
  render(
    <PokemonModal open handleClose={() => {}} data={JSON.parse(JSON.stringify(DATA))} />
  )
  setTimeout(() => {
    const pokemonNameTag = screen.getByText('Squirtle')
    expect(pokemonNameTag).toBeInTheDocument()
  }, 1000)
})

const DATA = {
  base_experience: 63,

  height: 5,
  held_items: [],
  id: 7,
  is_default: true,
  location_area_encounters: 'https://pokeapi.co/api/v2/pokemon/7/encounters',
  name: 'squirtle',
  order: 10,
  past_types: [],
  species: {
    name: 'squirtle',
    url: 'https://pokeapi.co/api/v2/pokemon-species/7/'
  },
  stats: [
    {
      base_stat: 44,
      effort: 0,
      stat: {
        name: 'hp',
        url: 'https://pokeapi.co/api/v2/stat/1/'
      }
    },
    {
      base_stat: 48,
      effort: 0,
      stat: {
        name: 'attack',
        url: 'https://pokeapi.co/api/v2/stat/2/'
      }
    },
    {
      base_stat: 65,
      effort: 1,
      stat: {
        name: 'defense',
        url: 'https://pokeapi.co/api/v2/stat/3/'
      }
    },
    {
      base_stat: 50,
      effort: 0,
      stat: {
        name: 'special-attack',
        url: 'https://pokeapi.co/api/v2/stat/4/'
      }
    },
    {
      base_stat: 64,
      effort: 0,
      stat: {
        name: 'special-defense',
        url: 'https://pokeapi.co/api/v2/stat/5/'
      }
    },
    {
      base_stat: 43,
      effort: 0,
      stat: {
        name: 'speed',
        url: 'https://pokeapi.co/api/v2/stat/6/'
      }
    }
  ],
  types: [
    {
      slot: 1,
      type: {
        name: 'water',
        url: 'https://pokeapi.co/api/v2/type/11/'
      }
    }
  ],
  weight: 90
}
