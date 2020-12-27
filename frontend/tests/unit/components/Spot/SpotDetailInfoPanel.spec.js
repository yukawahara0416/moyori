import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/components/Spot/SpotDetailInfoPanel.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let propsData
let store
let auth

beforeEach(() => {
  propsData = {
    spot: {
      data: { id: 1, place_id: 'aaaaaaaaaa', user_id: 1 }
    }
  }

  auth = {
    getters: {
      currentUser: () => {
        return { data: { id: 1 } }
      },
      isLoggingIn: () => true
    }
  }

  store = new Vuex.Store({
    modules: {
      auth
    }
  })

  wrapper = shallowMount(Component, {
    localVue,
    propsData,
    store
  })
})

describe('props', () => {
  it('spot', () => {})
})

describe('getters', () => {
  it('currentUser', () => {})
  it('isLoggingIn', () => {})
})

describe('computed', () => {
  it('isOwnPosted', () => {})
})

describe('template', () => {
  it(' has :spot', () => {})
  it(' has :spot', () => {})
  it(' has :spot', () => {})
  it(' has :spot', () => {})
  it(' has :spot', () => {})
  it('v-if="isOwnPosted"', () => {})
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
