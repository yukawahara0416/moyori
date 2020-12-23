import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/components/Profile/ProfileActionsDeleteDialog.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let store
let auth
let snackbar

beforeEach(() => {
  auth = {
    getters: {
      headers: () => {
        return {
          data: { id: 1 }
        }
      }
    },
    mutations: {
      clearHeaders: jest.fn()
    },
    actions: {
      deleteAccount: jest.fn()
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
      snackbar
    }
  })
})

describe('with mock methods', () => {
  const cancelDeleteAccount = jest.fn()
  const deleteAccountHandler = jest.fn()

  beforeEach(() => {
    wrapper = mount(Component, {
      localVue,
      store,
      methods: { cancelDeleteAccount, deleteAccountHandler }
    })
  })

  describe('getters', () => {
    it('headers', () => {
      console.log(auth.getters.headers())
      expect(wrapper.vm.headers).toEqual(auth.getters.headers())
    })
  })

  describe('v-on', () => {
    it('cancelDeleteAccount', () => {
      wrapper
        .findAll('.v-btn')
        .at(0)
        .trigger('click')
      expect(cancelDeleteAccount).toHaveBeenCalledTimes(1)
    })

    it('deleteAccountHandler', () => {
      wrapper
        .findAll('.v-btn')
        .at(1)
        .trigger('click')
      expect(deleteAccountHandler).toHaveBeenCalledTimes(1)
    })
  })

  describe('methods', () => {
    it('$emit.closeDialog', () => {
      wrapper.vm.$emit('closeDialog')
      expect(wrapper.emitted().closeDialog).toBeTruthy()
    })
  })

  describe('template', () => {
    it('snapshot', () => {
      expect(wrapper.vm.$el).toMatchSnapshot()
    })
  })
})

describe('without mock methods', () => {
  const closeDialog = jest.fn()

  beforeEach(() => {
    wrapper = mount(Component, {
      localVue,
      store,
      methods: { closeDialog }
    })
  })

  describe('methods', () => {
    it('deleteAccountHandler', () => {
      wrapper.vm.deleteAccountHandler()
      expect(auth.actions.deleteAccount).toHaveBeenCalled()
    })

    it('cancelDeleteAccount', () => {
      wrapper.vm.cancelDeleteAccount()
      expect(closeDialog).toHaveBeenCalled()
      expect(snackbar.actions.pushSnackbarSuccess).toHaveBeenCalled()
    })
  })
})
