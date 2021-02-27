import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import { Spot } from '@/class/Spot.js'
import Component from '@/components/Spot/SpotDetail.vue'

const localVue = createLocalVue()
localVue.use(Vuetify)

let wrapper
let propsData
let vuetify

beforeEach(() => {
  propsData = {
    spot: new Spot({ data: { id: 1 } })
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
    expect(wrapper.vm.$props.spot).toStrictEqual(propsData.spot)
    expect(wrapper.vm.$props.spot instanceof Spot).toBeTruthy()
    expect(wrapper.vm.$options.props.spot.required).toBeTruthy()
  })
})

describe('computed', () => {
  it('cols', () => {
    expect(wrapper.vm.cols).toEqual(6)
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

  it('spot-detail-comment-panel has :spot', () => {
    expect(
      wrapper.find('spot-detail-comment-panel-stub').attributes().spot
    ).toEqual('[object Object]')
  })

  it('spot-detail-info-panel has :spot', () => {
    expect(

  it('v-col has :cols', () => {
    expect(
      wrapper
        .findAll('v-col-stub')
        .at(0)
        .attributes().cols
    ).toEqual(wrapper.vm.cols.toString())
    expect(
      wrapper
        .findAll('v-col-stub')
        .at(1)
        .attributes().cols
    ).toEqual(wrapper.vm.cols.toString())
  })

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
