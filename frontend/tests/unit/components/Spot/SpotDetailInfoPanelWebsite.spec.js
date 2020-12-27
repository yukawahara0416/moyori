import { shallowMount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Spot/SpotDetailInfoPanelWebsite.vue'

const localVue = createLocalVue()

let wrapper
let propsData

beforeEach(() => {
  propsData = {
    spot: {
      data: { id: 1, url: 'http://www.example.com' }
    }
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
describe('computed', () => {
  it('url', () => {
    expect(wrapper.vm.url).toEqual(propsData.spot.data.url)
  })
})
describe('template', () => {
  it('a has :href', () => {
    expect(wrapper.find('a').attributes().href).toEqual(wrapper.vm.url)
  })
  it('a.text has {{ url }}', () => {
  })
  it('snapshot', () => {
  })
})
