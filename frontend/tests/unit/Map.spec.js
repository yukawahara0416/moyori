import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/components/Map.vue'
import spotStore from '@/store/spot.js'

const localVue = createLocalVue()
localVue.use(Vuex)

const sel = id => `[data-test="${id}"]`

let state
let actions
let store
let wrapper

beforeEach(() => {
  state = {
    markers: [
      { name: 'hoge', place_id: 'aaa' },
      { name: 'fuga', place_id: 'bbb' }
    ]
  }

  actions = {}

  store = new Vuex.Store({
    modules: {
      spotStore: {
        state,
        getters: spotStore.getters,
        actions
      }
    }
  })

  wrapper = mount(Component, {
    localVue,
    store,
    stubs: ['GmapMap', 'GmapMarker', 'GmapCircle']
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('v-on', () => {
  it('click="moveToCurrentLocation"', () => {
    const event = jest.fn()
    wrapper.setMethods({ moveToCurrentLocation: event })
    wrapper.find(sel('btn1')).trigger('click')
    expect(event).toHaveBeenCalledTimes(1)
  })

  it('click="setNearbyMarkers"', () => {
    const event = jest.fn()
    wrapper.setMethods({ setNearbyMarkers: event })
    wrapper.find(sel('btn2')).trigger('click')
    expect(event).toHaveBeenCalledTimes(1)
  })
})
