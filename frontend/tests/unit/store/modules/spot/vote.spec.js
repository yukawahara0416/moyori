import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import vote from '@/store/modules/spot/vote.js'
import { axiosBase } from '@/plugins/axios.js'
import MockAdapter from 'axios-mock-adapter'
import cloneDeep from 'lodash/cloneDeep'

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
      addSpot: jest.fn(),
      addVote: jest.fn(),
      deleteSpot: jest.fn(),
      deleteVote: jest.fn()
    }
  }

  user_mock = {
    namespaced: true,
    mutations: {
      addVote: jest.fn(),
      deleteVote: jest.fn()
    },
    actions: {
      addSpot: jest.fn(),
      deleteSpot: jest.fn()
    }
  }

  store.registerModule('spot', cloneDeep(spot_mock))
  store.registerModule('user', cloneDeep(user_mock))
})

describe('actions', () => {
  const prop = 'likes'
  const spot = { data: { place_id: '1234567890test' } }
  const params = new FormData()
  const target = { id: 1 }
  const headers = {
    'access-token': 'test',
    'client': 'test',
    'content-type': 'application/json; charset=utf-8',
    'uid': 'test'
  }
  let route = null
  let isMyPage = true
  let vote_id = null

  const response = {
    state: '200 success',
    data: { id: 236, user_id: 1, spot_id: 1 }
  }

  it('vote route search', () => {
    route = 'search'
    axiosMock.onPost(`/api/v1/${prop}`, params).reply(200, response)

    store
      .dispatch('vote', {
        prop,
        spot,
        params,
        headers,
        route,
        isMyPage,
        vote_id
      })
      .then(() => {
        expect(spot_mock.mutations.addVote).toHaveBeenCalled()
      })
  })

  it('vote route profile && isMyPage is true', () => {
    route = 'profile'
    isMyPage = true
    axiosMock.onPost(`/api/v1/${prop}`, params).reply(200, response)

    store
      .dispatch('vote', {
        prop,
        spot,
        params,
        headers,
        route,
        isMyPage,
        vote_id
      })
      .then(() => {
        expect(user_mock.actions.addSpot).toHaveBeenCalled()
        expect(user_mock.mutations.addVote).toHaveBeenCalled()
      })
  })

  it('vote route profile && isMyPage is false', () => {
    route = 'profile'
    isMyPage = false
    axiosMock.onPost(`/api/v1/${prop}`, params).reply(200, response)

    store
      .dispatch('vote', {
        prop,
        spot,
        params,
        headers,
        route,
        isMyPage,
        vote_id
      })
      .then(() => {
        expect(user_mock.actions.addSpot).not.toHaveBeenCalled()
        expect(user_mock.mutations.addVote).toHaveBeenCalled()
      })
  })

  it('unVote route search', () => {
    route = 'search'
    axiosMock.onDelete(`/api/v1/${prop}/${target.id}`).reply(200, response)

    store
      .dispatch('unVote', { prop, spot, target, headers, route, isMyPage })
      .then(() => {
        expect(spot_mock.mutations.deleteVote).toHaveBeenCalled()
      })
  })

  it('unVote route profile && isMyPage is true', () => {
    route = 'profile'
    isMyPage = true
    axiosMock.onDelete(`/api/v1/${prop}/${target.id}`).reply(200, response)

    store
      .dispatch('unVote', { prop, spot, target, headers, route, isMyPage })
      .then(() => {
        expect(user_mock.actions.deleteSpot).toHaveBeenCalled()
        expect(user_mock.mutations.deleteVote).toHaveBeenCalled()
      })
  })

  it('unVote route profile && isMyPage is false', () => {
    route = 'profile'
    isMyPage = false
    axiosMock.onDelete(`/api/v1/${prop}/${target.id}`).reply(200, response)

    store
      .dispatch('unVote', { prop, spot, target, headers, route, isMyPage })
      .then(() => {
        expect(user_mock.actions.deleteSpot).not.toHaveBeenCalled()
        expect(user_mock.mutations.deleteVote).toHaveBeenCalled()
      })
  })
})
