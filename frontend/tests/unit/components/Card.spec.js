import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Card from '@/components/Card.vue'

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

  wrapper = shallowMount(Card, {
    localVue,
    store
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('v-on', () => {
  it('setCurrentMarker', () => {
    // const event = jest.fn()
    // wrapper.setMethods({ setCurrentMarker: event })
    // // wrapper.find(sel('card')).trigger('click')
    // wrapper.find('v-card-stub').trigger('click')
    // expect(event).toHaveBeenCalledTimes(1)
  })
})

describe('actions', () => {
  it('setCurrentMarker', () => {})
})

describe('template', () => {
  it('v-for', () => {
    expect(wrapper.findAll('v-card-stub').length).toBe(2)
  })
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
