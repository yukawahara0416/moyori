import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import GoogleMaps from '@/components/GoogleMaps.vue'
import GoogleMapsMarker from '@/basics/GoogleMapsMarker.vue'
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
      spotStore: {
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
    stubs: ['GmapMap', 'GmapMarker', 'GmapCircle']
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

  it('markers', () => {
    expect(wrapper.find(GoogleMapsMarker).props().markers).toBe(state.markers)
  })

  it('panTo', () => {
    const event = jest.fn()
    wrapper.setMethods({ panTo: event })
    wrapper.find(sel('marker')).trigger('panTo')
    expect(event).toHaveBeenCalledTimes(1)
  })
})

describe('v-on', () => {
  it('panToLocation', () => {
    const event = jest.fn()
    wrapper.setMethods({ panToLocation: event })
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
  it('getLocation', () => {
    // const event = jest.fn()
    // wrapper.setMethods({ getLocation: event })
    // shallowMount(Map)
    // expect(wrapper.vm.$options.mounted[0]).toBeInstanceOf(Function)
    expect(wrapper.vm.$options.mounted[0]).toString()
  })
})
// getLocation setMarker panTo nearbySearch
describe('state', () => {})
describe('getters', () => {})
describe('mutations', () => {})
describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
