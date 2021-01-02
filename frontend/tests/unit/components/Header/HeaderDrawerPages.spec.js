import { shallowMount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Header/HeaderDrawerPages.vue'

const localVue = createLocalVue()

let wrapper

beforeEach(() => {
  wrapper = shallowMount(Component, {
    localVue
  })
})

describe('template', () => {
  it('v-list-item has :to', () => {
    const target = wrapper.findAll('v-list-item-stub')
    expect(target.at(0).attributes().to).toEqual('/about')
    expect(target.at(1).attributes().to).toEqual('/rules')
    expect(target.at(2).attributes().to).toEqual('/privacy')
  })
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
