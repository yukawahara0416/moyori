import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/components/Sign/SignContainerTabItemsSignInOauth.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let store

beforeEach(() => {
  store = new Vuex.Store({
    modules: {}
  })

  wrapper = mount(Component, {})
})

describe('getters', () => {
  expect(wrapper.vm.signInForm).toMatchObject(store.getters.signInForm)
})

describe('v-on', () => {})
describe('template', () => {})
