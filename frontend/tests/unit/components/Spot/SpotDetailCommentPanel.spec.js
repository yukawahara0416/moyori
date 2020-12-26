// props
// v-if
// template spot

import { shallowMount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Search/SearchMapContainer.vue'

const localVue = createLocalVue()

let wrapper

beforeEach(() => {
  wrapper = shallowMount(Component, {
    localVue
  })
})

describe('props', () => {})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
