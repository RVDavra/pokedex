import React from 'react'
import { Button, Paper } from '@mui/material'
import classes from './Layout.module.scss'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../store/useStore'
import { Box } from '@mui/system'

const Layout = observer(() => {
  const store = useStore()

  const pokemonLayout = store.data && (
    <Box>
      {store.data?.results.map((item) => (
        <Box key={item.url}>{item.name}</Box>
      ))}
    </Box>
  )

  return (
    <Paper className={classes.Layout}>
      {pokemonLayout}
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
          <Button
            variant='contained'
            className={classes.pageBtn}
            onClick={() => store.changePageSize(10)}
          >
            10
          </Button>
          <Button
            variant='contained'
            className={classes.pageBtn}
            onClick={() => store.changePageSize(20)}
          >
            20
          </Button>
          <Button
            variant='contained'
            className={classes.pageBtn}
            onClick={() => store.changePageSize(50)}
          >
            50
          </Button>
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
    </Paper>
  )
})

export default Layout
