import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { cloneDeep } from 'lodash'
import post from '@/store/modules/spot/post.js'
import spot from '@/store/modules/spot/spot.js'
import { axiosBase } from '@/plugins/axios.js'
import MockAdapter from 'axios-mock-adapter'

const localVue = createLocalVue()
localVue.use(Vuex)

const axiosMock = new MockAdapter(axiosBase)

let store
let spotStore
let mockStore

const blank = {
  address: '',
  name: '',
  image: '',
  place_id: '',
  lat: '',
  lng: '',
  url: ''
}

const data = {
  address: 'test',
  name: 'test',
  image: 'test',
  place_id: 'test',
  lat: 'test',
  lng: 'test',
  url: 'test'
}

beforeEach(() => {
  store = new Vuex.Store(cloneDeep(post))
  spotStore = new Vuex.Store(cloneDeep(spot))
  mockStore = {
    namespaced: true,
    state: {
      spots: () => []
    },
    mutations: {
      addSpotsStore: ({}, arg) => spotStore.commit('addSpotsStore', arg), // eslint-disable-line no-empty-pattern
      unshiftSpotsStore: ({}, arg) => spotStore.commit('unshiftSpotsStore', arg) // eslint-disable-line no-empty-pattern
    }
  }
  store.registerModule('spot', cloneDeep(mockStore))
})

describe('getters', () => {
  it('spotFormData', () => {
    store.replaceState({ spotFormData: data })
    expect(store.getters['spotFormData']).toEqual(data)
  })
})

describe('mutations', () => {
  it('assignSpotFormData', () => {
    store.commit('assignSpotFormData', data)
    expect(store.state.spotFormData).toStrictEqual(data)
  })
  it('clearSpotFormData', () => {
    store.replaceState({ spotFormData: data })
    store.commit('clearSpotFormData')
    expect(store.state.spotFormData).toStrictEqual(blank)
  })
})

describe('actions', () => {
  it('spot/addSpotsStore', () => {
    const result = { marker: { name: 'test' } }
    store.dispatch('addSpotsStore', result)
    expect(spotStore.state.spots[0]).toBe(result)
  })
  it('spot/unshiftSpotsStore', () => {
    const result = { marker: { name: 'test' } }
    store.dispatch('unshiftSpotsStore', result)
    expect(spotStore.state.spots[0]).toBe(result)
  })
  it('clearSpotFormData', () => {
    store.replaceState({ spotFormData: data })
    store.dispatch('clearSpotFormData')
    expect(store.state.spotFormData).toStrictEqual(blank)
  })
  it('nearbySearch', () => {
    const params = { lat: 12.345678, lng: 113.45678 }
    const response = { data: { name: 'test' } }
    axiosMock.onGet('/api/v1/spots/nearby', params).reply(200, response)
    axiosBase.get('/api/v1/spots/nearby', params).then(res => {
      expect(res.data).toStrictEqual(response)
    })
  })
  it('postSpot', () => {
    const params = { spot: { place_id: 'test' } }
    const response = {
      marker: { place_id: 'test' },
      data: { place_id: 'test' }
    }
    axiosMock.onPost('/api/v1/spots', params).reply(200, response)
    axiosBase.post('/api/v1/spots', params).then(res => {
      expect(res.data).toStrictEqual(response)
    })
  })
  // it('geocode', () => {})
  // it('placeIdGenerate', () => {})
})
