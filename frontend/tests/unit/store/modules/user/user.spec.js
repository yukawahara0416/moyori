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
    const user = { test: 'test' }
    store.replaceState({ user: user })
    expect(store.getters.user).toMatchObject(user)
  })
})

describe('mutations', () => {
  it('setUserStore', () => {
    const user = { test: 'test' }
    store.commit('setUserStore', user)
    expect(store.state.user).toMatchObject(user)
  })

  it('updateUserStore', () => {
    const user = { data: { name: 'test', email: 'test' } }
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
    const user = {
      data: { id: 1 },
      posts: [{ data: { id: 1, place_id: '123', on: false } }]
    }
    const spot = user.posts[0]
    const tab = 'posts'

    store.replaceState({ user: user })
    store.commit('onSpotlight', { spot, tab })
    expect(store.state.user.posts[0].data.on).toBe(true)
    store.commit('offSpotlight', tab)
    expect(store.state.user.posts[0].data.on).toBe(false)
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
    const user = {
      data: { id: 1 },
      posts: [{ data: { id: 1, place_id: '123', on: false } }]
    }
    const spot = user.posts[0]
    const tab = 'posts'

    store.replaceState({ user: user })
    store.dispatch('spotlight', { spot, tab }).then(() => {
      expect(store.state.user.posts[0].data.on).toBe(true)
    })
  })
})
