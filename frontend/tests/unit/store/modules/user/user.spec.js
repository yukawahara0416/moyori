import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import user from '@/store/modules/user/user.js'
import cloneDeep from 'lodash/cloneDeep'

const localVue = createLocalVue()
localVue.use(Vuex)

let store

beforeEach(() => {
  store = new Vuex.Store(cloneDeep(user))
})

describe('getters', () => {
  it('user', () => {
    const user = { data: { id: 1 } }
    store.replaceState({ user })
    expect(store.getters.user).toMatchObject(user)
  })
})

describe('mutations', () => {
  it('setUser', () => {
    const user = { data: { id: 1 } }
    store.commit('setUser', user)
    expect(store.state.user).toMatchObject(user)
  })

  it('clearUser', () => {
    const user = { data: { id: 1 } }
    const result = {}
    store.replaceState({ user })
    store.commit('clearUser')
    expect(store.state.user).toMatchObject(result)
  })

  it('addSpot', () => {
    const user = { data: { id: 1 }, likes: [] }
    const spot = { data: { id: 1 } }
    const prop = 'likes'
    store.replaceState({ user })
    store.commit('addSpot', { spot, prop })
    expect(store.state.user.likes).toHaveLength(1)
    expect(store.state.user.likes[0]).toMatchObject(spot)
  })

  it('addSpotReverse', () => {
    const vote_id = 1
    const vote = { id: vote_id }
    const spot = { wifi_withs: [vote], wifi_withouts: [] }
    const user = { wifi_withs: [spot], wifi_withouts: [] }
    const prop = 'wifi_withouts'
    store.replaceState({ user })
    store.commit('addSpotReverse', { spot, prop, vote_id })
    expect(store.state.user.wifi_withs[0].wifi_withs).toHaveLength(0)
    expect(store.state.user.wifi_withouts).toHaveLength(1)
  })

  it('addVote', () => {
    const vote = { id: 1 }
    const prop = 'likes'
    const place_id = '1234567890test'

    const spot = { data: { place_id }, likes: [] }
    const clone = cloneDeep(spot)
    const user = { wifi_withs: [spot], power_withs: [clone] }

    store.replaceState({ user })
    store.commit('addVote', { vote, prop, place_id })
    expect(store.state.user.wifi_withs[0].likes).toHaveLength(1)
    expect(store.state.user.power_withs[0].likes).toHaveLength(1)
  })

  it('deleteSpotOneProperty', () => {
    const spot_id = 1
    const spot = { data: { id: spot_id } }
    const prop = 'likes'
    const user = { likes: [spot] }
    store.replaceState({ user })
    store.commit('deleteSpotOneProperty', { spot_id, prop })
    expect(store.state.user.likes).toHaveLength(0)
  })

  it('deleteSpotAllProperty', () => {
    const spot_id = 1
    const spot = { data: { id: spot_id } }
    const clone = cloneDeep(spot)
    const user = { likes: [spot], wifi_withs: [clone] }

    store.replaceState({ user })
    store.commit('deleteSpotAllProperty', spot_id)
    expect(store.state.user.likes).toHaveLength(0)
    expect(store.state.user.wifi_withs).toHaveLength(0)
  })

  it('deleteVote', () => {
    const vote_id = 1
    const vote = { id: vote_id }
    const place_id = '1234567890test'
    const spot = { data: { place_id }, likes: [vote] }
    const clone = cloneDeep(spot)
    const prop = 'likes'
    const user = { wifi_withs: [spot], power_withs: [clone] }

    store.replaceState({ user })
    store.commit('deleteVote', { vote_id, place_id, prop })
    expect(store.state.user.wifi_withs[0].likes).toHaveLength(0)
    expect(store.state.user.power_withs[0].likes).toHaveLength(0)
  })

  it('updateUser', () => {
    const user = { data: { name: 'before', email: 'before' } }
    const name = 'update'
    const email = 'update'

    store.replaceState({ user })
    store.commit('updateUser', { name, email })
    expect(store.state.user.data.name).toEqual(name)
    expect(store.state.user.data.email).toEqual(email)
  })

  it('updateSpot isMyPage', () => {
    const place_id = '1234567890test'
    const spot = { data: { place_id, name: 'before' } }
    const clone = cloneDeep(spot)
    const updated = { data: { name: 'updated', phone: '123' } }
    const user = { likes: [spot], wifi_withs: [clone] }
    const tab = 'likes'
    const isMyPage = true

    store.replaceState({ user })
    store.commit('updateSpot', { place_id, updated, tab, isMyPage })
    expect(store.state.user.likes[0]).toMatchObject(updated)
    expect(store.state.user.wifi_withs[0]).toMatchObject(updated)
  })

  it('updateSpot is not MyPage', () => {
    const place_id = '1234567890test'
    const spot = { data: { place_id, name: 'before' } }
    const clone = cloneDeep(spot)
    const updated = { data: { name: 'updated', phone: '123' } }
    const user = { likes: [spot], wifi_withs: [clone] }
    const tab = 'likes'
    const isMyPage = false

    store.replaceState({ user })
    store.commit('updateSpot', { place_id, updated, tab, isMyPage })
    expect(store.state.user.likes[0]).toMatchObject(updated)
    expect(store.state.user.wifi_withs[0]).toMatchObject(clone)
  })

  it('onSpotlight, offSpotlight', () => {
    const place_id = '1234567890test'
    const tab = 'likes'
    const spot = { data: { place_id, on: false } }
    const user = { likes: [spot] }

    store.replaceState({ user })
    store.commit('onSpotlight', { place_id, tab })
    expect(store.state.user.likes[0].data.on).toBeTruthy()
    store.commit('offSpotlight', tab)
    expect(store.state.user.likes[0].data.on).toBeFalsy()
  })
})

describe('actions', () => {
  it('spotlight', () => {
    const place_id = '1234567890test'
    const tab = 'likes'
    const spot = { data: { place_id, on: false } }
    const user = { likes: [spot] }

    store.replaceState({ user })
    store.dispatch('spotlight', { place_id, tab })
    expect(store.state.user.likes[0].data.on).toBeTruthy()
  })
})
