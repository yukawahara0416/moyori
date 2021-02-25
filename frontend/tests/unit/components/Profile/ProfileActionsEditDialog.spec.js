import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import Component from '@/components/Profile/ProfileActionsEditDialog.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.component('ValidationObserver', ValidationObserver)
localVue.component('ValidationProvider', ValidationProvider)

const { required } = require('vee-validate/dist/rules.umd')
extend('required', required)

let wrapper
let propsData
let store
let auth
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
    wrapper = shallowMount(Component, {
      localVue,
      propsData,
      store,
      stubs: ['ValidationObserver']
    })
    expect(wrapper.vm.headers).toEqual(store.getters.headers)
  })
})

describe('computed', () => {
  it('formData', () => {})
})

describe('v-on', () => {
  it('cancelUpdataAccount', () => {})

  it('updateAccountHandler', () => {})
})

describe('methods', () => {
  it('updateAccountHandler', () => {})

  it('updateAccount', () => {})

  it('stpreMutation', () => {})

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
    wrapper = shallowMount(Component, {
      localVue,
      propsData,
      store,
      stubs: ['ValidationObserver']
    })
    wrapper.vm.name = 'update'
    wrapper.vm.clearForm()
    expect(wrapper.vm.name).toEqual(propsData.user.data.name)
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
