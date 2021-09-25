import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './App'
import { Store, storeContext } from './store/store'

ReactDOM.render(
  <React.StrictMode>
    <storeContext.Provider value={Store}>
      <App />
    </storeContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
