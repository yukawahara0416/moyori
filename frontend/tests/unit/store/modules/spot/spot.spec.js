import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import spot from '@/store/modules/spot/spot.js'
import cloneDeep from 'lodash/cloneDeep'

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

  it('setSpots', () => {
    const spot = { data: { id: 1 } }
    store.commit('setSpots', [spot])
    expect(store.state.spots).toHaveLength(1)
    expect(store.state.spots[0]).toMatchObject(spot)
  })

  it('clearSpots', () => {
    const spot = { data: { id: 1 } }
    store.replaceState({ spots: [spot] })
    store.commit('clearSpots')
    expect(store.state.spots).toHaveLength(0)
  })

  it('addSpot', () => {
    const spot = { data: { id: 1 } }
    const newSpot = { data: { id: 2 } }
    store.replaceState({ spots: [spot] })
    store.commit('addSpot', newSpot)
    expect(store.state.spots).toHaveLength(2)
    expect(store.state.spots[0]).toMatchObject(newSpot)
  })

  it('addVote', () => {
    const vote = { id: 111 }
    const prop = 'likes'
    const place_id = '1234567890test'

    const spot = { data: { place_id }, likes: [] }

    store.replaceState({ spots: [spot] })
    store.commit('addVote', { vote, prop, place_id })
    expect(store.state.spots[0].likes).toHaveLength(1)
    expect(store.state.spots[0].likes[0]).toMatchObject(vote)
  })

  it('deleteSpot', () => {
    const spot_id = 123
    const spot = { data: { id: spot_id } }

    store.replaceState({ spots: [spot] })
    store.commit('deleteSpot', spot_id)
    expect(store.state.spots).toHaveLength(0)
  })

  it('deleteVote', () => {
    const vote_id = 111
    const place_id = '1234567890test'
    const prop = 'likes'
    const spot = { data: { place_id }, likes: [{ id: vote_id }] }

    store.replaceState({ spots: [spot] })
    store.commit('deleteVote', { vote_id, place_id, prop })
    expect(store.state.spots[0].likes).toHaveLength(0)
  })

  it('updateSpot', () => {
    const place_id = '1234567890test'
    const spot = { data: { place_id, name: 'before' } }
    const updated = { data: { place_id, name: 'after', phone: '123' } }

    store.replaceState({ spots: [spot] })
    store.commit('updateSpot', { place_id, updated })
    expect(store.state.spots[0]).toMatchObject(updated)
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

  it('spotlight', () => {
    const place_id = '1234567890test'
    const spot = { data: { place_id, on: false, zIndex: 10 } }

    store.replaceState({ spots: [spot] })
    store.dispatch('spotlight', place_id)
    expect(store.state.spots[0].data.on).toBeTruthy()
    expect(store.state.spots[0].data.zIndex).toEqual(100)
  })
})
