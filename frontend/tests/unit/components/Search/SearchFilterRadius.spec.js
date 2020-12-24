import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/components/Search/SearchFilterRadius.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let store
let spot

beforeEach(() => {
  spot = {
    namespaced: true,
    state: {
      radius: { name: '500m', value: 500 }
    },
    getters: {
      radius: () => {
        return { name: '500m', value: 500 }
      }
    },
    mutations: {
      setRadius: jest.fn()
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
  it('spot/radius', () => {
    expect(wrapper.vm.radius).toMatchObject(store.getters['spot/radius'])
  })
})

describe('computed', () => {
  it('select/get', () => {
    expect(wrapper.vm.select).toMatchObject(store.getters['spot/radius'])
  })

  it('select/set', () => {
    wrapper.vm.select = 'update'
    expect(spot.mutations.setRadius).toHaveBeenCalled()
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
