import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/components/Profile/ProfileActionsDeleteDialog.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let store
let auth
let snackbar

// const cancelDeleteAccount = jest.fn()
// const deleteAccountHandler = jest.fn()
const deleteAccount = jest.fn()

beforeEach(() => {
  auth = {
    getters: {
      headers: () => {}
    },
    mutations: {
      clearHeaders: jest.fn()
    },
    actions: { deleteAccount }
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

  // wrapper = mount(Component, {
  //   localVue,
  //   store,
  //   methods: { cancelDeleteAccount, deleteAccountHandler }
  // })
})

// afterEach(() => {
//   wrapper.destroy()
// })

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

describe('methods', () => {
  beforeEach(() => {
    wrapper = mount(Component, {
      localVue,
      store
    })
  })

  it('deleteAccountHandler', () => {
    wrapper.vm.deleteAccountHandler()
    // expect(deleteAccount).toHaveBeenCalled()
    expect(auth.actions.deleteAccount).toHaveBeenCalled()
  })
})
