import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/components/Header/Header.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let store
let auth
let $route

beforeEach(() => {
  auth = {
    getters: {
      isLoggingIn: () => false
    }
  }

  store = new Vuex.Store({
    modules: {
      auth
    }
  })

  $route = {
    name: 'search'
  }

  wrapper = shallowMount(Component, {
    localVue,
    store,
    mocks: {
      $route
    }
  })
})

describe('getters', () => {
  it('isLoggingIn', () => {
    expect(wrapper.vm.isLoggingIn).toEqual(auth.getters.isLoggingIn())
  })
})

describe('computed', () => {
  it('isSearchRoute', () => {
    expect(wrapper.vm.isSearchRoute).toBe(true)
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
