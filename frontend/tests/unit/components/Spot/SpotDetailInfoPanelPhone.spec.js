import { shallowMount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Spot/SpotDetailInfoPanelPhone.vue'

const localVue = createLocalVue()

let wrapper
let propsData

beforeEach(() => {
  propsData = {
    spot: {
      data: { id: 1, phone: '123456789' }
    }
  }

  wrapper = shallowMount(Component, {
    localVue,
    propsData
  })
})

describe('props', () => {
  it('spot', () => {
    expect(wrapper.props().spot).toStrictEqual(propsData.spot)
    expect(wrapper.props().spot instanceof Object).toBe(true)
  })
})
