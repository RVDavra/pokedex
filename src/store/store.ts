import axios from 'axios'
import { makeAutoObservable } from 'mobx'
import { createContext } from 'react'

const API_URL = 'https://pokeapi.co/api/v2/pokemon'

const promiseAfterOneSec = (): Promise<string> => {
  return new Promise<string>((resolve) => {
    setTimeout(() => {
      console.log('after 1 sec')
      resolve('done')
    }, 1000)
  })
}

class StoreFactory {
  currentPageNo: number = 0;
  pageSize: number = 10;
  data = {};
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

  prev () {
    this.currentPageNo--
    this.fetchData()
  }

  next () {
    this.currentPageNo++
    this.fetchData()
  }

  loadingStart () {
    this.isLoading = true
  }

  loaded () {
    this.isLoading = false
  }

  fetchData () {
    this.loadingStart()
    const params = {
      limit: this.pageSize,
      offset: this.pageSize * this.currentPageNo
    }
    axios.get(API_URL, { params })
      .then(({ data }) => {
        this.data = data
        console.log(data)
        promiseAfterOneSec()
          .then(() => {
            console.log('done')
            this.loaded()
          })
      })
  }
}

export const Store = new StoreFactory()

export const storeContext = createContext(Store)
