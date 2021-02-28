import { shallowMount, createLocalVue } from '@vue/test-utils'
import { Spot } from '@/class/Spot.js'
import Component from '@/components/Spot/SpotDetailInfoPanelWebsite.vue'

const localVue = createLocalVue()

let wrapper
let propsData

beforeEach(() => {
  propsData = {
    spot: new Spot({
      data: { id: 1, url: 'http://www.example.com' }
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
  it('url', () => {
    expect(wrapper.vm.url).toEqual(wrapper.vm.$props.spot.data.url)
  })
})

describe('template', () => {
  it('a has :href', () => {
    expect(wrapper.find('a').attributes().href).toEqual(wrapper.vm.url)
  })

  it('a.text has {{ url }}', () => {
    expect(wrapper.find('a').text()).toEqual(wrapper.vm.url)
  })

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
