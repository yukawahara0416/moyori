import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/components/Sign/SignContainerTabItemsSignUpOauth.vue'

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
    },
    actions: {
      signUp: jest.fn()
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
  it('signUpForm', () => {
    expect(wrapper.vm.signUpForm).toMatchObject(store.getters.signUpForm)
  })
})

describe('v-on', () => {
  it('signUp', () => {
    wrapper.find('.v-btn').trigger('click')
    expect(auth.actions.signUp).toHaveBeenCalled()
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
