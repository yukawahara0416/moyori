import { shallowMount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Profile/ProfileContents.vue'

const localVue = createLocalVue()

let wrapper
let propsData

beforeEach(() => {
  propsData = {
    user: { data: { id: 1 } }
  }

  wrapper = shallowMount(Component, {
    localVue,
    propsData
  })
})

describe('props', () => {
  it('user', () => {
    expect(wrapper.props().user).toEqual(propsData.user)
    expect(wrapper.props().user instanceof Object).toBe(true)
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
