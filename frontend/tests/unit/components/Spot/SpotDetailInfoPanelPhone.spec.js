import { shallowMount, createLocalVue } from '@vue/test-utils'
import { Spot } from '@/class/Spot.js'
import Component from '@/components/Spot/SpotDetailInfoPanelPhone.vue'

const localVue = createLocalVue()

let wrapper
let propsData

beforeEach(() => {
  propsData = {
    spot: new Spot({
      data: { id: 1, phone: '123456789' }
    })
  }

  wrapper = shallowMount(Component, {
    localVue,
    propsData
  })
})

describe('props', () => {
  it('spot', () => {
    expect(wrapper.vm.$props.spot).toStrictEqual(propsData.spot)
    expect(wrapper.vm.$props.spot instanceof Spot).toBeTruthy()
    expect(wrapper.vm.$options.props.spot.required).toBeTruthy()
  })
})

describe('computed', () => {
  it('tel', () => {
    expect(wrapper.vm.tel).toEqual(propsData.spot.data.phone)
  })
})

describe('template', () => {
  it('a has :href', () => {
    expect(wrapper.find('a').attributes().href).toEqual(`tel:${wrapper.vm.tel}`)
  })

  it('a.text is {{ tel }}', () => {
    expect(wrapper.find('a').text()).toEqual(wrapper.vm.tel)
  })
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
