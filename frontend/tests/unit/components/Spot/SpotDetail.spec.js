import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import Component from '@/components/Spot/SpotDetail.vue'

const localVue = createLocalVue()
localVue.use(Vuetify)

let wrapper
let propsData
let vuetify

beforeEach(() => {
  propsData = {
    spot: { data: { id: 1 } }
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
    expect(wrapper.props().spot instanceof Object).toBeTruthy()
  })
})

describe('emit', () => {
  it('closeDialog', () => {
    wrapper.vm.closeDialog()
    expect(wrapper.emitted('closeDialog')).toBeTruthy()
  })
})

describe('computed', () => {
  it('cols', () => {
    expect(wrapper.vm.cols).toEqual(6)
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
      wrapper.find('spot-detail-info-panel-stub').attributes().spot
    ).toEqual('[object Object]')
  })

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
