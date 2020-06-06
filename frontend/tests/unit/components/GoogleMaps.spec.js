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
    markers: [
      { name: 'hoge', icon: 'foo' },
      { name: 'fuga', icon: 'bar' }
    ]
  }
  actions = {
    setMarkers: jest.fn(),
    clearMarkers: jest.fn()
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

  it('textSearch', () => {
    const event = jest.fn()
    wrapper.setMethods({ textSearch: event })
    wrapper.findAll('[data-test="textsearch"]').trigger('keydown.enter')
    expect(event).toHaveBeenCalledTimes(1)
  })
})

describe('mounted', () => {
  it('getLocation', () => {})
})

describe('getters', () => {
  it('markers', () => {
    expect(wrapper.vm.markers).toEqual(state.markers)
  })
})

describe('actions', () => {
  it('setMarkers', () => {
    wrapper.vm.setMarkers()
    expect(actions.setMarkers).toHaveBeenCalled()
  })

  it('clearMarkers', () => {
    wrapper.vm.clearMarkers()
    expect(actions.clearMarkers).toHaveBeenCalled()
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
