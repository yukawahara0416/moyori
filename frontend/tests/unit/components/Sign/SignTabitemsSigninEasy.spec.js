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

    it('isLoggingIn is false', async () => {
      auth.getters.isLoggingIn = () => false

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

      await wrapper.setData({ testUser })

      expect.assertions(8)

      return wrapper.vm.signInAsTestUser().then(() => {
        expect(auth.actions.signIn).toHaveBeenCalledWith(
          expect.any(Object),
          testUser
        )
        expect(auth.mutations.setCurrentUser).toHaveBeenCalledWith(
          expect.any(Object),
          currentUser
        )
        expect(auth.mutations.setCurrentUser).toHaveBeenCalledWith(
          expect.any(Object),
          headers
        )
        expect(dialog.actions.dialogOff).toHaveBeenCalledWith(
          expect.any(Object),
          'dialogSign'
        )
        expect(auth.mutations.clearSignInForm).toHaveBeenCalled()
        expect(auth.mutations.clearSignUpForm).toHaveBeenCalled()
        expect(snackbar.actions.pushSnackbarSuccess).toHaveBeenCalledWith(
          expect.any(Object),
          {
            message: 'ログインしました'
          }
        )
        expect(snackbar.actions.pushSnackbarError).not.toHaveBeenCalled()
      })
    })
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
