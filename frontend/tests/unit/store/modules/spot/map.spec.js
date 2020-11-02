import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { cloneDeep } from 'lodash'
import map from '@/store/modules/spot/map.js'
import spot from '@/store/modules/spot/spot.js'
import { axiosBase } from '@/plugins/axios.js'
import MockAdapter from 'axios-mock-adapter'
import queryString from 'query-string'

const localVue = createLocalVue()
localVue.use(Vuex)

const axiosMock = new MockAdapter(axiosBase)

let store
let spotStore
let mockStore

beforeEach(() => {
  store = new Vuex.Store(cloneDeep(map))
  spotStore = new Vuex.Store(cloneDeep(spot))
  mockStore = {
    namespaced: true,
    state: {
      spots: () => []
    },

    mutations: {
      addSpotsStore: ({}, arg) => spotStore.commit('addSpotsStore', arg), // eslint-disable-line no-empty-pattern
      updateDataSpotsStore: ({}, arg) =>
        spotStore.commit('updateDataSpotsStore', arg) // eslint-disable-line no-empty-pattern
    }
  }
  store.registerModule('spot', cloneDeep(mockStore))
})

describe('actions', () => {
  it('spot/addSpotsStore', async () => {
    var result = { marker: { name: 'test' } }
    await store.dispatch('addSpotsStore', result)
    expect(spotStore.state.spots[0]).toBe(result)
  })

  // it('saveSpot', async () => {
  //   spotStore.replaceState({
  //     spots: [{ marker: { place_id: 'test' }, data: { place_id: '' } }]
  //   })

  //   const params = { spot: { place_id: 'test' } }
  //   const response = {
  //     marker: { place_id: 'test' },
  //     data: { place_id: 'test' }
  //   }
  //   axiosMock.onPost('/api/v1/spots/save', params).reply(200, response)
  //   axiosBase.post('/api/v1/spots/save', params).then(res => {
  //     store.dispatch('updateDataSpotsStore', {
  //       spot: res.data,
  //       id: 0,
  //       prop: 'data'
  //     })
  //     expect(spotStore.state.spots[0]).toStrictEqual(response)
  //   })
  // })

  it('collateSpot', async () => {
    const spot = { marker: { place_id: 'test' } }
    const query = queryString.stringify({ place_id: spot.marker.place_id })
    const response = {
      marker: spot.marker.place_id,
      data: spot.marker.place_id
    }

    axiosMock.onGet('/api/v1/spots/collate?' + query).reply(200, response)

    const collated = await store.dispatch('collateSpot', spot)
    expect(collated).toEqual(response)
  })

  // it('nearbySearch', () => {})
  // it('textSearch', () => {})
  // it('geolocate', () => {})
})
