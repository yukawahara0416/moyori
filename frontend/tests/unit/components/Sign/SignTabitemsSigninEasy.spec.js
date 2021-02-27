import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/components/Sign/SignTabitemsSigninEasy.vue'

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

describe('getters', () => {
  it('isLoggingIn', () => {
    expect(wrapper.vm.isLoggingIn).toBe(store.getters.isLoggingIn)
  })
})

describe('v-on', () => {
  it('signInAsTestUser', () => {
    const signInAsTestUser = jest.fn()

    wrapper = mount(Component, {
      localVue,
      store,
      methods: {
        signInAsTestUser
      }
    })

    wrapper.find('.v-btn').trigger('click')
    expect(signInAsTestUser).toHaveBeenCalled()
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
