import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/components/Search/SearchFilterType.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let store
let spot

beforeEach(() => {
  spot = {
    namespaced: true,
    getters: {
      type: () => {
        return { name: 'カフェ', value: 'cafe' }
      }
    },
    mutations: {
      setType: jest.fn()
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
  it('spot/type', () => {
    expect(wrapper.vm.type).toMatchObject(store.getters['spot/type'])
  })
})

describe('computed', () => {
  it('select/get', () => {
    expect(wrapper.vm.select).toMatchObject(store.getters['spot/type'])
  })

  it('select/set', () => {})
})

describe('template', () => {
  it('v-select has :items', () => {})

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
