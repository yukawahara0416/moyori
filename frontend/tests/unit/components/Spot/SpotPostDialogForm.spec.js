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

})
