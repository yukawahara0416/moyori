import { shallowMount } from '@vue/test-utils'
import Component from '@/components/Profile/ProfileActionsItemsName.vue'

let wrapper
let propsData

beforeEach(() => {
  propsData = {
    user: { data: { id: 1 }, posts: [{ data: { id: 1 } }] }
  }

  wrapper = shallowMount(Component, {
    propsData
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('props', () => {
  it('user', () => {
    expect(wrapper.props().user).toEqual(propsData.user)
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
