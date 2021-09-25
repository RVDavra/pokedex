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
          <FormControl variant='standard' sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id='demo-simple-select-standard-label'>
              Page Size
            </InputLabel>
            <Select
              labelId='demo-simple-select-standard-label'
              id='demo-simple-select-standard'
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
