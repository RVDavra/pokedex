import axios from 'axios'
import { makeAutoObservable } from 'mobx'
import { createContext } from 'react'
import { PokeApiResponse, PokeApiResponseData } from '../model/pokeApiResponse'

const API_URL = 'https://pokeapi.co/api/v2/pokemon'
const API_TAG_URL = 'https://pokeapi.co/api/v2/type/'

class StoreFactory {
  currentPageNo: number = 0;
  pageSize: number = 10;
  data: PokeApiResponse | null = null;
  isLoading: boolean = false;
  selectedTag: string = '';
  search: string = '';

  constructor () {
    makeAutoObservable(this)
  }

  changePageSize (newPageSize: number) {
    this.pageSize = newPageSize
    this.fetchData()
  }

  changeTag (tag: string) {
    this.selectedTag = tag
    this.fetchData()
  }

  applySearch (search: string) {
    this.search = search
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
    let url = API_URL
    if (this.search) {
      url = `${API_URL}/${this.search}`
    } else if (this.selectedTag) {
      url = API_TAG_URL + this.selectedTag
    }
    axios.get(url, { params })
      .then(({ data }) => {
        if (this.search) {
          if (data) {
            const response: PokeApiResponse = {
              count: 1,
              results: [{ name: data.name, url }],
              next: '',
              previous: ''
            }
            this.setData(response)
          } else {
            data = null
          }
        } else if (this.selectedTag) {
          const response: PokeApiResponse = {
            count: data.pokemon.length,
            results: data.pokemon.map((item: {pokemon: PokeApiResponseData}) => item.pokemon),
            next: '',
            previous: ''
          }
          this.setData(response)
        } else {
          this.setData(data)
        }
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
