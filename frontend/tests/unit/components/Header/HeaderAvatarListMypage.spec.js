import { shallowMount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Header/HeaderAvatarListMypage.vue'

const localVue = createLocalVue()

let wrapper
let propsData

beforeEach(() => {
  propsData = {
    currentUser: { data: { id: 1 } }
  }

  wrapper = shallowMount(Component, {
    localVue,
    propsData
  })
})

describe('props', () => {
  it('currentUser', () => {
    expect(wrapper.props().currentUser).toStrictEqual(propsData.currentUser)
    expect(wrapper.props().currentUser instanceof Object).toBeTruthy()
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
