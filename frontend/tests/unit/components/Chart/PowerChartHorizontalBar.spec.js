import { shallowMount, createLocalVue } from '@vue/test-utils'
import { Spot } from '@/class/Spot.js'
import Component from '@/components/Chart/PowerChartHorizontalBar.vue'
import PowerWithButton from '@/components/Buttons/PowerWithButton.vue'
import PowerWithoutButton from '@/components/Buttons/PowerWithoutButton.vue'
import ChartBar from '@/components/Chart/ChartBar.vue'

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
  it('PowerWithButton has :spot', () => {
    expect(wrapper.find(PowerWithButton).props().spot).toMatchObject(
      propsData.spot
    )
  })

  it('PowerWithoutButton has :spot', () => {
    expect(wrapper.find(PowerWithoutButton).props().spot).toMatchObject(
      propsData.spot
    )
  })

  it('ChartBar has :plugins', () => {
    expect(wrapper.find(ChartBar).props().plugins).toMatchObject(
      wrapper.vm.plugins
    )
  })

  it('ChartBar has :styles', () => {
    expect(wrapper.find(ChartBar).props().styles).toMatchObject(
      wrapper.vm.styles
    )
  })

  it('ChartBar has :chartData', () => {
    expect(wrapper.find(ChartBar).props().chartData).toMatchObject(
      wrapper.vm.chartData
    )
  })

  it('ChartBar has :options', () => {
    expect(wrapper.find(ChartBar).props().options).toMatchObject(
      wrapper.vm.options
    )
  })

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
