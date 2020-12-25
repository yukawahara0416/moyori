import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/components/Sign/SignContainerTabItemsSignUpEmail.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let store
let auth

beforeEach(() => {
  auth = {
    getters: {
      signUpForm: () => {
        return { name: 'test', email: 'test@example.com', password: 'passowrd' }
      }
    }
  }

  store = new Vuex.Store({
    modules: {
      auth
    }
  })

  wrapper = shallowMount(Component, {})
})

describe('getters', () => {})

describe('template', () => {})
