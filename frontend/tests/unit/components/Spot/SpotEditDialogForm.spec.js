import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import { Spot } from '@/class/Spot.js'
import Component from '@/components/Spot/SpotEditDialogForm.vue'

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
let form
let tab
let dialog
let snackbar

beforeEach(() => {
  propsData = {
    spot: new Spot({
      data: {
        id: 1,
        place_id: 'place_id',
        name: 'name',
        address: 'address',
        phone: 'phone',
        url: 'url',
        position: {
          lat: 'lat',
          lng: 'lng'
        }
      }
    })
  }

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
    mutations: {
      clearSpotForm: jest.fn()
    }
  }

  tab = {
    getters: {
      profileTab: () => {
        return 'posts'
      }
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
      tab,
      dialog,
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
  it('spot', () => {
    expect(wrapper.vm.$props.spot).toStrictEqual(propsData.spot)
    expect(wrapper.vm.$props.spot instanceof Spot).toBeTruthy()
    expect(wrapper.vm.$options.props.spot.required).toBeTruthy()
  })
})

describe('getters', () => {
  it('headers', () => {
    expect(wrapper.vm.headers).toMatchObject(store.getters.headers)
  })

  it('profileTab', () => {
    expect(wrapper.vm.profileTab).toEqual(store.getters.profileTab)
  })
})

describe('computed', () => {
  it('formData', () => {
    const formData = new FormData()
    formData.append('spot[address]', propsData.spot.data.address)
    formData.append('spot[name]', propsData.spot.data.name)
    formData.append('spot[place_id]', propsData.spot.data.place_id)
    formData.append('spot[lat]', propsData.spot.data.position.lat)
    formData.append('spot[lng]', propsData.spot.data.position.lng)
    formData.append('spot[phone]', propsData.spot.data.phone)
    formData.append('spot[url]', propsData.spot.data.url)

    expect(wrapper.vm.formData).toEqual(formData)
  })
})

describe('methods', () => {
  it('cancelUpdateSpot', () => {
    const closeDialog = jest.fn()

    wrapper = shallowMount(Component, {
      localVue,
      propsData,
      store,
      methods: {
        closeDialog
      }
    })

    wrapper.vm.cancelUpdateSpot()
    expect(closeDialog).toHaveBeenCalled()
    expect(snackbar.actions.pushSnackbarSuccess).toHaveBeenCalled()
  })

  it('closeDialog', () => {
    const clearForm = jest.fn()

    wrapper = shallowMount(Component, {
      localVue,
      propsData,
      store,
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
    wrapper.vm.picture = 'updata'
    wrapper.vm.uploadImageUrl = 'updata'
    wrapper.vm.clearForm()
    expect(wrapper.vm.picture).toEqual(null)
    expect(wrapper.vm.uploadImageUrl).toEqual(null)
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
