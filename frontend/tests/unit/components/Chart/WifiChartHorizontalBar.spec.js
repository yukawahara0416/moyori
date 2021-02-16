import { shallowMount, createLocalVue } from '@vue/test-utils'
import { Spot } from '@/class/Spot.js'
import { myPlugins, chartOptions } from '@/plugins/chart-bar.js'
import Component from '@/components/Chart/WifiChartHorizontalBar.vue'

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
  wifi_withs: [],
  wifi_withouts: []
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

  it('withoutCount return withouts.length', () => {
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

  it('chartData return datasets data is exist', () => {
    const spot = new Spot(hasBoth)
    wrapper.setProps({ spot })

    // 期待されるwifi_withs関連の返り値
    const resultWiths = {
      label: 'あり',
      data: [wrapper.vm.withCount],
      datalabels: {
        color: 'white',
        display: true
      },
      backgroundColor: '#4CAF4F'
    }

    // 期待されるwifi_withouts関連の返り値
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

    expect(wrapper.vm.chartData.datasets[0]).toMatchObject(resultWiths)
    expect(wrapper.vm.chartData.datasets[1]).toMatchObject(resultWithouts)
  })

  it('chartData return datasets data is 0', () => {
    const spot = new Spot(notHasBoth)
    wrapper.setProps({ spot })

    // 期待されるwifi_withs関連の返り値
    const resultWiths = {
      label: 'あり',
      data: [1],
      datalabels: {
        color: 'white',
        display: false
      },
      backgroundColor: '#CBCBCB'
    }

    // 期待されるwifi_withouts関連の返り値
    const resultWithouts = {
      label: 'なし',
      data: [1],
      datalabels: {
        color: 'white',
        display: false
      },
      backgroundColor: '#CBCBCB',
      barThickness: 20
    }

    expect(wrapper.vm.chartData.datasets[0]).toMatchObject(resultWiths)
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

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
