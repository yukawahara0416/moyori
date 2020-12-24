import { mount } from '@vue/test-utils'
import Component from '@/components/Map/MapNearbyButton.vue'

let wrapper

beforeEach(() => {
  wrapper = mount(Component, {})
})

afterEach(() => {
  wrapper.destroy()
})

describe('v-on', () => {
  it('nearbySearch', () => {
    const event = jest.fn()
    wrapper.setMethods({ nearbySearch: event })
    wrapper.find('button').trigger('click')
    expect(event).toHaveBeenCalledTimes(1)
  })
})

describe('emit', () => {
  it('nearbySearch', () => {
    wrapper.vm.nearbySearch()
    expect(wrapper.emitted('nearby-search')).toBeTruthy()
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
