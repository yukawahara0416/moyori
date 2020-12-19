// props id
// getter user
// getter currentUser

// mutations
// lodingOn
// lodingOff
// clearSpotsStore
// clearUserStore
// setUserStore

// actions
// getUser

import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/views/Profile.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let store
let spot
let user
let auth

const fetchData = jest.fn()

beforeEach(() => {
  spot = {
    namespaced: true,
    mutations: {}
  }

  user = {
    namespaced: true,
    getters: {
      user: () => {}
    },
    mutations: {}
  }

  auth = {
    getters: {
      currentUser: () => {}
    }
  }

  store = new Vuex.Store({
    modules: {
      spot,
      user,
      auth
    }
  })

  wrapper = shallowMount(Component, {
    localVue,
    store,
    methods: { fetchData }
  })
})

describe('call at created hook', () => {
  it('fetchData', () => {
    expect(fetchData).toHaveBeenCalled()
  })
})
