// mutations
// lodingOn
// lodingOff
// clearSpotsStore
// clearUserStore
// setUserStore

// beforeRouteUpdate

// actions
// getUser

import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/views/Profile.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let propsData
let store
let spot
let user
let auth

const fetchData = jest.fn()

beforeEach(() => {
  propsData = { id: 1 }

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
    propsData,
    store,
    methods: { fetchData }
  })
})

describe('props data', () => {
  it('id', () => {
    expect(wrapper.props().id).toEqual(propsData.id)
    expect(typeof wrapper.props().id).toBe('number')
  })
})

describe('call at created hook', () => {
  it('fetchData', () => {
    expect(fetchData).toHaveBeenCalled()
  })
})

describe('call at beforeRouteUpdate hook', () => {
  let beforeRouteUpdate, to, next

  beforeEach(() => {
    beforeRouteUpdate = wrapper.vm.$options.beforeRouteUpdate[0]
    to = { params: propsData.id }
    next = jest.fn()
    beforeRouteUpdate.call(wrapper.vm, to, null, next)
  })
})

describe('getters', () => {
  it('user/user', () => {
    expect(wrapper.vm.user).toEqual(user.getters.user())
  })

  it('currentUser', () => {
    expect(wrapper.vm.currentUser).toEqual(auth.getters.currentUser())
  })
})
