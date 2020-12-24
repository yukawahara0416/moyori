import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/components/Search/SearchFilter.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let store
let spot

beforeEach(() => {
  spot = {
    namespaced: true,
    getters: {
      spots: () => [{ data: { id: 1 } }, { data: { id: 2 } }],
      filteredSpots: () => [{ data: { id: 2 } }]
    }
  }

  store = new Vuex.Store({
    modules: {
      spot
    }
  })

  wrapper = shallowMount(Component, {
    localVue,
    store
  })
})

describe('getters', () => {
  it('spot/spots', () => {
    expect(wrapper.vm.spots).toMatchObject(store.getters['spot/spots'])
  })

  it('spot/filteredSpots', () => {})
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
