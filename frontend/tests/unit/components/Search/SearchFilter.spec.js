import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/components/Search/SearchFilter.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper

beforeEach(() => {
  wrapper = shallowMount(Component, {})
})

describe('getters', () => {
  it('spot/spots', () => {})

  it('spot/filteredSpots', () => {})
})
