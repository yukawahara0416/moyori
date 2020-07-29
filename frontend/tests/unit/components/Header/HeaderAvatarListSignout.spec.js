import { mount } from '@vue/test-utils'
import Component from '@/components/Header/HeaderAvatarListSignout.vue'

let wrapper

beforeEach(() => {
  wrapper = mount(Component, {})
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
