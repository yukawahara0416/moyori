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
  it('spot', () => {
    expect(wrapper.props().spot).toStrictEqual(propsData.spot)
    expect(wrapper.props().spot instanceof Object).toBe(true)
  })
})

describe('getters', () => {
  it('headers', () => {
    expect(wrapper.vm.headers).toMatchObject(store.getters.headers)
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
})
