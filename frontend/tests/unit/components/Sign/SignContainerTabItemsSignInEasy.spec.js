import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/components/Sign/SignContainerTabItemsSignInEasy.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let store
let auth

beforeEach(() => {
  auth = {
    getters: {
      isLoggingIn: () => true
    }
  }

  store = new Vuex.Store({
    modules: {
      auth
    }
  })

  wrapper = shallowMount(Component, {
    localVue,
    store
  })
})

describe('getters', () => {})
describe('v-on', () => {})
describe('template', () => {})
