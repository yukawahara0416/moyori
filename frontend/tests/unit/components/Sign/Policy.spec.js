import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import Component from '@/components/Sign/Policy.vue'

const localVue = createLocalVue()

let wrapper

beforeEach(() => {
  wrapper = shallowMount(Component, {
    localVue,
    stubs: {
      RouterLink: RouterLinkStub
    }
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
