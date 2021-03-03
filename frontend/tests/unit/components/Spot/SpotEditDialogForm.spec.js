import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import { Spot } from '@/class/Spot.js'
import { axiosBase } from '@/plugins/axios.js'
import MockAdapter from 'axios-mock-adapter'
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import Component from '@/components/Spot/SpotEditDialogForm.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.component('ValidationObserver', ValidationObserver)
localVue.component('ValidationProvider', ValidationProvider)

const axiosMock = new MockAdapter(axiosBase)

const { required, max } = require('vee-validate/dist/rules.umd')
import { url, phone } from '@/plugins/vee-validate.js' // eslint-disable-line

extend('required', required)
extend('max', max)

let wrapper
let propsData
let store
let auth
let user
let spot
let form
let tab
let dialog
let snackbar

let vuetify
let $route

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

  user = {
    namespaced: true,
    mutations: {
      updateSpot: jest.fn()
    }
  }

  spot = {
    namespaced: true,
    mutations: {
      updateSpot: jest.fn()
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
      user,
      spot,
      form,
      tab,
      dialog,
      snackbar
    }
  })

  vuetify = new Vuetify()

  $route = {
    name: null,
    params: {
      id: null
    }
  }

  wrapper = shallowMount(Component, {
    localVue,
    propsData,
    store,
    vuetify,
    mocks: {
      $route
    }
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
    const target = wrapper.vm.$props.spot.data

    const formData = new FormData()
    formData.append('spot[address]', target.address)
    formData.append('spot[name]', target.name)
    formData.append('spot[place_id]', target.place_id)
    formData.append('spot[lat]', target.position.lat)
    formData.append('spot[lng]', target.position.lng)
    formData.append('spot[phone]', target.phone)
    formData.append('spot[url]', target.url)

    expect(wrapper.vm.formData).toEqual(formData)
  })
})

describe('methods', () => {
  it('updateSpotHandler', () => {})

  it('updateSpot', () => {
    const spot_id = wrapper.vm.$props.spot.data.id
    const params = new FormData()
    const headers = auth.getters.headers()
    const response = { data: { id: 1 } }

    axiosMock.onPatch(`/api/v1/spots/${spot_id}`, params).reply(200, response)

    return wrapper.vm.updateSpot(spot_id, params, headers).then(res => {
      expect(res.data).toMatchObject(response.data)
    })
  })

  it('updateSpot 404 error', () => {
    const spot_id = wrapper.vm.$props.spot.data.id
    const params = new FormData()
    const headers = auth.getters.headers()

    axiosMock.onPatch(`/api/v1/spots/${spot_id}`, params).reply(404)

    return wrapper.vm.updateSpot(headers).catch(err => {
      expect(err).toStrictEqual(new Error('スポットの更新に失敗しました'))
    })
  })

  it('stateMutation called userStore', () => {
    const updated = { data: { id: 1 } }

    wrapper.vm.$route.name = 'profile'

    wrapper.vm.stateMutation(updated)
    expect(user.mutations.updateSpot).toHaveBeenCalledWith(expect.any(Object), {
      place_id: wrapper.vm.$props.spot.data.place_id,
      updated,
      tab: tab.getters.profileTab(),
      isMyPage: false
    })
  })

  it('stateMutation called spotStore', () => {
    const updated = { data: { id: 1 } }

    wrapper.vm.$route.name = 'search'

    wrapper.vm.stateMutation(updated)
    expect(spot.mutations.updateSpot).toHaveBeenCalledWith(expect.any(Object), {
      place_id: wrapper.vm.$props.spot.data.place_id,
      updated
    })
  })

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
    expect(snackbar.actions.pushSnackbarSuccess).toHaveBeenCalledWith(
      expect.any(Object),
      {
        message: 'スポットの編集をキャンセルしました'
      }
    )
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
    expect(dialog.actions.dialogOff).toHaveBeenCalledWith(
      expect.any(Object),
      'dialogSpotEdit'
    )
    expect(form.mutations.clearSpotForm).toHaveBeenCalled()
    expect(clearForm).toHaveBeenCalled()
  })

  it('clearForm', async () => {
    await wrapper.setData({
      name: 'update',
      address: 'update',
      phone: 'update',
      url: 'update',
      picture: 'update',
      uploadImageUrl: 'update'
    })

    wrapper.vm.clearForm()

    const target = wrapper.vm.$props.spot.data

    expect(wrapper.vm.name).toEqual(target.name)
    expect(wrapper.vm.address).toEqual(target.address)
    expect(wrapper.vm.phone).toEqual(target.phone)
    expect(wrapper.vm.url).toEqual(target.url)
    expect(wrapper.vm.picture).toBeNull()
    expect(wrapper.vm.uploadImageUrl).toBeNull()
  })
})

describe('template', () => {
  it('v-btn has small', () => {
    const smAndDown = wrapper.vm.$vuetify.breakpoint.thresholds.sm - 1
    Object.assign(window, { innerWidth: smAndDown })

    wrapper = mount(Component, {
      localVue,
      propsData,
      store,
      vuetify
    })

    const target = wrapper.findAll('.v-btn')
    expect(target.at(0).classes()).toContain('v-size--small')
    expect(target.at(1).classes()).toContain('v-size--small')

    Object.assign(window, { innerWidth: 1024 })
  })

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
