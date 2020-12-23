import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/components/Header/HeaderAvatarListSignout.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let store

const signOutHandler = jest.fn()

beforeEach(() => {
  store = new Vuex.Store()

  wrapper = mount(Component, {
    localVue,
    store,
    methods: {
      signOutHandler
    }
  })
})

describe('getters', () => {
  it('headers', () => {})
})

describe('v-on', () => {
  it('signOutHandler', () => {
    wrapper.find('.v-list-item').trigger('click')
    expect(signOutHandler).toHaveBeenCalledTimes(1)
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
