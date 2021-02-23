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
    center: { lat: 1, lng: 2 }
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
    expect(wrapper.vm.$props.center).toStrictEqual(propsData.center)
    expect(wrapper.vm.$props.center instanceof Object).toBeTruthy()
    expect(wrapper.vm.$options.props.center.required).toBeTruthy()
  })
})

describe('getters', () => {
  it('spot/radius', () => {
    expect(wrapper.vm.radius).toMatchObject(spot.getters.radius())
  })
})

describe('template', () => {
  it('gmap-circle has :center', () => {
    expect(wrapper.find('gmap-circle-stub').attributes().center).toEqual(
      '[object Object]'
    )
  })

  it('gmap-circle has :options', () => {
    expect(wrapper.find('gmap-circle-stub').attributes().options).toEqual(
      '[object Object]'
    )
  })

  it('gmap-circle has :radius', () => {
    expect(wrapper.find('gmap-circle-stub').attributes().radius).toEqual('500')
  })

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
