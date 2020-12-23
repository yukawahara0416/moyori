import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/components/Map/MapCircle.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let propsData
let store
let spot

beforeEach(() => {
  propsData = {
    center: { lat: 36.204824, lng: 138.252923 }
  }

  spot = {
    namespaced: true,
    getters: {
      radius: () => {
        return { name: '500m', value: 500 }
      }
    }
  }

  store = new Vuex.Store({
    modules: {
      spot
    }
  })

  wrapper = shallowMount(Component, {
    localVue,
    propsData,
    store,
    stubs: ['gmap-circle']
  })
})

describe('props', () => {
  it('center', () => {
    expect(wrapper.props().center).toStrictEqual(propsData.center)
    expect(wrapper.props().center instanceof Object).toBe(true)
  })
})

describe('getters', () => {
  it('spot/radius', () => {
    expect(wrapper.vm.radius).toMatchObject(store.getters['spot/radius'])
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
