import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/components/Spot/SpotPostDialogForm.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let store
let auth
let form
let dialog
let snackbar

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

  wrapper = shallowMount(Component, {
    localVue,
    store,
    stubs: ['ValidationObserver']
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

describe('methods', () => {
  it('cancelPostSpot', () => {
    const closeDialog = jest.fn()

    wrapper = shallowMount(Component, {
      localVue,
      store,
      methods: {
        closeDialog
      },
      stubs: ['ValidationObserver']
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
      methods: {
        clearForm
      },
      stubs: ['ValidationObserver']
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
