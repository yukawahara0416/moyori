import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/components/Header/HeaderAvatarButton.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let store

beforeEach(() => {
  store = new Vuex.Store()

  wrapper = shallowMount(Component, {
    localVue,
    store
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
