import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/components/Header/Header.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
// let getters
let store
let auth

beforeEach(() => {
  // getters = {
  //   headers: () => ({ uid: 'tester@example.com' }),
  //   currentUser: () => ({ data: { id: 1 } })
  // }

  auth = {
    getters: {
      isLoggingIn: () => false
    }
  }

  store = new Vuex.Store({
    modules: {
      auth
    }
    // getters
  })

  wrapper = shallowMount(Component, {
    localVue,
    store
  })
})

// afterEach(() => {
//   wrapper.destroy()
// })

describe('getters', () => {
  it('isLoggingIn', () => {
    expect(wrapper.vm.isLoggingIn).toEqual(auth.getters.isLoggingIn())
  })
  // it('headers', () => {
  //   expect(wrapper.vm.headers).toEqual(getters.headers())
  // })

  // it('currentUser', () => {
  //   expect(wrapper.vm.currentUser).toEqual(getters.currentUser())
  // })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
