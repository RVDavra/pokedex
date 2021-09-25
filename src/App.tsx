import React from 'react'
import SearchBar from './components/SearchBar'
import classes from './App.module.scss'

const App = () => {
  return (
    <div className={classes.App} data-testid='app'>
      <SearchBar />
    </div>
  )
}

export default App
