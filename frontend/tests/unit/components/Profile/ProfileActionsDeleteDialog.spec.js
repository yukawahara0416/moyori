import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { axiosBase } from '@/plugins/axios.js'
import MockAdapter from 'axios-mock-adapter'
import Component from '@/components/Profile/ProfileActionsDeleteDialog.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

const axiosMock = new MockAdapter(axiosBase)

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
  it('deleteAccountHandler', () => {
    const deleteAccount = jest.fn()
    const closeDialog = jest.fn()

    wrapper = shallowMount(Component, {
      localVue,
      store,
      methods: { deleteAccount, closeDialog }
    })

    expect.assertions(4)

    return wrapper.vm.deleteAccountHandler().then(() => {
      expect(deleteAccount).toHaveBeenCalledWith(auth.getters.headers())
      expect(auth.mutations.clearHeaders).toHaveBeenCalled()
      expect(closeDialog).toHaveBeenCalled()
      expect(snackbar.actions.pushSnackbarSuccess).toHaveBeenCalledWith(
        expect.any(Object),
        {
          message: 'アカウントを削除しました'
        }
      )
    })
  })

  it('deleteAccount', () => {
    const response = { id: 1 }
    const headers = auth.getters.headers()

    axiosMock.onDelete('/api/v1/auth/').reply(200, response)

    return wrapper.vm.deleteAccount(headers).then(res => {
      expect(res.data).toMatchObject(response)
    })
  })

  it('deleteAccount 404 error', () => {
    const headers = auth.getters.headers()

    axiosMock.onDelete('/api/v1/auth/').reply(404)

    return wrapper.vm.deleteAccount(headers).catch(err => {
      expect(err).toStrictEqual(new Error('アカウントの削除に失敗しました'))
    })
  })

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
