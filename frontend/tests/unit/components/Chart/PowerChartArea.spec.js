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

  it('chartData', () => {
    const resultWiths = {
      label: 'あり',
      data: [
        { x: '2020-11-30T00:00:00.000Z', y: 0 },
        { x: '2020-12-01T00:00:00.000Z', y: 1 },
        { x: '2020-12-02T00:00:00.000Z', y: 2 }
      ],
      pointRadius: 2,
      borderWidth: 2,
      borderColor: '#4CAF4F',
      fill: false
    }
    expect(wrapper.vm.chartData.datasets[0]).toMatchObject(resultWiths)

    const resultWithouts = {
      label: 'なし',
      data: [
        { x: '2020-11-30T00:00:00.000Z', y: 0 },
        { x: '2020-12-03T00:00:00.000Z', y: 1 },
        { x: '2020-12-04T00:00:00.000Z', y: 2 }
      ],
      pointRadius: 2,
      borderWidth: 2,
      borderColor: '#FF5252',
      fill: false
    }
    expect(wrapper.vm.chartData.datasets[1]).toMatchObject(resultWithouts)
  })
})

describe('methods', () => {
  const target = [
    { id: 2, created_at: '2020-12-02T00:00:00.000Z' },
    { id: 1, created_at: '2020-12-01T00:00:00.000Z' }
  ]

  const firstDay = '2020-11-30T00:00:00.000Z'

  const xyData = [
    { x: '2020-12-02T00:00:00.000Z', y: null },
    { x: '2020-12-01T00:00:00.000Z', y: null }
  ]

  const sortedData = [
    { x: firstDay, y: null },
    { x: '2020-12-01T00:00:00.000Z', y: null },
    { x: '2020-12-02T00:00:00.000Z', y: null }
  ]

  const result = [
    { x: firstDay, y: 0 },
    { x: '2020-12-01T00:00:00.000Z', y: 1 },
    { x: '2020-12-02T00:00:00.000Z', y: 2 }
  ]

  it('convertChartData', () => {
    expect(wrapper.vm.convertChartData(withs)).toEqual(resultWiths)
  })

  it('xyData', () => {
    expect(wrapper.vm.xyData(withs)).toMatchObject(resultWiths)
  })

  it('sortData', () => {
    expect(wrapper.vm.sortData(resultWiths)).toMatchObject(resultWiths)
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
