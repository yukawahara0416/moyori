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

const spotDataObj = {
  marker: { name: 'test1', place_id: '123', on: false, zIndex: 10 },
  data: { name: 'test1', place_id: '123' },
  likes: []
}

const newData = {
  marker: { name: 'test2', place_id: '456', on: false, zIndex: 10 },
  data: { name: 'test2', place_id: '456' },
  likes: []
}

describe('getters', () => {
  it('spots', () => {
    expect(store.getters['spots']).toEqual([])
    store.replaceState({ spots: [{ ...spotDataObj }] })
    expect(store.getters.spots[0]).toMatchObject(spotDataObj)
  })
})

describe('mutations', () => {
  it('addSpotsStore', () => {
    store.replaceState({ spots: [{ ...spotDataObj }] })
    store.commit('addSpotsStore', newData)
    expect(store.state.spots).toHaveLength(2)
    expect(store.state.spots[1]).toMatchObject(newData)
  })

  it('unshiftSpotsStore', () => {
    store.replaceState({ spots: [{ ...spotDataObj }] })
    store.commit('unshiftSpotsStore', newData)
    expect(store.state.spots).toHaveLength(2)
    expect(store.state.spots[0]).toMatchObject(newData)
  })

  it('clearSpotsStore', () => {
    store.replaceState({ spots: [{ ...spotDataObj }] })
    store.commit('clearSpotsStore')
    expect(store.state.spots).toHaveLength(0)
  })

  it('updateDataSpotsStore', () => {
    store.replaceState({ spots: [{ ...spotDataObj }] })
    const spot = { ...spotDataObj }
    const data = { name: 'test1-update', place_id: '123' }
    const prop = 'data'
    store.commit('updateDataSpotsStore', { spot, data, prop })
    expect(store.state.spots[0].data).toMatchObject({ ...data })
  })

  it('addDataSpotsStore', () => {
    store.replaceState({ spots: [{ ...spotDataObj }] })
    const spot = { ...spotDataObj }
    const data = { spot_id: '123' }
    const prop = 'likes'
    store.commit('addDataSpotsStore', { spot, data, prop })
    expect(store.state.spots[0].likes).toHaveLength(1)
    expect(store.state.spots[0].likes[0]).toMatchObject({ ...data })
  })

  it('deleteDataSpotsStore', () => {
    store.replaceState({ spots: [{ ...spotDataObj }] })
    const spot = { ...spotDataObj }
    const data = { data: { id: 2 } }
    const prop = 'likes'
    store.commit('deleteDataSpotsStore', { spot, data, prop })
    expect(store.state.spots[0].likes).toHaveLength(0)
  })

  it('onSpotlight', () => {
    store.replaceState({ spots: [{ ...spotDataObj }] })
    const spot = { ...spotDataObj }
    store.commit('onSpotlight', spot)
    expect(store.state.spots[0].marker.on).toBeTruthy()
    expect(store.state.spots[0].marker.zIndex).toEqual(100)
  })

  it('offSpotlight', () => {
    const initSpotData = { marker: { on: true, zIndex: 100 } }
    store.replaceState({ spots: [{ ...initSpotData }] })
    store.commit('offSpotlight')
    expect(store.state.spots[0].marker.on).toBeFalsy()
    expect(store.state.spots[0].marker.zIndex).toEqual(10)
  })

  it('setFilterQuery', () => {
    const filter = 'likes'
    store.commit('setFilterQuery', filter)
    expect(store.state.filterQuery).toStrictEqual(filter)
  })
})

describe('actions', () => {
  it('addSpotsStore', () => {
    const data = { ...spotDataObj }
    store.dispatch('addSpotsStore', data)
    expect(store.state.spots).toHaveLength(1)
  })

  it('clearSpotsStore', () => {
    store.replaceState({ spots: [{ ...spotDataObj }] })
    store.dispatch('clearSpotsStore')
    expect(store.state.spots).toHaveLength(0)
  })

  it('spotlight', () => {
    store.replaceState({ spots: [{ ...spotDataObj }] })
    const spot = { ...spotDataObj }
    store.dispatch('spotlight', spot)
    expect(store.state.spots[0].marker.on).toEqual(true)
    expect(store.state.spots[0].marker.zIndex).toEqual(100)
  })
})
