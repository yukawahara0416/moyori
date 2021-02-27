import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/components/Sign/SignTabitemsSigninEasy.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let store
let auth
let dialog
let snackbar

beforeEach(() => {
  auth = {
    getters: {
      isLoggingIn: () => true
    },
    mutations: {
      setCurrentUser: jest.fn(),
      setHeaders: jest.fn(),
      clearSignInForm: jest.fn(),
      clearSignUpForm: jest.fn()
    },
    actions: {
      signIn: jest
        .fn()
        .mockResolvedValue({ data: { data: { id: 1 } }, headers: { id: 1 } })
    }
  }

  dialog = {
    actions: {
      dialogOff: jest.fn()
    }
  }

  snackbar = {
    actions: {
      pushSnackbarSuccess: jest.fn(),
      pushSnackbarError: jest.fn()
    }
  }

  store = new Vuex.Store({
    modules: {
      auth,
      dialog,
      snackbar
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

describe('methods', () => {
  describe('signInAsTestUser', () => {
    const testUser = {
      email: 'tester@example.com',
      password: 'password'
    }

    const currentUser = { id: 1 }
    const headers = { id: 1 }

    it('isLoggingIn is true', async () => {
      await wrapper.setData({ testUser })

      expect.assertions(1)

      return wrapper.vm.signInAsTestUser().then(() => {
        expect(snackbar.actions.pushSnackbarError).toHaveBeenCalledWith(
          expect.any(Object),
          {
            message: new Error('すでにログイン中です')
          }
        )
      })
    })

  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
