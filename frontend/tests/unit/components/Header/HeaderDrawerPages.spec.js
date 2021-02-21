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

    expect(target.length).toEqual(2)
    expect(target.at(0).attributes().to).toEqual('/rules')
    expect(target.at(1).attributes().to).toEqual('/privacy')
  })

  it('v-icon has icon', () => {
    const target = wrapper.findAll('v-icon-stub')

    expect(target.length).toEqual(2)
    expect(target.at(0).text()).toEqual('mdi-book-open-page-variant')
    expect(target.at(1).text()).toEqual('mdi-security')
  })
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
