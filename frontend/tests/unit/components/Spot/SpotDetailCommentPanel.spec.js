// props
// v-if
// template spot

import { shallowMount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Spot/SpotDetailCommentPanel.vue'

const localVue = createLocalVue()

let wrapper
let propsData

beforeEach(() => {
  propsData = {
    spot: { data: { id: 1 }, comments: [{ data: { id: 1 } }] }
  }

  wrapper = shallowMount(Component, {
    localVue,
    propsData
  })
})

describe('props', () => {
  it('spot', () => {
    expect(wrapper.props().spot).toStrictEqual(propsData.spot)
    expect(wrapper.props().spot instanceof Object).toBe(true)
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
