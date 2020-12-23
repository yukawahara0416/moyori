import { shallowMount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Card/CardFrameContent.vue'

const localVue = createLocalVue()

let wrapper
let propsData

beforeEach(() => {
  propsData = {
    spot: { marker: { name: 'test' }, data: { id: 1 } },
    id: 1,
    type: 'map'
  }

  wrapper = shallowMount(Component, {
    localVue,
    propsData
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('proprs', () => {
  it('spot', () => {
    expect(wrapper.props().spot).toStrictEqual(propsData.spot)
    expect(wrapper.props().spot instanceof Object).toBe(true)
  })
  it('type', () => {
    expect(wrapper.props().type).toStrictEqual(propsData.type)
    expect(typeof wrapper.vm.$props.type).toBe('string')
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
