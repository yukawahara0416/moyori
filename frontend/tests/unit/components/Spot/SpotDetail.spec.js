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
  it('spot-detail-title has :spot', () => {})
  it('spot-detail-image-slide has :spot', () => {})
  it('spot-detail-wifi-panel has :spot', () => {})
  it('spot-detail-power-panel has :spot', () => {})
  it('spot-detail-comment-panel has :spot', () => {})
  it('spot-detail-info-panel has :spot', () => {})

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
