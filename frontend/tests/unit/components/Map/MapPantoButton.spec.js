import { mount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Map/MapPantoButton.vue'

const localVue = createLocalVue()

let wrapper

beforeEach(() => {
  wrapper = mount(Component, {
    localVue
  })
})

describe('v-on', () => {
  it('panToLocation', () => {
    const event = jest.fn()
    wrapper.setMethods({ panToLocation: event })
    wrapper.find('button').trigger('click')
    expect(event).toHaveBeenCalledTimes(1)
  })
})

describe('emit', () => {
  it('panToLocation', () => {
    wrapper.vm.panToLocation()
    expect(wrapper.emitted('panto-location')).toBeTruthy()
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
