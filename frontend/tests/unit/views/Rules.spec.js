import { shallowMount, createLocalVue } from '@vue/test-utils'
import Component from '@/views/Rules.vue'

const localVue = createLocalVue()

let wrapper

beforeEach(() => {
  wrapper = shallowMount(Component, {
    localVue
  })
})
