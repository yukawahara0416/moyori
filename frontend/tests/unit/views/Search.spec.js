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
      clearSpotsStore: jest.fn()
    }
  }

  user = {
    namespaced: true,
    mutations: {
      clearUserStore: jest.fn()
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
    expect(spot.mutations.clearSpotsStore).toHaveBeenCalled()
  })

  it('user/clearUserStore', () => {
    expect(user.mutations.clearUserStore).toHaveBeenCalled()
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
