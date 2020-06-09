import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import GoogleMapsMarker from '@/basics/GoogleMapsMarker.vue'
import markerStore from '@/store/modules/marker.js'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let store
let state
let actions

beforeEach(() => {
  state = {
    spots: [
      { marker: { name: 'hoge', icon: 'foo' } },
      { marker: { name: 'fuga', icon: 'bar' } }
    ],
    cache: { id: 11, icon: 'puge' }
  }

  actions = {
    setCurrentMarker: jest.fn()
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

  wrapper = shallowMount(GoogleMapsMarker, {
    localVue,
    store,
    stubs: ['gmap-marker']
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('emit', () => {
  it('pan-to', () => {
    const pos = { lat: 123, lng: 45 }
    wrapper.vm.panTo(pos)
    expect(wrapper.emitted('pan-to')).toBeTruthy()
    expect(wrapper.emitted('pan-to')[0][0]).toEqual(pos)
  })
})

describe('getters', () => {
  it('markers', () => {
    expect(wrapper.vm.markers).toEqual(state.markers)
  })

  it('cache', () => {
    expect(wrapper.vm.cache).toEqual(state.cache)
  })
})

describe('actions', () => {
  it('setCurrentMarker', () => {
    wrapper.vm.setCurrentMarker()
    expect(actions.setCurrentMarker).toHaveBeenCalled()
  })
})

describe('template', () => {
  it('v-for', () => {
    expect(wrapper.findAll('gmap-marker-stub').length).toBe(2)
  })
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
