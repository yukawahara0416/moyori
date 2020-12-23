import { shallowMount } from '@vue/test-utils'
import Component from '@/components/Header/HeaderDrawerButton.vue'

let wrapper
let propsData

beforeEach(() => {
  propsData = {
    value: false
  }

  wrapper = shallowMount(Component, {
    propsData
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('props', () => {
  it('value', () => {
    expect(wrapper.props().value).toStrictEqual(propsData.value)
    expect(typeof wrapper.vm.$props.value).toBe('boolean')
  })
})

describe('v-on', () => {
  it('input', () => {})
})

describe('methods', () => {
  it('emit/value', () => {
    wrapper.vm.input()
    expect(wrapper.emitted('input')).toBeTruthy()
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
