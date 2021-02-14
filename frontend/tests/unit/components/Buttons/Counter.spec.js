import { shallowMount, createLocalVue } from '@vue/test-utils'
import { Spot } from '@/class/Spot.js'
import Component from '@/components/Buttons/Counter.vue'

const localVue = createLocalVue()

let wrapper

let options
let propsData

beforeEach(() => {
  options = {
    data: { id: 1 },
    comments: [
      { id: 1, user_id: 1 },
      { id: 2, user_id: 2 }
    ]
  }

  propsData = {
    spot: new Spot(options),
    target: 'comments'
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

  it('target', () => {
    expect(wrapper.props().target).toStrictEqual(propsData.target)
    expect(typeof wrapper.vm.$props.target).toBe('string')
  })
})

describe('computed', () => {
  it('count', () => {
    expect(wrapper.vm.count).toEqual(propsData.spot.comments.length)
  })
})

describe('template', () => {
  it('{{ count }}', () => {
    expect(wrapper.find('p').text()).toEqual(wrapper.vm.count.toString())
  })

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
