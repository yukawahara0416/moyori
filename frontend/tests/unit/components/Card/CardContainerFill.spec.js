import { shallowMount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Card/CardContainerFill.vue'

const localVue = createLocalVue()

let wrapper

beforeEach(() => {
  wrapper = shallowMount(Component, {
    localVue
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
