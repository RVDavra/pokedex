import React from 'react'
import classes from './Pokemon.module.scss'
import { Box } from '@mui/system'
import { PokeApiResponseData } from '../../model/pokeApiResponse'
import { Typography } from '@mui/material'

interface IPokemonProps {
  pokemon: PokeApiResponseData
}

const Pokemon: React.FC<IPokemonProps> = ({ pokemon }) => {
  return (
    <Box className={classes.Pokemon}>
      <Typography variant='h3'>
        {pokemon.name}
      </Typography>
    </Box>
  )
}

export default Pokemon
