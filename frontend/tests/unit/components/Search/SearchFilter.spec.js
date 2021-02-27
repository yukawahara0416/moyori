import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import Component from '@/components/Search/SearchFilter.vue'
import SearchFilterResult from '@/components/Search/SearchFilterResult.vue'
import SearchFilterSwitch from '@/components/Search/SearchFilterSwitch.vue'

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
  describe('SearchFilterResult', () => {
    it('has :spots', () => {
      expect(wrapper.find(SearchFilterResult).props().spots).toMatchObject(
        wrapper.vm.spots
      )
    })

    it('has :filteredSpots', () => {
      expect(
        wrapper.find(SearchFilterResult).props().filteredSpots
      ).toMatchObject(wrapper.vm.filteredSpots)
    })
  })

  describe('SearchFilterSwitch', () => {
    it('has :spots', () => {
      expect(wrapper.find(SearchFilterSwitch).props().spots).toEqual(
        wrapper.vm.spots
      )
    })
  })

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
