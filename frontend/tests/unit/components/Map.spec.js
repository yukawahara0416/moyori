import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Map from '@/components/Map.vue'
import Marker from '@/basics/Gmap/Marker.vue'

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
    markers: []
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
      spotStore: {
        state,
        getters,
        mutations,
        actions
      }
    }
  })

  wrapper = mount(Map, {
    localVue,
    store,
    stubs: ['GmapMap', 'GmapMarker', 'GmapCircle']
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('data', () => {})
describe('props', () => {})
describe('emit', () => {})
// panTo
describe('slot', () => {})
describe('v-on', () => {
  it('click="panToLocation"', () => {
    const event = jest.fn()
    wrapper.setMethods({ panToLocation: event })
    wrapper.find(sel('btn1')).trigger('click')
    expect(event).toHaveBeenCalledTimes(1)
  })

  it('click="nearbySearch"', () => {
    const event = jest.fn()
    wrapper.setMethods({ nearbySearch: event })
    wrapper.find(sel('btn2')).trigger('click')
    expect(event).toHaveBeenCalledTimes(1)
  })
})
describe('created', () => {})
describe('mounted', () => {})
// getLocation setMarker panTo nearbySearch
describe('state', () => {
  it('mapGetters.markers', () => {})
})
describe('getters', () => {})
// getters.markers
describe('mutations', () => {})
describe('actions', () => {})
// addMarkers clearMarkers
describe('router', () => {})
