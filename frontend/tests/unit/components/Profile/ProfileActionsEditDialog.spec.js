import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { axiosBase } from '@/plugins/axios.js'
import MockAdapter from 'axios-mock-adapter'
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import Component from '@/components/Profile/ProfileActionsEditDialog.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.component('ValidationObserver', ValidationObserver)
localVue.component('ValidationProvider', ValidationProvider)

const { required } = require('vee-validate/dist/rules.umd')
extend('required', required)

const axiosMock = new MockAdapter(axiosBase)

let wrapper
let propsData
let store
let auth
let user
let snackbar

beforeEach(() => {
  propsData = {
    user: {
      data: {
        id: 1,
        name: 'name',
        email: 'email',
        avatar: 'avatar'
      }
    }
  }

  auth = {
    getters: {
      headers: () => {
        return {
          data: {
            id: 1
          }
        }
      }
    },
    mutations: {
      updateCurrentUser: jest.fn()
    }
  }

  user = {
    namespaced: true,
    mutations: {
      updateUser: jest.fn()
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
      user,
      snackbar
    }
  })

  wrapper = shallowMount(Component, {
    localVue,
    propsData,
    store
  })
})

describe('props', () => {
  it('user', () => {
    expect(wrapper.vm.$props.user).toStrictEqual(propsData.user)
    expect(wrapper.vm.$props.user instanceof Object).toBeTruthy()
    expect(wrapper.vm.$options.props.user.required).toBeTruthy()
  })
})

describe('getters', () => {
  it('headers', () => {
    expect(wrapper.vm.headers).toEqual(store.getters.headers)
  })
})

describe('computed', () => {
  it('formData', () => {})
})

describe('methods', () => {
  it('updateAccountHandler', () => {})

  it('updateAccount 200', () => {
    const response = { data: { id: 1 } }

    axiosMock.onPatch('/api/v1/auth/').reply(200, response)

    return wrapper.vm.updateAccount().then(res => {
      expect(res).toMatchObject(response.data)
    })
  })

  it('updateAccount 404', () => {
    axiosMock.onPatch('/api/v1/auth/').reply(404)

    return wrapper.vm.updateAccount().catch(err => {
      expect(err).toStrictEqual(new Error('アカウントの編集に失敗しました'))
    })
  })

  it('storeMutation', () => {
    const update = {
      name: 'up_name',
      email: 'up_email',
      avatar: 'up_avatar'
    }
    wrapper.vm.storeMutation(update)

    expect(auth.mutations.updateCurrentUser).toHaveBeenCalledWith(
      expect.any(Object),
      {
        name: update.name,
        email: update.email,
        avatar: update.avatar
      }
    )
    expect(user.mutations.updateUser).toHaveBeenCalledWith(expect.any(Object), {
      name: update.name,
      email: update.email,
      avatar: update.avatar
    })
  })

  it('cancelUpdateAccount', () => {
    const closeDialog = jest.fn()
    wrapper = shallowMount(Component, {
      localVue,
      propsData,
      store,
      methods: { closeDialog },
      stubs: ['ValidationObserver']
    })
    wrapper.vm.cancelUpdateAccount()
    expect(closeDialog).toHaveBeenCalled()
    expect(snackbar.actions.pushSnackbarSuccess).toHaveBeenCalled()
  })

  it('$emit/closeDialog', () => {
    const clearForm = jest.fn()
    wrapper = shallowMount(Component, {
      localVue,
      propsData,
      store,
      methods: { clearForm },
      stubs: ['ValidationObserver']
    })
    wrapper.vm.$emit('closeDialog')
    expect(wrapper.emitted().closeDialog).toBeTruthy()
  })

  it('clearForm', () => {
    wrapper.setData({ name: 'update' })
    wrapper.vm.clearForm()
    expect(wrapper.vm.name).toEqual(wrapper.vm.$props.user.data.name)
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
