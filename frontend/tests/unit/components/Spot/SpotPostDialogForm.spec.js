import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import { postSpot } from '@/plugins/maps.js'
import Component from '@/components/Spot/SpotPostDialogForm.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.component('ValidationObserver', ValidationObserver)
localVue.component('ValidationProvider', ValidationProvider)

const { required } = require('vee-validate/dist/rules.umd')
extend('required', required)

jest.mock('@/plugins/maps.js', () => ({
  ...jest.requireActual('@/plugins/maps.js'),
  postSpot: jest
    .fn()
    .mockResolvedValue({ data: { id: 1, place_id: 'aaaaaaaaaa' } })
}))

let wrapper
let store
let auth
let form
let spot
let vote
let dialog
let snackbar
let vuetify

let $route

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

  spot = {
    namespaced: true,
    mutations: {
      addSpot: jest.fn()
    },
    actions: {
      spotlight: jest.fn()
    }
  }

  vote = {
    actions: {
      vote: jest.fn()
    }
  }

  dialog = {
    actions: {
      dialogOff: jest.fn()
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
      form,
      spot,
      vote,
      dialog,
      snackbar
    }
  })

  vuetify = new Vuetify()

  $route = {
    name: 'search'
  }

  wrapper = shallowMount(Component, {
    localVue,
    store,
    vuetify,
    mocks: {
      $route
    }
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
    const xsOnly = wrapper.vm.$vuetify.breakpoint.thresholds.xs - 1
    Object.assign(window, { innerWidth: xsOnly })

    wrapper = shallowMount(Component, {
      localVue,
      store,
      vuetify
    })

    expect(wrapper.vm.cols).toEqual(12)

    Object.assign(window, { innerWidth: 1024 })
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
  it('postSpotHandler', () => {
    const params = wrapper.vm.formData
    const headers = auth.getters.headers()
    const spot_data = { data: { id: 1, place_id: 'aaaaaaaaaa' } }

    const closeDialog = jest.fn()
    const voteHandler = jest.fn()

    wrapper = shallowMount(Component, {
      localVue,
      store,
      methods: {
        closeDialog,
        voteHandler
      }
    })

    return wrapper.vm.postSpotHandler().then(() => {
      expect(postSpot).toHaveBeenCalledWith(params, headers)
      expect(spot.mutations.addSpot).toHaveBeenCalledWith(
        expect.any(Object),
        spot_data
      )
      expect(voteHandler).toHaveBeenCalledWith(spot_data)
      expect(spot.actions.spotlight).toHaveBeenCalledWith(
        expect.any(Object),
        spot_data.data.place_id
      )
      expect(closeDialog).toHaveBeenCalled()
      expect(snackbar.actions.pushSnackbarSuccess).toHaveBeenCalledWith(
        expect.any(Object),
        {
          message: 'スポットを登録しました'
        }
      )
      expect(snackbar.actions.pushSnackbarError).not.toHaveBeenCalled()
    })
  })

  describe('voteHandler', () => {
    it('radio is checked', async () => {
      const params = new FormData()
      const headers = auth.getters.headers()
      const spot_data = { data: { id: 1 } }

      await wrapper.setData({
        wifi_radio: 'wifi_with',
        power_radio: 'power_with'
      })

      params.append(`${wrapper.vm.wifi_radio}[spot_id]`, spot_data.data.id)
      params.append(`${wrapper.vm.power_radio}[spot_id]`, spot_data.data.id)

      expect.assertions(2)

      return wrapper.vm.voteHandler(spot_data).then(() => {
        expect(vote.actions.vote).toHaveBeenNthCalledWith(
          1,
          expect.any(Object),
          {
            prop: `${wrapper.vm.wifi_radio}s`,
            spot: spot_data,
            params,
            headers,
            route: wrapper.vm.$route.name
          }
        )

        expect(vote.actions.vote).toHaveBeenNthCalledWith(
          2,
          expect.any(Object),
          {
            prop: `${wrapper.vm.power_radio}s`,
            spot: spot_data,
            params,
            headers,
            route: wrapper.vm.$route.name
          }
        )
      })
    })

  })

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

  it('v-btn has small', () => {
    const smAndDown = wrapper.vm.$vuetify.breakpoint.thresholds.sm - 1
    Object.assign(window, { innerWidth: smAndDown })

    wrapper = mount(Component, {
      localVue,
      store,
      vuetify
    })

    const target = wrapper.findAll('.v-btn')
    expect(target.at(0).classes()).toContain('v-size--small')
    expect(target.at(1).classes()).toContain('v-size--small')

    Object.assign(window, { innerWidth: 1024 })
  })

  it('v-btn not has small', () => {
    const mdAndUp = wrapper.vm.$vuetify.breakpoint.thresholds.md + 1
    Object.assign(window, { innerWidth: mdAndUp })

    wrapper = mount(Component, {
      localVue,
      store,
      vuetify
    })

    const target = wrapper.findAll('.v-btn')
    expect(target.at(0).classes()).toContain('v-size--default')
    expect(target.at(1).classes()).toContain('v-size--default')

    Object.assign(window, { innerWidth: 1024 })
  })

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
