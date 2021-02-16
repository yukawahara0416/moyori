import { shallowMount, createLocalVue } from '@vue/test-utils'
import { Spot } from '@/class/Spot.js'
import { myPlugins, chartOptions } from '@/plugins/chart-area.js'
import Component from '@/components/Chart/WifiChartArea.vue'
import ChartArea from '@/components/Chart/ChartArea.vue'

const localVue = createLocalVue()

let wrapper
let propsData

const hasBoth = {
  data: { id: 1 },
  wifi_withs: [
    { id: 1, created_at: '2020-12-02T00:00:00.000Z' }, // 日付が降順
    { id: 2, created_at: '2020-12-01T00:00:00.000Z' }
  ],
  wifi_withouts: [
    { id: 3, created_at: '2020-12-04T00:00:00.000Z' }, // 日付が降順
    { id: 4, created_at: '2020-12-03T00:00:00.000Z' }
  ]
}

const notHasBoth = {
  data: { id: 1 },
  power_withs: [],
  power_withouts: []
}

beforeEach(() => {
  propsData = {
    spot: new Spot(hasBoth)
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
  it('withCount return withs.length', () => {
    const spot = new Spot(hasBoth)

    wrapper.setProps({ spot })
    expect(wrapper.vm.withCount).toEqual(spot.wifi_withs.length)
  })

  it('withCount return 0', () => {
    const spot = new Spot(notHasBoth)

    wrapper.setProps({ spot })
    expect(wrapper.vm.withCount).toEqual(0)
  })

  it('withoutCount return without.length', () => {
    const spot = new Spot(hasBoth)

    wrapper.setProps({ spot })
    expect(wrapper.vm.withoutCount).toEqual(spot.wifi_withouts.length)
  })

  it('withoutCount return 0', () => {
    const spot = new Spot(notHasBoth)

    wrapper.setProps({ spot })
    expect(wrapper.vm.withoutCount).toEqual(0)
  })

  it('hasData', () => {
    const spot = new Spot(hasBoth)

    wrapper.setProps({ spot })
    expect(wrapper.vm.hasData).toBeTruthy()
  })

  it('plugins', () => {
    expect(wrapper.vm.plugins).toMatchObject(myPlugins)
  })

  it('options', () => {
    expect(wrapper.vm.options).toMatchObject(chartOptions)
  })

  it('chartData return datasets', () => {
    const spot = new Spot(hasBoth)
    wrapper.setProps({ spot })

    // 期待されるwifi_withs関連の返り値
    const resultWiths = {
      label: 'あり',
      data: [
        { x: '2020-11-30T00:00:00.000Z', y: 0 }, // firstDay追加, xyData化, countData
        { x: '2020-12-01T00:00:00.000Z', y: 1 }, // sortData（日付が昇順に並べ替えられる）
        { x: '2020-12-02T00:00:00.000Z', y: 2 }
      ],
      pointRadius: 2, // その他設定
      borderWidth: 2,
      borderColor: '#4CAF4F',
      fill: false
    }

    // 期待されるwifi_withouts関連の返り値
    const resultWithouts = {
      label: 'なし',
      data: [
        { x: '2020-11-30T00:00:00.000Z', y: 0 }, // firstDay追加, xyData化, countData
        { x: '2020-12-03T00:00:00.000Z', y: 1 }, // sortData（日付が昇順に並べ替えられる）
        { x: '2020-12-04T00:00:00.000Z', y: 2 }
      ],
      pointRadius: 2, // その他設定
      borderWidth: 2,
      borderColor: '#FF5252',
      fill: false
    }

    expect(wrapper.vm.chartData.datasets[0]).toMatchObject(resultWiths)
    expect(wrapper.vm.chartData.datasets[1]).toMatchObject(resultWithouts)
  })

  it('chartData methods called', () => {
    const f_day = '2020-11-30T00:00:00.000Z'
    const firstDay = jest.fn().mockReturnValue(f_day)
    const convertChartData = jest.fn()

    const spot = new Spot(hasBoth)
    propsData = { spot }

    wrapper = shallowMount(Component, {
      localVue,
      propsData,
      methods: {
        firstDay,
        convertChartData
      }
    })

    expect.assertions(3)

    expect(firstDay).toHaveBeenCalledWith(spot)
    expect(convertChartData).toHaveBeenCalledWith(spot.wifi_withs, f_day)
    expect(convertChartData).toHaveBeenCalledWith(spot.wifi_withouts, f_day)
  })
})

describe('methods', () => {
  const spot = new Spot(hasBoth)

  beforeEach(() => {
    wrapper.setProps({ spot })
  })

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

  const countedData = [
    { x: firstDay, y: 0 },
    { x: '2020-12-01T00:00:00.000Z', y: 1 },
    { x: '2020-12-02T00:00:00.000Z', y: 2 }
  ]

  it('firstDay', () => {
    expect(wrapper.vm.firstDay(propsData.spot)).toEqual(firstDay)
  })

  it('convertChartData', () => {
    expect(wrapper.vm.convertChartData(spot.wifi_withs, firstDay)).toEqual(
      countedData
    )
  })

  it('xyData', () => {
    expect(wrapper.vm.xyData(spot.wifi_withs)).toMatchObject(xyData)
  })

  it('sortData', () => {
    expect(wrapper.vm.sortData(xyData, firstDay)).toMatchObject(sortedData)
  })

  it('countData', () => {
    expect(wrapper.vm.countData(sortedData)).toMatchObject(countedData)
  })
})

describe('template', () => {
  it('ChartArea has :plugins', () => {
    expect(wrapper.find(ChartArea).props().plugins).toMatchObject(
      wrapper.vm.plugins
    )
  })

  it('ChartArea has :styles', () => {
    expect(wrapper.find(ChartArea).props().styles).toMatchObject(
      wrapper.vm.styles
    )
  })

  it('ChartArea has :chartData', () => {
    expect(wrapper.find(ChartArea).props().chartData).toMatchObject(
      wrapper.vm.chartData
    )
  })

  it('ChartArea has :options', () => {
    expect(wrapper.find(ChartArea).props().options).toMatchObject(
      wrapper.vm.options
    )
  })

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
