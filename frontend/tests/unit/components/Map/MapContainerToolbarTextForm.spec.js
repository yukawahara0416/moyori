import { mount } from '@vue/test-utils'
import Component from '@/components/Map/MapContainerToolbarTextForm.vue'

let wrapper

beforeEach(() => {
  wrapper = mount(Component, {})
})

afterEach(() => {
  wrapper.destroy()
})

describe('v-on', () => {
  it('textSearch', () => {
    const event = jest.fn()
    wrapper.setMethods({ textSearch: event })
    wrapper.find('input').trigger('keydown.enter')
    expect(event).toHaveBeenCalledTimes(1)
  })
})

describe('emit', () => {
  it('textSearch', () => {
    wrapper.vm.textSearch()
    expect(wrapper.emitted('text-search')).toBeTruthy()
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
