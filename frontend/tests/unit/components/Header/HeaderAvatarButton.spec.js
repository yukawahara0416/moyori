import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/components/Header/HeaderAvatarButton.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper

beforeEach(() => {
  wrapper = shallowMount(Component, {
    localVue
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
