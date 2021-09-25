import React, { CSSProperties } from 'react'
import classes from './Pokemon.module.scss'
import { Box } from '@mui/system'
import { PokeApiResponseData } from '../../model/pokeApiResponse'
import { Avatar, Button, Paper, Typography } from '@mui/material'
import useSWR from 'swr'
import axios from 'axios'
import { PokemonData } from '../../model/PokemonData'

interface IPokemonProps {
  pokemon: PokeApiResponseData;
  style?: CSSProperties;
}

const Pokemon: React.FC<IPokemonProps> = ({ pokemon, style }) => {
  const { data, error } = useSWR(pokemon.url, axios)

  if (error) {
    return (
      <div className={classes.PokemonContainer} style={style}>
        Failed to load
      </div>
    )
  }

  if (!data) {
    return (
      <div className={classes.PokemonContainer} style={style}>
        Loading...
      </div>
    )
  }

  const pokemonData: PokemonData = data.data

  return (
    <div className={classes.PokemonContainer} style={style}>
      <Paper className={classes.Pokemon} elevation={3}>
        <Avatar
          src={pokemonData.sprites.front_default}
          className={classes.PokeAvatar}
        />
        <Box className={classes.infoContainer}>
          <Box>
            <Typography className={classes.name}>{pokemon.name}</Typography>
            <div className={classes.TypeContainer}>
              {pokemonData.types.map((item) => (
                <Typography
                  key={item.type.url}
                  className={`${classes.type} ${item.type.name}`}
                >
                  {item.type.name}
                </Typography>
              ))}
            </div>
          </Box>
        </Box>
        <Box className={classes.moreInfoContainer}>
          <Button className={classes.moreInfoBtn}>more</Button>
        </Box>
      </Paper>
    </div>
  )
}

export default Pokemon
