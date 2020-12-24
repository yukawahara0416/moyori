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

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
