import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import Component from '@/components/Card/CardFrameContentImage.vue'

const localVue = createLocalVue()
localVue.use(Vuetify)

let wrapper
let propsData
let vuetify

beforeEach(() => {
  propsData = {
    spot: { data: { id: 1, name: 'test' }, comments: [] }
  }

  vuetify = new Vuetify()

  wrapper = shallowMount(Component, {
    localVue,
    propsData,
    vuetify
  })
})

describe('props', () => {
  it('spot', () => {
    expect(wrapper.props().spot).toStrictEqual(propsData.spot)
    expect(wrapper.props().spot instanceof Object).toBe(true)
  })
})

describe('computed', () => {
  it('image', () => {})
  it('filterImages', () => {})
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
