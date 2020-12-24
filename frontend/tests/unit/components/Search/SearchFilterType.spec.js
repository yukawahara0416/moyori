import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/components/Search/SearchFilterType.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let store
let spot

beforeEach(() => {
  wrapper = shallowMount(Component, {
    localVue,
    store
  })
})
