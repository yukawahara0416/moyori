import { shallowMount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Card/CardContainer.vue'
import CardFrame from '@/components/Card/CardFrame.vue'

const localVue = createLocalVue()

let wrapper
let propsData
let $route

beforeEach(() => {
  propsData = {
    spots: [{ data: { id: 1 } }, { data: { id: 2 } }]
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
    expect(wrapper.props().spots instanceof Array).toBeTruthy()
  })
})

describe('computed', () => {
  it('empties', () => {
    expect(wrapper.vm.empties.length).toEqual(propsData.spots.length)
  })

  it('lg', () => {
    expect(wrapper.vm.lg).toEqual(4)
  })

  it('md', () => {
    expect(wrapper.vm.md).toEqual(6)
  })
})

describe('template', () => {
  it('CardFrame has :spot', () => {
    expect(
      wrapper
        .findAll(CardFrame)
        .at(0)
        .props().spot
    ).toMatchObject(propsData.spots[0])
    expect(
      wrapper
        .findAll(CardFrame)
        .at(1)
        .props().spot
    ).toMatchObject(propsData.spots[1])
  })

  it('CardFrame has :id', () => {
    expect(
      wrapper
        .findAll(CardFrame)
        .at(0)
        .props().id
    ).toEqual(0)
    expect(
      wrapper
        .findAll(CardFrame)
        .at(1)
        .props().id
    ).toEqual(1)
  })

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
