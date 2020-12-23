import { shallowMount } from '@vue/test-utils'
import Component from '@/components/Header/HeaderAvatarListMypage.vue'

let wrapper
let propsData

beforeEach(() => {
  propsData = {
    currentUser: { data: { id: 1 } }
  }

  wrapper = shallowMount(Component, {
    propsData
  })
})

describe('props', () => {
  it('currentUser', () => {
    expect(wrapper.props().currentUser).toStrictEqual(propsData.currentUser)
    expect(wrapper.props().currentUser instanceof Object).toBe(true)
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
