import { shallowMount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Sign/SignContainerTabItemsSignIn.vue'

const localVue = createLocalVue()

let wrapper

beforeEach(() => {
  wrapper = shallowMount(Component, {
    localVue,
    stubs: ['policy']
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
