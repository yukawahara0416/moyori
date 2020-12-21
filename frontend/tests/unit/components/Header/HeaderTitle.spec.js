import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import Component from '@/components/Header/HeaderTitle.vue'

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

describe('router-link', () => {
  it('to="/"', () => {
    expect(wrapper.find(RouterLinkStub).props().to).toBe('/')
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
