import { shallowMount } from '@vue/test-utils'
import Component from '@/components/Card/CardFrameContentAction.vue'

let wrapper
let propsData

beforeEach(() => {
  propsData = {
    spot: { data: { id: 1, name: 'test' } }
  }

  wrapper = shallowMount(Component, {
    propsData
  })
})

afterEach(() => {
  wrapper.destroy()
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
