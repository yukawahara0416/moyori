import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/components/Sign/SignContainerTabItemsSignInEasy.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let store
let auth

beforeEach(() => {
  store = new Vuex.Store({
    modules: {}
  })

  wrapper = shallowMount(Component, {
    localVue
  })
})

describe('getters', () => {})
describe('v-on', () => {})
describe('template', () => {})
