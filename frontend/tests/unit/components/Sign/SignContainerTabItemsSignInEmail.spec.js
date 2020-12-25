import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/components/Sign/SignContainerTabItemsSignInEasy.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let store
let auth

beforeEach(() => {
  wrapper = mount(Component, {
    localVue
  })
})
