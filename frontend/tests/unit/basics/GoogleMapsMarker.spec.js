import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import GoogleMapsMarker from '@/basics/GoogleMapsMarker.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

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
    ],
    currentMarker: { id: -1, icon: '' }
  }
  getters = {
    markers(state) {
      return state.markers
    },
    currentMarker(state) {
      return state.currentMarker
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

  wrapper = shallowMount(GoogleMapsMarker, {
    localVue,
    store,
    stubs: ['gmap-marker']
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('watch', () => {
  it('currentMarker', () => {})
})

describe('v-on', () => {
  it('setCurrentMarker', () => {
    // const event = jest.fn()
    // wrapper.setMethods({ setCurrentMarker: event })
    // wrapper.find('gmap-marker-stub').trigger('click')
    // expect(event).toHaveBeenCalledTimes(1)
  })
  it('scrollCard', () => {
    // const event = jest.fn()
    // wrapper.setMethods({ scrollCard: event })
    // wrapper.find('gmap-marker-stub').trigger('click')
    // expect(event).toHaveBeenCalledTimes(1)
  })
})

describe('getters', () => {
  it('markers', () => {})

  it('currentMarker', () => {})
})

describe('actions', () => {
  it('setCurrentMarker', () => {})
})

describe('template', () => {
  it('v-for', () => {
    expect(wrapper.findAll('gmap-marker-stub').length).toBe(2)
  })
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
