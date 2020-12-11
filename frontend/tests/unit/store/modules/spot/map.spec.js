import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { cloneDeep } from 'lodash'
// import { axiosBase } from '@/plugins/axios.js'
// import MockAdapter from 'axios-mock-adapter'
import map from '@/store/modules/spot/map.js'
// import auth from '@/store/modules/user/auth.js'
// import queryString from 'query-string'

// const axiosMock = new MockAdapter(axiosBase)

const localVue = createLocalVue()
localVue.use(Vuex)

let store
// let authStore
// let authMockStore

beforeEach(() => {
  store = new Vuex.Store(cloneDeep(map))
  // authStore = new Vuex.Store(cloneDeep(auth))

  // authMockStore = {
  //   state: {
  //     headers: {
  //       'access-token': 'test',
  //       'client': 'test',
  //       'content-type': 'test',
  //       'uid': 'test'
  //     }
  //   }
  // }
  // store.registerModule('auth', cloneDeep(authMockStore))
})

describe('getters', () => {
  it('map', () => {
    store.replaceState({ map: 'mapObject' })
    expect(store.getters['map']).toEqual('mapObject')
  })

  it('google', () => {
    store.replaceState({ google: 'googleObject' })
    expect(store.getters['google']).toEqual('googleObject')
  })
})

// describe('actions', () => {
//   const spot = { marker: { place_id: 'test' } }
//   const response = { state: '200 success', data: { id: 1 } }

//   it('saveSpot', () => {
//     axiosMock
//       .onPost('/api/v1/spots/save', {
//         spot: { place_id: spot.marker.place_id }
//       })
//       .reply(200, response)

//     return store.dispatch('saveSpot', spot).then(res => {
//       expect(res.state).toEqual(response.state)
//     })
//   })

//   it('collateSpot', async () => {
//     const query = queryString.stringify({ place_id: spot.marker.place_id })
//     axiosMock.onGet('/api/v1/spots/collate?' + query).reply(200, response)

//     return store.dispatch('collateSpot', spot).then(res => {
//       expect(res.state).toEqual(response.state)
//     })
//   })
// })
