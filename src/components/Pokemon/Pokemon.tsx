import React, { CSSProperties } from 'react'
import classes from './Pokemon.module.scss'
import { Box } from '@mui/system'
import { PokeApiResponseData } from '../../model/pokeApiResponse'
import { Avatar, Paper, Typography } from '@mui/material'
import useSWR from 'swr'
import axios from 'axios'
import { PokemonData } from '../../model/PokemonData'

interface IPokemonProps {
  pokemon: PokeApiResponseData;
  style?: CSSProperties;
}

const Pokemon: React.FC<IPokemonProps> = ({ pokemon, style }) => {
  const { data, error } = useSWR(pokemon.url, axios)

  if (error) return <div>failed to load</div>

  if (!data) return <div>loading...</div>

  const pokemonData: PokemonData = data.data
  console.log(pokemonData)

  return (
    <Paper className={classes.Pokemon} style={style}>
      <Avatar src={pokemonData.sprites.front_default} className={classes.PokeAvatar} />
      <Box className={classes.infoContainer}>
        <Box>
          <Typography variant='h5'>
            {pokemon.name}
          </Typography>
        </Box>
      </Box>
    </Paper>
  )
}

export default Pokemon
