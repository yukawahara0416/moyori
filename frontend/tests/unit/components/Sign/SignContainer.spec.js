import { shallowMount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Sign/SignContainer.vue'

const localVue = createLocalVue()

let wrapper

beforeEach(() => {
  wrapper = shallowMount(Component, {
    localVue
  })
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
