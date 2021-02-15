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
    expect(wrapper.vm.$props.spots).toStrictEqual(propsData.spots)
    expect(wrapper.vm.$props.spots instanceof Array).toBeTruthy()
  })

  it('filteredSpots', () => {
    expect(wrapper.vm.$props.filteredSpots).toStrictEqual(
      propsData.filteredSpots
    )
    expect(wrapper.vm.$props.filteredSpots instanceof Array).toBeTruthy()
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
