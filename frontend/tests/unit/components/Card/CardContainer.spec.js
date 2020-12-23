import { shallowMount } from '@vue/test-utils'
import Component from '@/components/Card/CardContainer.vue'

let wrapper
let propsData
let $route

beforeEach(() => {
  propsData = {
    spots: [{ data: { id: 1 } }, { data: { id: 2 } }]
    // type: 'map'
  }

  $route = {
    name: 'search'
  }

  wrapper = shallowMount(Component, {
    propsData,
    mocks: {
      $route
    }
  })
})

// afterEach(() => {
//   wrapper.destroy()
// })

describe('props', () => {
  it('spots', () => {
    expect(wrapper.props().spots).toStrictEqual(propsData.spots)
    expect(wrapper.props().spots instanceof Array).toBe(true)
  })
  // it('type', () => {
  //   expect(wrapper.props().type).toStrictEqual(propsData.type)
  //   expect(typeof wrapper.vm.$props.type).toBe('string')
  // })
})

// describe('computed', () => {
//   it('empties', () => {})
// })

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
