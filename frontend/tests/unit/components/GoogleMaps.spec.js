import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import GoogleMaps from '@/components/GoogleMaps.vue'
import markerStore from '@/store/modules/marker.js'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(Vuetify)

let wrapper
let store
let state
let actions
let vuetify

beforeEach(() => {
  state = {
    spots: [
      { marker: { name: 'hoge', icon: 'foo' } },
      { marker: { name: 'fuga', icon: 'bar' } }
    ]
  }
  actions = {
    addSpots: jest.fn(),
    clearSpots: jest.fn()
  }

  store = new Vuex.Store({
    modules: {
      markerStore: {
        state,
        getters: markerStore.getters,
        actions
      }
    }
  })

  vuetify = new Vuetify()

  wrapper = mount(GoogleMaps, {
    localVue,
    store,
    vuetify,
    stubs: ['gmap-map', 'google-maps-circle', 'google-maps-marker']
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('v-on', () => {
  it('panToCurrentLocation', () => {
    const event = jest.fn()
    wrapper.setMethods({ panToCurrentLocation: event })
    wrapper.findAll('[data-test="btn1"]').trigger('click')
    expect(event).toHaveBeenCalledTimes(1)
  })

  it('nearbySearch', () => {
    const event = jest.fn()
    wrapper.setMethods({ nearbySearch: event })
    wrapper.findAll('[data-test="btn2"]').trigger('click')
    expect(event).toHaveBeenCalledTimes(1)
  })
})

describe('mounted', () => {
  it('getLocation', () => {})
})

describe('getters', () => {
  it('spots', () => {
    expect(wrapper.vm.spots).toEqual(state.spots)
  })
})

describe('actions', () => {
  it('addSpots', () => {
    wrapper.vm.addSpots()
    expect(actions.addSpots).toHaveBeenCalled()
  })

  it('clearSpots', () => {
    wrapper.vm.clearSpots()
    expect(actions.clearSpots).toHaveBeenCalled()
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
