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

  if (error) return <div>failed to load</div>

  if (!data) return <div>loading...</div>

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
            <Typography
              variant='h5'
              textOverflow='ellipsis'
              className={classes.name}
            >
              {pokemon.name}
            </Typography>
            <div>
              <Typography
                textOverflow='ellipsis'
                className={[classes.name, pokemonData.types[0].type.name].join(
                  ' '
                )}
              >
                Type: {pokemonData.types[0].type.name}
              </Typography>
              {pokemonData.types[1] && (
                <Typography
                  textOverflow='ellipsis'
                  className={[classes.name, pokemonData.types[1].type.name].join(
                    ' '
                  )}
                >
                  Sub Type: {pokemonData.types[1].type.name}
                </Typography>
              )}
            </div>
          </Box>
        </Box>
        <Box className={classes.moreInfoContainer}>
          <Button variant='contained'>
            More Info
          </Button>
        </Box>
      </Paper>
    </div>
  )
}

export default Pokemon
