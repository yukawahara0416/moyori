import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Map/MapPantoButton.vue'

const localVue = createLocalVue()

let wrapper

beforeEach(() => {
  wrapper = shallowMount(Component, {
    localVue
  })
})

describe('v-on', () => {
  it('panToLocation', () => {
    const panToLocation = jest.fn()

    wrapper = mount(Component, {
      localVue,
      methods: {
        panToLocation
      }
    })

    wrapper.find('.v-btn').trigger('click')
    expect(panToLocation).toHaveBeenCalled()
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
