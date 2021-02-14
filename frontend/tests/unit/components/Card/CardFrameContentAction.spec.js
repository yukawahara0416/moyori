import { shallowMount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Card/CardFrameContentAction.vue'

const localVue = createLocalVue()

let wrapper
let propsData

beforeEach(() => {
  propsData = {
    spot: { data: { id: 1, name: 'test' } }
  }

  wrapper = shallowMount(Component, {
    localVue,
    propsData
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('props', () => {
  it('spot', () => {
    expect(wrapper.props().spot).toStrictEqual(propsData.spot)
    expect(wrapper.props().spot instanceof Object).toBeTruthy()
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
