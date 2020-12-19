import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/components/Profile/ProfileActionsDeleteDialog.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let store
let auth
let snackbar

const cancelDeleteAccount = jest.fn()
const deleteAccountHandler = jest.fn()

beforeEach(() => {
  auth = {
    getters: {
      headers: () => {}
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

  wrapper = mount(Component, {
    localVue,
    store,
    methods: { cancelDeleteAccount, deleteAccountHandler }
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('v-on', () => {
  // it('dialogOff', () => {
  //   const event = jest.fn()
  //   wrapper.setMethods({ dialogOff: event })
  //   wrapper
  //     .findAll('.v-btn')
  //     .at(0)
  //     .trigger('click')
  //   expect(event).toHaveBeenCalledTimes(1)
  // })

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

  // it('deleteAccount, dialogOff', () => {
  //   const event1 = jest.fn()
  //   const event2 = jest.fn()
  //   wrapper.setMethods({ dialogOff: event1, deleteAccount: event2 })
  //   wrapper
  //     .findAll('.v-btn')
  //     .at(1)
  //     .trigger('click')
  //   expect(event1).toHaveBeenCalledTimes(1)
  //   expect(event2).toHaveBeenCalledTimes(1)
  // })
})

describe('getters', () => {
  it('headers', () => {
    expect(wrapper.vm.headers).toEqual(auth.getters.headers())
  })
})

describe('methods', () => {
  it('$emit.closeDialog', () => {
    wrapper.vm.$emit('closeDialog')
    expect(wrapper.emitted().closeDialog).toBeTruthy()
  })
})

describe('actions', () => {
  // it('dialogOff', () => {
  //   wrapper.vm.dialogOff()
  //   expect(actions.dialogOff).toHaveBeenCalled()
  // })
  // it('deleteAccount', () => {
  //   wrapper.vm.deleteAccount()
  //   expect(actions.deleteAccount).toHaveBeenCalled()
  // })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
