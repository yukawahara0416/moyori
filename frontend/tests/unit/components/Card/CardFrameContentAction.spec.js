import { shallowMount, createLocalVue } from '@vue/test-utils'
import { Spot } from '@/class/Spot.js'
import Component from '@/components/Card/CardFrameContentAction.vue'
import WifiChartHorizontalBar from '@/components/Chart/WifiChartHorizontalBar.vue'
import PowerChartHorizontalBar from '@/components/Chart/PowerChartHorizontalBar.vue'
import SpotDetailShowButton from '@/components/Buttons/SpotDetailShowButton.vue'

const localVue = createLocalVue()

let wrapper
let propsData

beforeEach(() => {
  propsData = {
    spot: new Spot({ data: { id: 1 } })
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

describe('template', () => {
  it('WifiChartHorizontalBar has :spot', () => {
    expect(wrapper.find(WifiChartHorizontalBar).props().spot).toMatchObject(
      propsData.spot
    )
  })
  it('PowerChartHorizontalBar has :spot', () => {
    expect(wrapper.find(PowerChartHorizontalBar).props().spot).toMatchObject(
      propsData.spot
    )
  })
  it('SpotDetailShowButton has :spot', () => {
    expect(wrapper.find(SpotDetailShowButton).props().spot).toMatchObject(
      propsData.spot
    )
  })
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
