import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/components/Sign/SignTabitemsSignInOauth.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let store
let auth

beforeEach(() => {
  auth = {
    getters: {
      signInForm: () => {
        return { email: 'test@example.com', password: 'password' }
      }
    },
    actions: {
      signIn: jest.fn()
    }
  }

  store = new Vuex.Store({
    modules: {
      auth
    }
  })

  wrapper = mount(Component, {
    localVue,
    store
  })
})

describe('getters', () => {
  it('signInForm', () => {
    expect(wrapper.vm.signInForm).toMatchObject(store.getters.signInForm)
  })
})

describe('v-on', () => {
  it('signIn', () => {
    wrapper.find('.v-btn').trigger('click')
    expect(auth.actions.signIn).toHaveBeenCalled()
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
