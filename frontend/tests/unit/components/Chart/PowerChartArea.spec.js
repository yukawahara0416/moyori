import { shallowMount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Chart/PowerChartArea.vue'

const localVue = createLocalVue()

let wrapper
let propsData

beforeEach(() => {
  propsData = {
    spot: {
      data: { id: 1 },
      power_withs: [
        { id: 1, created_at: '2020-12-01T00:00:00.000Z' },
        { id: 2, created_at: '2020-12-02T00:00:00.000Z' }
      ],
      power_withouts: [
        { id: 3, created_at: '2020-12-03T00:00:00.000Z' },
        { id: 4, created_at: '2020-12-04T00:00:00.000Z' }
      ]
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

describe('computed', () => {
  it('withCount', () => {
    expect(wrapper.vm.withCount).toEqual(propsData.spot.power_withs.length)
  })

  it('withoutCount', () => {
    expect(wrapper.vm.withoutCount).toEqual(
      propsData.spot.power_withouts.length
    )
  })

  it('hasData', () => {
    expect(wrapper.vm.hasData).toBe(true)
  })

})
