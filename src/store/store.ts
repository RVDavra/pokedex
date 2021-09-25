import axios from 'axios'
import { makeAutoObservable } from 'mobx'
import { createContext } from 'react'
import { PokeApiResponse } from '../model/pokeApiResponse'

const API_URL = 'https://pokeapi.co/api/v2/pokemon'

class StoreFactory {
  currentPageNo: number = 0;
  pageSize: number = 10;
  data: PokeApiResponse | null = null;
  isLoading: boolean = false;

  constructor () {
    // makeObservable(this, {
    //   changePageSize: action,
    //   prev: action,
    //   next: action,
    //   fetchData: action
    // })
    makeAutoObservable(this)
  }

  changePageSize (newPageSize: number) {
    this.pageSize = newPageSize
    this.fetchData()
  }

  get isPrevPageAvailable () {
    return !!(this.data && this.data.previous)
  }

  prev () {
    if (this.isPrevPageAvailable) {
      this.currentPageNo--
      this.fetchData()
    }
  }

  get isNextPageAvailable () {
    return !!(this.data && this.data.next)
  }

  next () {
    if (this.isNextPageAvailable) {
      this.currentPageNo++
      this.fetchData()
    }
  }

  startLoading () {
    this.isLoading = true
  }

  stopLoading () {
    this.isLoading = false
  }

  setData (data: PokeApiResponse | null) {
    this.data = data
  }

  fetchData () {
    this.startLoading()
    const params = {
      limit: this.pageSize,
      offset: this.pageSize * this.currentPageNo
    }
    axios.get(API_URL, { params })
      .then(({ data }) => {
        this.setData(data)
      })
      .catch((err) => {
        this.setData(null)
        console.error(err)
      })
      .finally(() => this.stopLoading())
  }
}

export const Store = new StoreFactory()

export const storeContext = createContext(Store)
