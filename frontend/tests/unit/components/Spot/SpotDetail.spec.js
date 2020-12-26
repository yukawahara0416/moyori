// emit

//template

import { shallowMount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Spot/SpotDetail.vue'

const localVue = createLocalVue()

let wrapper
let propsData

beforeEach(() => {
  propsData = {
    spot: { data: { id: 1 } }
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

describe('emit', () => {
  it('closeDialog', () => {
    wrapper.vm.closeDialog()
    expect(wrapper.emitted('closeDialog')).toBeTruthy()
  })
})

describe('template', () => {
  it('spot-detail-title has :spot', () => {
    expect(
      wrapper.find('spot-detail-image-slide-stub').attributes().spot
    ).toEqual('[object Object]')
  })

  it('spot-detail-image-slide has :spot', () => {
    expect(
      wrapper.find('spot-detail-image-slide-stub').attributes().spot
    ).toEqual('[object Object]')
  })

  it('spot-detail-wifi-panel has :spot', () => {
    expect(
      wrapper.find('spot-detail-wifi-panel-stub').attributes().spot
    ).toEqual('[object Object]')
  })

  it('spot-detail-power-panel has :spot', () => {
    expect(
      wrapper.find('spot-detail-power-panel-stub').attributes().spot
    ).toEqual('[object Object]')
  })

  it('spot-detail-comment-panel has :spot', () => {})
  it('spot-detail-info-panel has :spot', () => {})

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
