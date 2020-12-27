import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/components/Spot/SpotEditDialogForm.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let propsData
let store
let auth
let form
let dialog
let snackbar

beforeEach(() => {
  propsData = {
    spot: {
      data: {
        id: 1,
        name: 'testname',
        address: 'testaddress',
        phone: 'testphone',
        url: 'testurl',
        position: {
          lat: 'testlat',
          lng: 'testlng'
        }
      }
    }
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
      clearSpotFormData: jest.fn()
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
    propsData,
    store,
    stubs: ['ValidationObserver']
  })
})

describe('props', () => {
})
})
