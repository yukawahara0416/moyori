import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Map/MapNearbyButton.vue'

const localVue = createLocalVue()

let wrapper

beforeEach(() => {
  wrapper = shallowMount(Component, {
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
    expect(nearbySearch).toHaveBeenCalled()
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
