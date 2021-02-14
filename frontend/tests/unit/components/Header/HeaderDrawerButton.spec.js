import { shallowMount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Header/HeaderDrawerButton.vue'

const localVue = createLocalVue()

let wrapper
let propsData

beforeEach(() => {
  propsData = {
    value: false
  }

  wrapper = shallowMount(Component, {
    localVue,
    propsData
  })
})

describe('props', () => {
  it('value', () => {
    expect(wrapper.vm.$props.value).toStrictEqual(propsData.value)
    expect(typeof wrapper.vm.$props.value).toBe('boolean')
  })
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
