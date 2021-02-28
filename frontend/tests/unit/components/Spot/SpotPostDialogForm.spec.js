import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import Component from '@/components/Spot/SpotPostDialogForm.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.component('ValidationObserver', ValidationObserver)
localVue.component('ValidationProvider', ValidationProvider)

const { required } = require('vee-validate/dist/rules.umd')
extend('required', required)

let wrapper
let store
let auth
let form
let dialog
let snackbar
let vuetify

beforeEach(() => {
  auth = {
    getters: {
      headers: () => {
        return {
          data: { id: 1 }
        }
      }
    }
  }

  form = {
    getters: {
      spotForm: () => {
        return {
          place_id: ''
        }
      },
      formData: () => 'formData'
    },
    mutations: {
      clearSpotForm: jest.fn()
    }
  }

  dialog = {
    actions: {
      dialogOff: jest.fn()
    }
  }

  snackbar = {
    actions: {
      pushSnackbarSuccess: jest.fn()
    }
  }

  store = new Vuex.Store({
    modules: {
      auth,
      form,
      dialog,
      snackbar
    }
  })

  vuetify = new Vuetify()

  wrapper = shallowMount(Component, {
    localVue,
    store,
    vuetify
  })
})

describe('getters', () => {
  it('spotForm', () => {
    expect(wrapper.vm.spotForm).toMatchObject(store.getters.spotForm)
  })

  it('headers', () => {
    expect(wrapper.vm.headers).toMatchObject(store.getters.headers)
  })

  it('formData', () => {
    expect(wrapper.vm.formData).toEqual(store.getters.formData)
  })
})

describe('computed', () => {
  it('cols', () => {
    expect(wrapper.vm.cols).toEqual(6)
  })
})

describe('v-on', () => {
  it('click cancelPostSpot', () => {})

  it('click postSpotHandler', () => {})
})

describe('methods', () => {
  it('cancelPostSpot', () => {
    const closeDialog = jest.fn()

    wrapper = shallowMount(Component, {
      localVue,
      store,
      vuetify,
      methods: {
        closeDialog
      }
    })

    wrapper.vm.cancelPostSpot()
    expect(closeDialog).toHaveBeenCalled()
    expect(snackbar.actions.pushSnackbarSuccess).toHaveBeenCalled()
  })

  it('closeDialog', () => {
    const clearForm = jest.fn()

    wrapper = shallowMount(Component, {
      localVue,
      store,
      vuetify,
      methods: {
        clearForm
      }
    })

    wrapper.vm.closeDialog()
    expect(dialog.actions.dialogOff).toHaveBeenCalled()
    expect(form.mutations.clearSpotForm).toHaveBeenCalled()
    expect(clearForm).toHaveBeenCalled()
  })

  it('clearForm', () => {
    wrapper.vm.image = 'update'
    wrapper.vm.uploadImageUrl = 'update'
    wrapper.vm.wifi_radio = 'update'
    wrapper.vm.power_radio = 'update'

    wrapper.vm.clearForm()

    expect(wrapper.vm.image).toEqual(null)
    expect(wrapper.vm.uploadImageUrl).toEqual(null)
    expect(wrapper.vm.wifi_radio).toEqual('unknown')
    expect(wrapper.vm.power_radio).toEqual('unknown')
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
