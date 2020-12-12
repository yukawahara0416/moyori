import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import vote from '@/store/modules/spot/vote.js'
import { axiosBase } from '@/plugins/axios.js'
import MockAdapter from 'axios-mock-adapter'
import { cloneDeep } from 'lodash'

const axiosMock = new MockAdapter(axiosBase)

const localVue = createLocalVue()
localVue.use(Vuex)

let store
let spot_mock
let user_mock

beforeEach(() => {
  store = new Vuex.Store(cloneDeep(vote))

  spot_mock = {
    namespaced: true,
    mutations: {
      addDataSpotsStore: jest.fn(),
      deleteDataSpotsStore: jest.fn()
    }
  }

  user_mock = {
    namespaced: true,
    mutations: {
      addDataUserStore: jest.fn(),
      deleteDataUserStore: jest.fn()
    }
  }

  store.registerModule('spot', cloneDeep(spot_mock))
  store.registerModule('user', cloneDeep(user_mock))
})

describe('actions', () => {
  const prop = 'likes'
  const spot = { test: 'test' }
  const params = { test: 'test' }
  const target = { id: 1 }
  const tab = 'likes'
  const headers = { test: 'test' }
  let route = null
  const response = { state: '200 success', data: { place_id: '123' } }

  it('vote route search', () => {
    route = 'search'
    axiosMock.onPost(`/api/v1/${prop}`, params).reply(200, response)

    store
      .dispatch('vote', { prop, spot, params, tab, headers, route })
      .then(() => {
        expect(spot_mock.mutations.addDataSpotsStore).toHaveBeenCalled()
      })
  })

  it('vote route profile', () => {
    route = 'profile'
    axiosMock.onPost(`/api/v1/${prop}`, params).reply(200, response)

    store
      .dispatch('vote', { prop, spot, params, tab, headers, route })
      .then(() => {
        expect(user_mock.mutations.addDataUserStore).toHaveBeenCalled()
      })
  })

  it('unVote route search', () => {
    route = 'search'
    axiosMock.onDelete(`/api/v1/${prop}/${target.id}`).reply(200, response)

    store
      .dispatch('unVote', { prop, spot, target, tab, headers, route })
      .then(() => {
        expect(spot_mock.mutations.deleteDataSpotsStore).toHaveBeenCalled()
      })
  })

  it('unVote route profile', () => {
    route = 'profile'
    axiosMock.onDelete(`/api/v1/${prop}/${target.id}`).reply(200, response)

    store
      .dispatch('unVote', { prop, spot, target, tab, headers, route })
      .then(() => {
        expect(user_mock.mutations.deleteDataUserStore).toHaveBeenCalled()
      })
  })
})
