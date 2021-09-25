import React, { useState } from 'react'
import { Button, Paper, TextField } from '@mui/material'
import classes from './SearchBar.module.scss'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../store/useStore'

const SearchBar = observer(() => {
  const store = useStore()
  const [value, setValue] = useState('')

  const onSearchClick = () => {
    store.applySearch(value.toLowerCase())
  }

  const onClearClick = () => {
    setValue('')
    store.applySearch('')
  }

  return (
    <Paper className={classes.SearchBar}>
      <TextField
        className={classes.SearchBarInput}
        data-testid='search-input'
        label='Search only works if you type full name'
        variant='standard'
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
      <Button
        className={classes.SearchBarButton}
        data-testid='search-btn'
        variant='contained'
        onClick={onSearchClick}
      >
        Search
      </Button>
      <Button
        className={classes.SearchBarButton}
        data-testid='search-btn'
        variant='contained'
        onClick={onClearClick}
      >
        Clear
      </Button>
    </Paper>
  )
})

export default SearchBar
