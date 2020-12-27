import { shallowMount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Spot/SpotDetailInfoPanelPhone.vue'

const localVue = createLocalVue()

let wrapper
let propsData

beforeEach(() => {
  propsData = {
    spot: {
      data: { id: 1, phone: '123456789' }
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
  it('tel', () => {
    expect(wrapper.vm.tel).toEqual(propsData.spot.data.phone)
  })
})

describe('template', () => {
  it('a has :href', () => {
    expect(wrapper.find('a').attributes().href).toEqual('tel:123456789')
  })

  it('a.text is {{ tel }}', () => {
    expect(wrapper.find('a').text()).toEqual(wrapper.vm.tel)
  })
  it('snapshot', () => {
  })
})
