import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
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

  wrapper = shallowMount(Component, {
    localVue,
    store
  })
})

describe('getters', () => {
  it('headers', () => {
    expect(wrapper.vm.headers).toEqual(store.getters.headers)
  })
})

describe('v-on', () => {
  const cancelDeleteAccount = jest.fn()
  const deleteAccountHandler = jest.fn()

  beforeEach(() => {
    wrapper = mount(Component, {
      localVue,
      store,
      methods: { cancelDeleteAccount, deleteAccountHandler }
    })
  })

  it('click cancelDeleteAccount', () => {
    wrapper
      .findAll('.v-btn')
      .at(0)
      .trigger('click')
    expect(cancelDeleteAccount).toHaveBeenCalled()
  })

  it('click deleteAccountHandler', () => {
    wrapper
      .findAll('.v-btn')
      .at(1)
      .trigger('click')
    expect(deleteAccountHandler).toHaveBeenCalled()
  })
})

describe('methods', () => {
  it('deleteAccountHandler', () => {})

  it('deleteAccount', () => {})

  it('cancelDeleteAccount', () => {
    const closeDialog = jest.fn()

    wrapper = shallowMount(Component, {
      localVue,
      store,
      methods: { closeDialog }
    })

    wrapper.vm.cancelDeleteAccount()
    expect(closeDialog).toHaveBeenCalled()
    expect(snackbar.actions.pushSnackbarSuccess).toHaveBeenCalledWith(
      expect.any(Object),
      {
        message: 'アカウントの削除をキャンセルしました'
      }
    )
  })
})

describe('emit', () => {
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
