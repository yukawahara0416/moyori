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
    name: null
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
    expect(wrapper.vm.$props.spots).toStrictEqual(propsData.spots)
    expect(wrapper.vm.$props.spots instanceof Array).toBeTruthy()
    expect(wrapper.vm.$options.props.spots.required).toBeTruthy()
  })
})

describe('computed', () => {
  it('empties', () => {
    expect(wrapper.vm.empties.length).toEqual(wrapper.vm.$props.spots.length)
  })

  it('lg return 3', () => {
    wrapper.vm.$route.name = 'profile'
    expect(wrapper.vm.lg).toEqual(3)
  })

  it('lg return 4', () => {
    wrapper.vm.$route.name = 'search'
    expect(wrapper.vm.lg).toEqual(4)
  })

  it('md return 4', () => {
    wrapper.vm.$route.name = 'profile'
    expect(wrapper.vm.md).toEqual(4)
  })

  it('md return 6', () => {
    wrapper.vm.$route.name = 'search'
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
    ).toMatchObject(wrapper.vm.$props.spots[0])
    expect(
      wrapper
        .findAll(CardFrame)
        .at(1)
        .props().spot
    ).toMatchObject(wrapper.vm.$props.spots[1])
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
