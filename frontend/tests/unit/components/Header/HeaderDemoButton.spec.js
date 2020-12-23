import { mount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Header/HeaderDemoButton.vue'

const localVue = createLocalVue()

let wrapper

const demoSearch = jest.fn()

beforeEach(() => {
  wrapper = mount(Component, {
    localVue
  })
})

describe('v-on', () => {
  it('demoSearch', () => {
    wrapper.find('.v-btn').trigger('click')
    // expect()
  })
})
