import React from 'react'
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { AutoSizer, List } from 'react-virtualized'
import classes from './Layout.module.scss'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../store/useStore'
import { Box } from '@mui/system'
import Pokemon from '../Pokemon'
import { PokeApiResponseData } from '../../model/pokeApiResponse'

const Layout = observer(() => {
  const store = useStore()
  const rowCount = store.data?.results.length || 0
  const pokemonData: PokeApiResponseData[] = store.data?.results || []

  const pokemonLayout = store.data && (
    <AutoSizer>
      {({ height, width }) => (
        <List
          rowCount={rowCount}
          height={height}
          rowHeight={({ index }) => 140}
          rowRenderer={({ index, key, style }) => (
            <Pokemon style={style} key={key} pokemon={pokemonData[index]} />
          )}
          width={width}
        />
      )}
    </AutoSizer>
  )

  return (
    <Box className={classes.Layout}>
      <Box className={classes.PaginationContainer}>
        <Button
          variant='contained'
          className={classes.prev}
          data-testid='prev'
          disabled={!store.isPrevPageAvailable}
          onClick={() => store.prev()}
        >
          Prev
        </Button>
        <Box>
          <FormControl variant='filled' sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id='page-size-input'>
              Page Size
            </InputLabel>
            <Select
              disabled={!!store.selectedTag}
              labelId='page-size-input'
              id='page-size-input-select'
              value={store.pageSize}
              onChange={(event) => store.changePageSize(+event.target.value)}
              label='Page Size'
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box>
          <FormControl variant='filled' sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id='type-input'>
              Type
            </InputLabel>
            <Select
              labelId='type-input'
              id='type-input-select'
              value={store.selectedTag}
              onChange={(event) => store.changeTag(event.target.value.toString())}
              label='Type'
            >
              {POKEMON_TYPES.map((item) => (
                <MenuItem key={item || '0'} value={item || ''}> {item} </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Button
          variant='contained'
          className={classes.next}
          data-testid='next'
          disabled={!store.isNextPageAvailable}
          onClick={() => store.next()}
        >
          Next
        </Button>
      </Box>
      {pokemonLayout}
    </Box>
  )
})

export default Layout

const POKEMON_TYPES = [
  '',
  'normal',
  'fighting',
  'flying',
  'poison',
  'ground',
  'rock',
  'bug',
  'ghost',
  'steel',
  'fire',
  'water',
  'grass',
  'electric',
  'psychic',
  'ice',
  'dragon',
  'dark',
  'fairy',
  'unknown',
  'shadow'
]
