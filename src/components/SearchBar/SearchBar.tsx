import React from 'react'
import { Button, Paper, TextField } from '@mui/material'
import classes from './SearchBar.module.scss'

const SearchBar = () => {
  return (
    <Paper className={classes.SearchBar}>
      <TextField className={classes.SearchBarInput} data-testid='search-input' label='Search' variant='standard' />
      <Button className={classes.SearchBarButton} data-testid='search-btn' variant='contained'>Search</Button>
    </Paper>
  )
}

export default SearchBar
