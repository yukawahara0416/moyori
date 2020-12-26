import { mount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Spot/SpotDetailImageSlideDialog.vue'

const localVue = createLocalVue()

let wrapper
let propsData

beforeEach(() => {
  propsData = {
    photo: 'test'
  }

  wrapper = mount(Component, {
    localVue,
    propsData
  })
})

describe('props', () => {
  it('photo', () => {})
})

describe('v-on', () => {
  it('openDialog', () => {})
})

describe('methods', () => {
  it('openDialog', () => {})
})

describe('template', () => {
  it('v-img has :src', () => {})

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
