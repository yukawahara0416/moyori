import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/components/Header/HeaderAvatarListSignout.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper

beforeEach(() => {
  wrapper = mount(Component, {
    localVue
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('v-on', () => {
  it('signOut', () => {
    const event = jest.fn()
    wrapper.setMethods({ signOut: event })
    wrapper.find('.v-list-item').trigger('click')
    expect(event).toHaveBeenCalledTimes(1)
  })
})

describe('actions', () => {
  it('signOut', () => {})
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
