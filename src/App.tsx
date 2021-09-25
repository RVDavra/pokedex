import React, { useEffect } from 'react'
import SearchBar from './components/SearchBar'
import classes from './App.module.scss'
import { observer } from 'mobx-react-lite'
import { useStore } from './store/useStore'
import { Backdrop, CircularProgress } from '@mui/material'

const App = observer(() => {
  const store = useStore()

  useEffect(() => {
    store.fetchData()
  }, [])

  return (
    <div className={classes.App} data-testid='app'>
      <Backdrop
        sx={{ color: '#fff', zIndex: 1 }}
        open={store.isLoading}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
      <SearchBar />
    </div>
  )
})

export default App
