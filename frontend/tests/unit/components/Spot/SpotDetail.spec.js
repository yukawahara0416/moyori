// props spot
// emit

//template
// spot-detail-title spot
// spot-detail-image-slide spot
// spot-detail-wifi-panel spot
// spot-detail-power-panel spot
// spot-detail-comment-panel spot
// spot-detail-info-panel spot

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
    localVue
  })
})

describe('props', () => {})

describe('emit', () => {})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
