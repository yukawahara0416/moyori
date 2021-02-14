import { shallowMount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Card/CardFrameContentTitle.vue'

const localVue = createLocalVue()

let wrapper
let propsData

beforeEach(() => {
  propsData = {
    spot: { data: { name: 'test' } }
  }

  wrapper = shallowMount(Component, {
    localVue,
    propsData
  })
})

describe('props', () => {
  it('spot', () => {
    expect(wrapper.props().spot).toStrictEqual(propsData.spot)
    expect(wrapper.props().spot instanceof Object).toBeTruthy()
  })
})

describe('template', () => {
  it('spot.data.name', () => {
    expect(wrapper.find('p').text()).toEqual(propsData.spot.data.name)
  })

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
