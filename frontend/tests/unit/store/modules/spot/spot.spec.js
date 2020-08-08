import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { cloneDeep } from 'lodash'
import spot from '@/store/modules/spot/spot.js'

const localVue = createLocalVue()
localVue.use(Vuex)

let store

beforeEach(() => {
  store = new Vuex.Store(cloneDeep(spot))
})

describe('getters', () => {
  it('spots', () => {
    const data = [{ marker: { name: 'test' } }]
    store.replaceState({ spots: data })
    expect(store.getters['spots']).toEqual(data)
  })
})

describe('mutations', () => {
  it('addSpots', () => {
    const data = [{ marker: { name: 'test' } }]
    store.commit('addSpots', data)
    expect(store.state.spots).toEqual(data)
  })
  it('clearSpots', () => {
    const data = [{ marker: { name: 'test' } }]
    store.replaceState({ spots: data })
    store.commit('clearSpots')
    expect(store.state.spots).toEqual([])
  })
  it('pushSpot', () => {
    const data = [{ marker: { name: 'test' } }]
    store.commit('pushSpot', data[0])
    expect(store.state.spots).toEqual(data)
  })
  it('assignProp', () => {
    const data = [{ marker: { name: 'test' }, data: { name: '' } }]
    store.replaceState({ spots: data })
    const spot = { marker: { name: 'test' }, data: { name: 'test' } }
    const id = 0
    const prop = 'data'
    store.commit('assignProp', { spot, id, prop })
    expect(store.state.spots[0]).toEqual(spot)
  })
  it('pushData', () => {
    const init = [
      { marker: { name: 'test', place_id: 'testPlaceId' }, likes: [] }
    ]
    const change = [
      {
        marker: { name: 'test', place_id: 'testPlaceId' },
        likes: [{ data: { name: 'test1' } }]
      }
    ]
    store.replaceState({ spots: init })
    const spot = { data: { place_id: 'testPlaceId' } }
    const data = { data: { name: 'test1' } }
    const genre = 'likes'
    store.commit('pushData', { spot, data, genre })
    expect(store.state.spots[0]).toEqual(change[0])
  })
  it('deleteData', () => {
    const init = [
      {
        marker: { name: 'test', place_id: 'testPlaceId' },
        likes: [{ data: { id: 2 } }]
      }
    ]
    const change = [
      { marker: { name: 'test', place_id: 'testPlaceId' }, likes: [] }
    ]
    store.replaceState({ spots: init })
    const spot = { data: { place_id: 'testPlaceId' } }
    const data = { data: { id: 2 } }
    const genre = 'likes'
    store.commit('deleteData', { spot, data, genre })
    expect(store.state.spots[0]).toEqual(change[0])
  })
  it('onSpotlight', () => {
    const spot = { marker: { place_id: 'testPlaceId' } }
    const data = [
      { marker: { place_id: 'testPlaceId', on: false, zIndex: 10 } }
    ]
    store.replaceState({ spots: data })
    store.commit('onSpotlight', spot)
    expect(store.state.spots[0].marker.on).toEqual(true)
    expect(store.state.spots[0].marker.zIndex).toEqual(100)
  })
  it('offSpotlight', () => {
    const init = [
      { marker: { on: true, zIndex: 100 } },
      { marker: { on: false, zIndex: 10 } }
    ]
    const change = [
      { marker: { on: false, zIndex: 10 } },
      { marker: { on: false, zIndex: 10 } }
    ]
    store.replaceState({ spots: init })
    store.commit('offSpotlight')
    expect(store.state.spots).toEqual(change)
  })
})

describe('actions', () => {
  it('addSpots', () => {
    const data = [{ marker: { name: 'test' } }]
    store.dispatch('addSpots', data)
    expect(store.state.spots).toEqual(data)
  })
  it('clearSpots', () => {
    const data = [{ marker: { name: 'test' } }]
    store.replaceState({ spots: data })
    store.dispatch('clearSpots')
    expect(store.state.spots).toEqual([])
  })
  it('spotlight', () => {
    const spot = { marker: { place_id: 'testPlaceId' } }
    const init = [
      { marker: { place_id: 'testPlaceId', on: false, zIndex: 10 } },
      { marker: { on: false, zIndex: 10 } }
    ]
    store.replaceState({ spots: init })
    store.dispatch('spotlight', spot)
    expect(store.state.spots[0].marker.on).toEqual(true)
    expect(store.state.spots[0].marker.zIndex).toEqual(100)
  })
})
