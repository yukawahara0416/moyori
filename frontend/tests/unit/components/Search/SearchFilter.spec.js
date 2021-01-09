import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import Component from '@/components/Search/SearchFilter.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(Vuetify)

let wrapper
let store
let spot
let vuetify

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

  vuetify = new Vuetify()

  wrapper = shallowMount(Component, {
    localVue,
    store,
    vuetify
  })
})

describe('getters', () => {
  it('spot/spots', () => {
    expect(wrapper.vm.spots).toMatchObject(store.getters['spot/spots'])
  })

  it('spot/filteredSpots', () => {
    expect(wrapper.vm.filteredSpots).toMatchObject(
      store.getters['spot/filteredSpots']
    )
  })
})

describe('template', () => {
  describe('search-filter-result', () => {
    it('has :spots', () => {
      expect(
        wrapper.find('search-filter-result-stub').attributes().spots
      ).toEqual('[object Object],[object Object]')
    })

    it('has :filteredSpots', () => {
      expect(
        wrapper.find('search-filter-result-stub').attributes().filteredspots
      ).toEqual('[object Object]')
    })
  })

  describe('search-filter-switch', () => {
    it('has :spots', () => {
      expect(
        wrapper.find('search-filter-switch-stub').attributes().spots
      ).toEqual('[object Object],[object Object]')
    })
  })

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
