import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import GoogleMaps from '@/components/GoogleMaps.vue'
import GoogleMapsCircle from '@/basics/GoogleMapsCircle.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

const sel = id => `[data-test="${id}"]`

let wrapper
let store
let state
let getters
let mutations
let actions

beforeEach(() => {
  state = {
    markers: [
      { name: 'hoge', icon: 'foo' },
      { name: 'fuga', icon: 'bar' }
    ]
  }
  getters = {
    markers(state) {
      return state.markers
    }
  }
  mutations = {}
  actions = {}

  store = new Vuex.Store({
    modules: {
      markerStore: {
        state,
        getters,
        mutations,
        actions
      }
    }
  })

  wrapper = shallowMount(GoogleMaps, {
    localVue,
    store,
    stubs: ['gmap-map']
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('props', () => {
  it('mapCenter', () => {
    const data = { mapCenter: { lat: 0, lng: 0 } }
    wrapper.setData(data)
    expect(wrapper.find(GoogleMapsCircle).props().mapCenter).toStrictEqual(
      data.mapCenter
    )
  })
})

describe('v-on', () => {
  it('panTo', () => {})

  it('panToCurrentLocation', () => {
    const event = jest.fn()
    wrapper.setMethods({ panToCurrentLocation: event })
    wrapper.find(sel('btn1')).trigger('click')
    expect(event).toHaveBeenCalledTimes(1)
  })

  it('nearbySearch', () => {
    const event = jest.fn()
    wrapper.setMethods({ nearbySearch: event })
    wrapper.find(sel('btn2')).trigger('click')
    expect(event).toHaveBeenCalledTimes(1)
  })
})

describe('mounted', () => {
  it('getLocation', () => {})
})

describe('getters', () => {
  it('markers', () => {})
})

describe('actions', () => {
  it('setMarkers', () => {})

  it('clearMarkers', () => {})
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
