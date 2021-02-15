import { shallowMount, createLocalVue } from '@vue/test-utils'
import { Spot } from '@/class/Spot.js'
import Component from '@/components/Chart/PowerChartArea.vue'

const localVue = createLocalVue()

let wrapper
let propsData

beforeEach(() => {
  propsData = {
    spot: new Spot({
      data: { id: 1 },
      power_withs: [
        { id: 1, created_at: '2020-12-01T00:00:00.000Z' },
        { id: 2, created_at: '2020-12-02T00:00:00.000Z' }
      ],
      power_withouts: [
        { id: 3, created_at: '2020-12-03T00:00:00.000Z' },
        { id: 4, created_at: '2020-12-04T00:00:00.000Z' }
      ]
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
  it('withCount', () => {
    expect(wrapper.vm.withCount).toEqual(propsData.spot.power_withs.length)
  })

  it('withoutCount', () => {
    expect(wrapper.vm.withoutCount).toEqual(
      propsData.spot.power_withouts.length
    )
  })

  it('hasData', () => {
    expect(wrapper.vm.hasData).toBeTruthy()
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

  it('firstDay', () => {
    expect(wrapper.vm.firstDay(propsData.spot)).toEqual(firstDay)
  })

  it('convertChartData', () => {
    expect(wrapper.vm.convertChartData(target, firstDay)).toEqual(result)
  })

  it('xyData', () => {
    expect(wrapper.vm.xyData(target)).toMatchObject(xyData)
  })

  it('sortData', () => {
    expect(wrapper.vm.sortData(xyData, firstDay)).toMatchObject(sortedData)
  })

  it('countData', () => {
    expect(wrapper.vm.countData(sortedData)).toMatchObject(result)
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
