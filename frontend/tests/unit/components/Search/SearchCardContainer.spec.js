import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import Component from '@/components/Search/SearchCardContainer.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(Vuetify)

let wrapper
let spot
let store
let vuetify

beforeEach(() => {
  spot = {
    namespaced: true,
    getters: {
      spots: () => [{ data: { id: 1 } }, { data: { id: 2 } }],
      filteredSpots: () => {}
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

afterEach(() => {
  wrapper.destroy()
})

describe('getters', () => {
  it('spots', () => {
    expect(wrapper.vm.spots).toEqual(spot.getters.spots())
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
