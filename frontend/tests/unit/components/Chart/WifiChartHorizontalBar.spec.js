import { shallowMount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Chart/WifiChartHorizontalBar.vue'

const localVue = createLocalVue()

let wrapper
let propsData

beforeEach(() => {
  propsData = {
    spot: {
      data: { id: 1 },
      wifi_withs: [
        { id: 1, created_at: '2020-12-01T00:00:00.000Z' },
        { id: 2, created_at: '2020-12-02T00:00:00.000Z' }
      ],
      wifi_withouts: [
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
    expect(wrapper.vm.withCount).toEqual(propsData.spot.wifi_withs.length)
  })

  it('withoutCount', () => {
    expect(wrapper.vm.withoutCount).toEqual(propsData.spot.wifi_withouts.length)
  })

  it('hasData', () => {
    expect(wrapper.vm.hasData).toBe(true)
  })

  it('chartData', () => {
    const resultWiths = {
      label: 'あり',
      data: [wrapper.vm.withCount],
      datalabels: {
        color: 'white',
        display: true
      },
      backgroundColor: '#4CAF4F'
    }
    expect(wrapper.vm.chartData.datasets[0]).toMatchObject(resultWiths)

    const resultWithouts = {
      label: 'なし',
      data: [wrapper.vm.withoutCount],
      datalabels: {
        color: 'white',
        display: true
      },
      backgroundColor: '#FF5252',
      barThickness: 20
    }
    expect(wrapper.vm.chartData.datasets[1]).toMatchObject(resultWithouts)
  })
})

describe('template', () => {
  it('wifi-with-button has :spot', () => {
    expect(wrapper.find('wifi-with-button-stub').attributes().spot).toEqual(
      '[object Object]'
    )
  })

  it('wifi-without-button has :spot', () => {
    expect(wrapper.find('wifi-without-button-stub').attributes().spot).toEqual(
      '[object Object]'
    )
  })

})
