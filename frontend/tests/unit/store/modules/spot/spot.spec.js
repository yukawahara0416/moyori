import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import spot from '@/store/modules/spot/spot.js'
import { axiosBase } from '@/plugins/axios.js'
import MockAdapter from 'axios-mock-adapter'
import cloneDeep from 'lodash/cloneDeep'

const axiosMock = new MockAdapter(axiosBase)

const localVue = createLocalVue()
localVue.use(Vuex)

let store

beforeEach(() => {
  store = new Vuex.Store(cloneDeep(spot))
})

const radius = { name: 'test', value: 1000 }
const type = { name: 'test', value: 'test' }
const filterQuery = 'likes'

describe('getters', () => {
  const spot = { data: {}, likes: [{ test: 'test' }] }

  it('spots', () => {
    store.replaceState({ spots: [spot] })
    expect(store.getters.spots[0]).toMatchObject(spot)
  })

  it('radius', () => {
    store.replaceState({ radius: radius })
    expect(store.getters.radius).toMatchObject(radius)
  })

  it('type', () => {
    store.replaceState({ type: type })
    expect(store.getters.type).toMatchObject(type)
  })

  it('filterQuery', () => {
    store.replaceState({ filterQuery: [filterQuery] })
    expect(store.getters.filterQuery[0]).toEqual(filterQuery)
  })

  it('filteredSpots', () => {
    const like = { id: 2 }
    const hasLikeSpot = spot
    hasLikeSpot['likes'] = [like]

    store.replaceState({ spots: [hasLikeSpot], filterQuery: [filterQuery] })
    expect(store.getters.filteredSpots).toEqual([hasLikeSpot])
  })
})

describe('mutations', () => {
  const spot = {
    data: { place_id: '123', name: 'test', on: false, zIndex: 10 },
    likes: []
  }
  const like = { id: 2 }
  const prop = 'likes'

  it('addSpotsStore', () => {
    store.commit('addSpotsStore', [spot])
    expect(store.state.spots).toHaveLength(1)
    expect(store.state.spots[0]).toMatchObject(spot)
  })

  it('unshiftSpotsStore', () => {
    const newSpot = { test: 'test2' }
    store.commit('addSpotsStore', [spot])
    store.commit('unshiftSpotsStore', newSpot)
    expect(store.state.spots).toHaveLength(2)
    expect(store.state.spots[0]).toMatchObject(newSpot)
  })

  it('clearSpotsStore', () => {
    store.replaceState({ spots: [spot] })
    store.commit('clearSpotsStore')
    expect(store.state.spots).toHaveLength(0)
  })

  it('addDataSpotsStore', () => {
    store.replaceState({ spots: [spot] })
    store.commit('addDataSpotsStore', { spot, data: like, prop })
    expect(store.state.spots[0].likes).toHaveLength(1)
    expect(store.state.spots[0].likes[0]).toMatchObject(like)
  })

  it('deleteSpot', () => {
    const spot_id = 123
    const spot = { data: { id: spot_id } }

    store.replaceState({ spots: [spot] })
    store.commit('deleteSpot', spot_id)
    expect(store.state.spots).toHaveLength(0)
  })
    expect(store.state.spots[0].likes).toHaveLength(0)
  })

  it('updateDataSpotsStore', () => {
    store.replaceState({ spots: [spot] })
    const updateData = { data: { name: 'test1-update', place_id: '123' } }
    store.commit('updateDataSpotsStore', { spot, data: updateData })
    expect(store.state.spots[0].data).toMatchObject(updateData.data)
  })

  it('setRadius', () => {
    store.commit('setRadius', radius)
    expect(store.state.radius).toMatchObject(radius)
  })

  it('setType', () => {
    store.commit('setType', type)
    expect(store.state.type).toMatchObject(type)
  })

  it('setFilterQuery', () => {
    const filter = 'likes'
    store.commit('setFilterQuery', filter)
    expect(store.state.filterQuery).toStrictEqual(filter)
  })

  it('onSpotlight, offSpotlight', () => {
    const place_id = '1234567890test'
    const spot = { data: { place_id, on: false, zIndex: 10 } }

    store.replaceState({ spots: [spot] })
    store.commit('onSpotlight', place_id)
    expect(store.state.spots[0].data.on).toBeTruthy()
    expect(store.state.spots[0].data.zIndex).toEqual(100)
    store.commit('offSpotlight')
    expect(store.state.spots[0].data.on).toBeFalsy()
    expect(store.state.spots[0].data.zIndex).toEqual(10)
  })
})

describe('actions', () => {
  const spot = { data: { id: 1, place_id: '123', on: false, zIndex: 10 } }
  const params = { place_id: '123' }
  const response = { data: { place_id: '123' } }
  const headers = { test: 'test' }

  it('postSpot', () => {
    axiosMock.onPost('/api/v1/spots', params).reply(200, response)

    return store.dispatch('postSpot', { params, headers }).then(res => {
      expect(res.data.place_id).toEqual(response.data.place_id)
    })
  })

  it('updateSpot', () => {
    axiosMock
      .onPatch(`/api/v1/spots/${spot.data.id}`, params)
      .reply(200, response)

    return store.dispatch('updateSpot', { spot, params, headers }).then(res => {
      expect(res.data.data.place_id).toEqual(response.data.place_id)
    })
  })

  it('spotlight', () => {
    const place_id = '1234567890test'
    const spot = { data: { place_id, on: false, zIndex: 10 } }

    store.replaceState({ spots: [spot] })
    store.dispatch('spotlight', place_id)
    expect(store.state.spots[0].data.zIndex).toEqual(100)
  })
})
