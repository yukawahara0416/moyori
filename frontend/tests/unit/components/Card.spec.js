import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import Card from '@/components/Card.vue'
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
    ],
    currentMarker: { id: 11, icon: 'puge' }
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

  vuetify = new Vuetify()

  wrapper = mount(Card, {
    localVue,
    store,
    vuetify
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('v-on', () => {
  it('setCurrentMarker', () => {
    const event = jest.fn()
    wrapper.setMethods({ setCurrentMarker: event })
    wrapper
      .findAll('.v-card')
      .at(0)
      .trigger('click')
    expect(event).toHaveBeenCalledTimes(1)
  })
})

describe('getters', () => {
  it('markers', () => {
    expect(wrapper.vm.markers).toEqual(state.markers)
  })

  it('currentMarker', () => {
    expect(wrapper.vm.currentMarker).toEqual(state.currentMarker)
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
    expect(wrapper.findAll('.v-card').length).toBe(2)
  })
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
