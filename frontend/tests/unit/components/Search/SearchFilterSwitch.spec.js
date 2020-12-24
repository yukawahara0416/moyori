import { shallowMount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Search/SearchFilterSwitch.vue'

const localVue = createLocalVue()

let wrapper

beforeEach(() => {
  wrapper = shallowMount(Component, {
    localVue
  })
})
