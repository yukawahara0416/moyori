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
describe('computed', () => {
  it('url', () => {
  })
})
describe('template', () => {
  it('a has :href', () => {
  })
  it('a.text has {{ url }}', () => {
  })
  it('snapshot', () => {
  })
})
