import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/components/Map/MapMarker.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let propsData
let spot
let store

beforeEach(() => {
  propsData = {
    spots: [
      {
        marker: {
          name: 'test1',
          position: { lat: 36.204824, lng: 138.252923 },
          zIndex: 10
        },
        data: { id: 1 }
      },
      {
        marker: {
          name: 'test2',
          position: { lat: 37.204824, lng: 139.252923 },
          zIndex: 11
        },
        data: { id: 2 }
      }
    ]
  }

  spot = {
    namespaced: true,
    actions: {
      spotlight: jest.fn()
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
    computed: {
      icon: () => jest.fn()
    },
    store,
    stubs: ['gmap-marker']
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('props', () => {
  it('spots', () => {
    expect(wrapper.props().spots).toStrictEqual(propsData.spots)
    expect(wrapper.props().spots instanceof Array).toBe(true)
  })
})

// describe('computed', () => {
//   it('iconUrl', () => {})
// })

describe('v-on', () => {
  it('spotlight', () => {
    const event = jest.fn()
    wrapper.setMethods({ spotlight: event })
    wrapper.vm.spotlight()
    expect(event).toHaveBeenCalledTimes(1)
  })
  it('panTo', () => {
    const event = jest.fn()
    wrapper.setMethods({ panTo: event })
    wrapper.vm.panTo()
    expect(event).toHaveBeenCalledTimes(1)
  })
  it('scroll', () => {
    const event = jest.fn()
    wrapper.setMethods({ scroll: event })
    wrapper.vm.scroll()
    expect(event).toHaveBeenCalledTimes(1)
  })
})

// describe('emit', () => {
//   it('panTo', () => {
//     wrapper.vm.$root.$emit('panTo')
//     const rootWrapper = createWrapper(wrapper.vm.$root)
//     expect(wrapper.emitted('panTo')).toBeTruthy()
//   })
// })

describe('actions', () => {
  it('spot/spotlight', () => {
    wrapper.vm.spotlight()
    expect(spot.actions.spotlight).toHaveBeenCalled()
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
