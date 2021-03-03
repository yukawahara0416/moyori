import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
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
  it('cols return 12', () => {
    expect(wrapper.vm.cols).toEqual(12)
  })

  it('cols return 6', () => {
    expect(wrapper.vm.cols).toEqual(6)
  })
})

describe('v-on', () => {
  let cancelPostSpot
  let postSpotHandler

  beforeEach(() => {
    cancelPostSpot = jest.fn()
    postSpotHandler = jest.fn()

    wrapper = mount(Component, {
      localVue,
      store,
      vuetify,
      methods: {
        cancelPostSpot,
        postSpotHandler
      }
    })
  })

  it('click cancelPostSpot', () => {
    wrapper
      .findAll('.v-btn')
      .at(0)
      .trigger('click')
    expect(cancelPostSpot).toHaveBeenCalled()
  })

  it('click postSpotHandler', () => {
    wrapper
      .findAll('.v-btn')
      .at(1)
      .trigger('click')
    expect(postSpotHandler).toHaveBeenCalled()
  })
})

describe('methods', () => {
  it('postSpotHandler', () => {})

  it('voteHandler', () => {})

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
    expect(snackbar.actions.pushSnackbarSuccess).toHaveBeenCalledWith(
      expect.any(Object),
      {
        message: 'スポットの登録をキャンセルしました'
      }
    )
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
    expect(dialog.actions.dialogOff).toHaveBeenCalledWith(
      expect.any(Object),
      'dialogSpotCreate'
    )
    expect(form.mutations.clearSpotForm).toHaveBeenCalled()
    expect(clearForm).toHaveBeenCalled()
  })

  it('clearForm', async () => {
    await wrapper.setData({
      image: 'update',
      uploadImageUrl: 'update',
      wifi_radio: 'update',
      power_radio: 'update'
    })

    wrapper.vm.clearForm()

    expect(wrapper.vm.image).toBeNull()
    expect(wrapper.vm.uploadImageUrl).toBeNull()
    expect(wrapper.vm.wifi_radio).toEqual('unknown')
    expect(wrapper.vm.power_radio).toEqual('unknown')
  })
})

describe('template', () => {
  it('v-col has :cols', () => {
    wrapper = mount(Component, {
      localVue,
      store,
      vuetify
    })

    const target = wrapper.findAll('.col')

    expect(target.at(1).classes()).toContain('col-6')
    expect(target.at(2).classes()).toContain('col-6')
  })

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
