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
let tab
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
      form: () => {
        return {
          place_id: ''
        }
      },
      formData: () => 'formData'
    },
    mutations: {
      clearSpotFormData: jest.fn()
    }
  }

  dialog = {
    actions: {
      dialogOff: jest.fn()
    }
  }

  tab = {
    getters: {
      profileTab: () => 'posts'
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
      tab,
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
  it('form', () => {
    expect(wrapper.vm.form).toMatchObject(store.getters.form)
  })

  it('headers', () => {
    expect(wrapper.vm.headers).toMatchObject(store.getters.headers)
  })

  it('formData', () => {
    expect(wrapper.vm.formData).toEqual(store.getters.formData)
  })

  it('profileTab', () => {
    expect(wrapper.vm.profileTab).toEqual(store.getters.profileTab)
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
})
