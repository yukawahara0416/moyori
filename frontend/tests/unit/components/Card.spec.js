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
    spots: [
      { marker: { name: 'hoge', icon: 'foo' } },
      { marker: { name: 'fuga', icon: 'bar' } }
    ],
    cache: { id: 11, icon: 'puge' }
  }
  actions = {
    setCurrentMarker: jest.fn(),
    postSpot: jest.fn()
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

  it('postSpot', () => {
    const event = jest.fn()
    wrapper.setMethods({ postSpot: event })
    wrapper
      .findAll('[data-test="postspot"]')
      .at(0)
      .trigger('click')
    expect(event).toHaveBeenCalledTimes(1)
  })
})

describe('getters', () => {
  it('spots', () => {
    expect(wrapper.vm.spots).toEqual(state.spots)
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

  it('postSpot', () => {
    wrapper.vm.postSpot()
    expect(actions.postSpot).toHaveBeenCalled()
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
