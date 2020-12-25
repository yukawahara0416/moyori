import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/components/Sign/SignContainerTabItemsSignUpEmail.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let store
let auth

beforeEach(() => {
  store = new Vuex.Store({
    modules: {}
  })
  wrapper = shallowMount(Component, {})
})

describe('getters', () => {})

describe('template', () => {})
