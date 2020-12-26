import { shallowMount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Spot/SpotDetailImageSlide.vue'

const localVue = createLocalVue()

let wrapper
let propsData

beforeEach(() => {
  propsData = {
    spot: { data: { id: 1 }, comments: [{ data: { id: 2 } }] }
  }

  wrapper = shallowMount(Component, {
    localVue,
    propsData
  })
})

// props
// computed images
// commentImages

describe('props', () => {
  it('spot', () => {
    expect(wrapper.props().spot).toStrictEqual(propsData.spot)
    expect(wrapper.props().spot instanceof Object).toBe(true)
  })
})

describe('computed', () => {})

describe('template', () => {})

// template
// v-if v-slide-item
// v-img
// v-else
