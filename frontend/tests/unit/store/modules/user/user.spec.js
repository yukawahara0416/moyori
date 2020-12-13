import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import user from '@/store/modules/user/user.js'
import { cloneDeep } from 'lodash'
import { axiosBase } from '@/plugins/axios.js'
import MockAdapter from 'axios-mock-adapter'

import tab from '@/store/modules/utility/tab.js'

const axiosMock = new MockAdapter(axiosBase)

const localVue = createLocalVue()
localVue.use(Vuex)

let store
let tabStore
let tabMockStore

beforeEach(() => {
  store = new Vuex.Store(cloneDeep(user))
  tabStore = new Vuex.Store(cloneDeep(tab))

  tabMockStore = {
    state: {
      tab: 'posts'
    }
  }
  store.registerModule('tab', cloneDeep(tabMockStore))
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

  it('editUserStore', () => {
    const user = { data: { name: 'test', email: 'test' } }
    const name = 'update'
    const email = 'update'
    store.replaceState({ user: user })
    store.commit('editUserStore', { name, email })
    expect(store.state.user.data.name).toEqual(name)
    expect(store.state.user.data.email).toEqual(email)
  })

  it('editUserAvatarStore', () => {
    const user = { data: { avatar: 'test' } }
    const avatar = 'update'
    store.replaceState({ user: user })
    store.commit('editUserAvatarStore', avatar)
    expect(store.state.user.data.avatar).toEqual(avatar)
  })

  it('clearUserStore', () => {
    const user = { test: 'test' }
    store.replaceState({ user: user })
    store.commit('clearUserStore')
    expect(store.state.user).toMatchObject({})
  })

  it('addDataUserStore', () => {
    const user = {
      data: { id: 1 },
      posts: [
        {
          data: { id: 1, place_id: '123' },
          likes: [{ data: { id: 2 } }]
        }
      ]
    }
    const spot = user.posts[0]
    const data = { data: { id: 3 } }
    const tab = 'posts'
    const prop = 'likes'
    store.replaceState({ user: user })
    store.commit('addDataUserStore', { spot, data, tab, prop })
    expect(store.state.user.posts[0].likes).toHaveLength(2)
  })

  it('deleteDataUserStore', () => {
    const user = {
      data: { id: 1 },
      posts: [
        {
          data: { id: 1, place_id: '123' },
          likes: [{ data: { id: 2 } }]
        }
      ]
    }
    const spot = user.posts[0]
    const data = user.posts[0].likes[0]
    const tab = 'posts'
    const prop = 'likes'
    store.replaceState({ user: user })
    store.commit('deleteDataUserStore', { spot, data, tab, prop })
    expect(store.state.user.posts[0].likes).toHaveLength(0)
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
    const spot = { data: { place_id: 'testPlaceId' } }
    const select = {
      spot: spot,
      type: 'posts'
    }
    store.replaceState({ user: userData })
    store.dispatch('spotlight', select).then(() => {
      expect(store.state.user.posts[0].marker.on).toBe(true)
    })
  })
})
