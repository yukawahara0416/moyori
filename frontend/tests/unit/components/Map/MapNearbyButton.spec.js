import { mount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Map/MapNearbyButton.vue'

const localVue = createLocalVue()

let wrapper

beforeEach(() => {
  wrapper = mount(Component, {
    localVue
  })
})

describe('v-on', () => {
  it('nearbySearch', () => {
    const nearbySearch = jest.fn()

    wrapper = mount(Component, {
      localVue,
      methods: {
        nearbySearch
      }
    })

    wrapper.find('.v-btn').trigger('click')
    expect(nearbySearch).toHaveBeenCalledTimes(1)
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
