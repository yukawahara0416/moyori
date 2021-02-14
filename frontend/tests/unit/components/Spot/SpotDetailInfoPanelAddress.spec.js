import { shallowMount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Spot/SpotDetailInfoPanelAddress.vue'

const localVue = createLocalVue()

let wrapper
let propsData

beforeEach(() => {
  propsData = {
    spot: {
      data: { id: 1, address: 'test', position: { lat: 'lat', lng: 'lng' } }
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
    expect(wrapper.props().spot instanceof Object).toBeTruthy()
  })
})

describe('computed', () => {
  it('address', () => {
    expect(wrapper.vm.address).toEqual(propsData.spot.data.address)
  })

  it('url', () => {
    expect(wrapper.vm.url).toEqual(
      'https://www.google.com/maps/dir/?api=1&destination=lat,lng'
    )
  })
})

describe('template', () => {
  it('a has :href="url"', () => {
    expect(wrapper.find('a').attributes().href).toEqual(wrapper.vm.url)
  })

  it('a.text has address', () => {
    expect(wrapper.find('a').text()).toBe(wrapper.vm.address)
  })

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
