import { shallowMount } from '@vue/test-utils'
import Component from '@/components/Map/MapContainerToolbar.vue'

let wrapper

beforeEach(() => {
  wrapper = shallowMount(Component, {})
})

afterEach(() => {
  wrapper.destroy()
})

describe('v-on', () => {
  it('textSearch', () => {
    wrapper.setMethods({ textSearch: jest.fn() })
    wrapper.vm.$emit('textSearch')
    expect(wrapper.emitted().textSearch).toBeTruthy()
  })
  it('panToLocation', () => {
    wrapper.setMethods({ panToLocation: jest.fn() })
    wrapper.vm.$emit('panToLocation')
    expect(wrapper.emitted().panToLocation).toBeTruthy()
  })
  it('nearbySearch', () => {
    wrapper.setMethods({ nearbySearch: jest.fn() })
    wrapper.vm.$emit('nearbySearch')
    expect(wrapper.emitted().nearbySearch).toBeTruthy()
  })
})

describe('emit', () => {
  it('textSearch', () => {
    wrapper.vm.textSearch()
    expect(wrapper.emitted('text-search')).toBeTruthy()
  })
  it('panToLocation', () => {
    wrapper.vm.panToLocation()
    expect(wrapper.emitted('panto-location')).toBeTruthy()
  })
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
