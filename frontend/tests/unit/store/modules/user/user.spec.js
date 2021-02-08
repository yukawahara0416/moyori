import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import user from '@/store/modules/user/user.js'
import cloneDeep from 'lodash/cloneDeep'
import { axiosBase } from '@/plugins/axios.js'
import MockAdapter from 'axios-mock-adapter'

const axiosMock = new MockAdapter(axiosBase)

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

    const name = 'update'
    const email = 'update'
    store.replaceState({ user: user })
    store.commit('updateUserStore', { name, email })
    expect(store.state.user.data.name).toEqual(name)
    expect(store.state.user.data.email).toEqual(email)
  })

  it('clearUserStore', () => {
    const user = { test: 'test' }
    store.replaceState({ user: user })
    store.commit('clearUserStore')
    expect(store.state.user).toMatchObject({})
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
  it('getUser', () => {
    const id = 1
    const response = { state: '200 success', data: { id: 1 } }
    axiosMock.onGet(`/api/v1/users/${id}`).reply(200, response)
    axiosBase.get(`/api/v1/users/${id}`).then(res => {
      expect(res.data.data).toMatchObject(response.data)
    })
  })

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
