import { shallowMount } from '@vue/test-utils'
import Component from '@/components/Sign/SignContainer.vue'

let wrapper

beforeEach(() => {
  wrapper = shallowMount(Component, {})
})

afterEach(() => {
  wrapper.destroy()
})

describe('v-on', () => {
  it('changeTabs', () => {
    wrapper.setMethods({ changeTabs: jest.fn() })
    wrapper.vm.$emit('changeTabs')
    expect(wrapper.emitted().changeTabs).toBeTruthy()
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
