import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { cloneDeep } from 'lodash'
import user from '@/store/modules/user/user.js'
import { axiosBase } from '@/plugins/axios.js'
import MockAdapter from 'axios-mock-adapter'

const localVue = createLocalVue()
localVue.use(Vuex)

const axiosMock = new MockAdapter(axiosBase)

let store
let data

beforeEach(() => {
  store = new Vuex.Store(cloneDeep(user))

  data = {
    data: { id: 1 },
    posts: [
      { data: { id: 1 }, marker: { on: false }, likes: [{ data: { id: 2 } }] }
    ]
  }
})

describe('getters', () => {
  it('user', () => {
    store.replaceState({ user: data })
    expect(store.getters['user']).toEqual(data)
  })
})

describe('mutations', () => {
  it('setUser', () => {
    store.commit('setUser', data)
    expect(store.state.user).toEqual(data)
  })
  it('clearUser', () => {
    store.replaceState({ user: data })
    store.commit('clearUser')
    expect(store.state.user).toEqual({})
  })

  it('addUserData', () => {
    const newData = {
      data: { data: { id: 2 } },
      id: 0,
      type: 'posts',
      genre: 'likes'
    }
    store.replaceState({ user: data })
    store.commit('addUserData', newData)
    expect(store.state.user.posts[0].likes.length).toEqual(2)
  })

  it('deleteUserData', () => {
    const unnecessaryData = {
      data: { data: { id: 2 } },
      id: 0,
      type: 'posts',
      genre: 'likes'
    }
    store.replaceState({ user: data })
    store.commit('deleteUserData', unnecessaryData)
    expect(store.state.user.posts[0].likes.length).toEqual(0)
  })

  it('onSpotlight', () => {
    const select = {
      id: 0,
      type: 'posts'
    }
    store.replaceState({ user: data })
    store.commit('onSpotlight', select)
    expect(store.state.user.posts[0].marker.on).toBe(true)
  })

  it('offSpotlight', () => {
    data.posts[0].marker.on = true
    store.replaceState({ user: data })
    const type = 'posts'
    store.commit('offSpotlight', type)
    expect(store.state.user.posts[0].marker.on).toBe(false)
  })
})

describe('actions', () => {
  it('setUser', () => {
    store.dispatch('setUser', data).then(() => {
      expect(store.state.user).toEqual(data)
    })
  })

  it('getUser', () => {
    const id = 1
    axiosMock.onGet('/api/v1/users/' + id).reply(200, data)
    axiosBase.get('/api/v1/users/1').then(res => {
      expect(res.data).toEqual(data)
    })
  })

  it('clearUser', () => {
    store.dispatch('clearUser').then(() => {
      expect(store.state.user).toEqual({})
    })
  })

  it('spotlight', () => {
    const select = {
      id: 0,
      type: 'posts'
    }
    store.replaceState({ user: data })
    store.dispatch('spotlight', select).then(res => {
      expect(store.state.user.posts[0].marker.on).toBe(true)
    })
  })
})
