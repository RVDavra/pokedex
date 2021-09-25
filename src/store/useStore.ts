import { useContext } from 'react'
import { storeContext } from './store'

export const useStore = () => useContext(storeContext)
