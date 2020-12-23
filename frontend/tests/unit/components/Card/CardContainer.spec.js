import { shallowMount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Card/CardContainer.vue'

const localVue = createLocalVue()

let wrapper
let propsData
let $route

beforeEach(() => {
  propsData = {
    spots: [
      {
        data: { id: 1 }
      },
      {
        data: { id: 2 }
      }
    ]
  }

  $route = {
    name: 'search'
  }

  wrapper = shallowMount(Component, {
    localVue,
    propsData,
    mocks: {
      $route
    }
  })
})

describe('props', () => {
  it('spots', () => {
    expect(wrapper.props().spots).toStrictEqual(propsData.spots)
    expect(wrapper.props().spots instanceof Array).toBe(true)
  })
})

describe('computed', () => {
  it('empties', () => {
    expect(wrapper.vm.empties.length).toEqual(propsData.spots.length)
  })

  it('lg', () => {
    expect(wrapper.vm.lg).toEqual(4)
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
