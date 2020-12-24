import { shallowMount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Search/SearchFilterResult.vue'

const localVue = createLocalVue()

let wrapper
let propsData

beforeEach(() => {
  propsData = {
    spots: [{ data: { id: 1 } }, { data: { id: 2 } }],
    filteredSpots: [{ data: { id: 2 } }]
  }

  wrapper = shallowMount(Component, {
    localVue,
    propsData
  })
})

describe('props', () => {
  it('spots', () => {
    expect(wrapper.props().spots).toStrictEqual(propsData.spots)
    expect(wrapper.props().spots instanceof Array).toBe(true)
  })

  it('filteredSpots', () => {
    expect(wrapper.props().filteredSpots).toStrictEqual(propsData.filteredSpots)
    expect(wrapper.props().filteredSpots instanceof Array).toBe(true)
  })
})

describe('template', () => {
  it('v-card-subtitle text', () => {
    expect(wrapper.find('v-card-subtitle-stub').text()).toEqual(
      '2 件中 1 件を表示'
    )
  })

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
