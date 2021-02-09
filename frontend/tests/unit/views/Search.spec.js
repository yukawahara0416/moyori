import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/views/Search.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let store
let spot
let user

beforeEach(() => {
  spot = {
    namespaced: true,
    mutations: {
      clearSpots: jest.fn()
    }
  }

  user = {
    namespaced: true,
    mutations: {
      clearUser: jest.fn()
    }
  }

  store = new Vuex.Store({
    modules: {
      spot,
      user
    }
  })

  wrapper = shallowMount(Component, {
    localVue,
    store
  })
})

describe('call mutations at created hook', () => {
  it('spot/learSpotsStore', () => {
    expect(spot.mutations.clearSpots).toHaveBeenCalled()
  })

  it('user/clearUser', () => {
    expect(user.mutations.clearUser).toHaveBeenCalled()
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
