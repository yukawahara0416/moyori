import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { Spot } from '@/class/Spot.js'
import { axiosBase } from '@/plugins/axios.js'
import MockAdapter from 'axios-mock-adapter'
import Component from '@/components/Spot/SpotDeleteButtonDialog.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
const axiosMock = new MockAdapter(axiosBase)

let wrapper
let propsData
let store
let spot
let auth
let user
let snackbar
let $route

beforeEach(() => {
  propsData = {
    spot: new Spot({
      data: { id: 1 }
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

  spot = {
    namespaced: true,
    mutations: {
      deleteSpot: jest.fn()
    }
  }

  user = {
    namespaced: true,
    actions: {
      deleteSpot: jest.fn()
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
      spot,
      auth,
      user,
      snackbar
    }
  })

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

describe('v-on', () => {
  it('click closeDeleteDialog/deleteHandler', () => {
    const closeDeleteDialog = jest.fn()
    const deleteHandler = jest.fn()

    wrapper = mount(Component, {
      localVue,
      propsData,
      methods: {
        closeDeleteDialog,
        deleteHandler
      }
    })

    wrapper
      .findAll('.v-btn')
      .at(0)
      .trigger('click')
    expect(closeDeleteDialog).toHaveBeenCalled()

    wrapper
      .findAll('.v-btn')
      .at(1)
      .trigger('click')
    expect(deleteHandler).toHaveBeenCalled()
  })
})

describe('methods', () => {
  it('deleteHandler', () => {
    const spot_id = 1
    const deleteSpot = jest.fn().mockReturnValue(spot_id)
    const closeDeleteDialog = jest.fn()
    const closeDetailDialog = jest.fn()
    const storeMutation = jest.fn()

    wrapper = shallowMount(Component, {
      localVue,
      propsData,
      store,
      methods: {
        deleteSpot,
        closeDeleteDialog,
        closeDetailDialog,
        storeMutation
      }
    })

    expect.assertions(6)

    return wrapper.vm.deleteHandler().then(() => {
      expect(deleteSpot).toHaveBeenCalledWith(
        wrapper.vm.$props.spot.data.id,
        auth.getters.headers()
      )
      expect(closeDeleteDialog).toHaveBeenCalled()
      expect(closeDetailDialog).toHaveBeenCalled()
      expect(storeMutation).toHaveBeenCalledWith(spot_id)
      expect(
        snackbar.actions.pushSnackbarSuccess
      ).toHaveBeenCalledWith(expect.any(Object), {
        message: 'スポットを削除しました'
      })
      expect(snackbar.actions.pushSnackbarError).not.toHaveBeenCalled()
    })
  })

  describe('deleteSpot', () => {
    it('200', () => {
      const id = 1
      const headers = auth.getters.headers()
      const response = { id: 1 }

      axiosMock.onDelete(`/api/v1/spots/${id}`).reply(200, response)

      return wrapper.vm.deleteSpot(id, headers).then(res => {
        expect(res).toEqual(response.id)
      })
    })

    it('404', () => {
      const id = 1
      const headers = auth.getters.headers()
      const response = { id: 1 }

      axiosMock.onDelete(`/api/v1/spots/${id}`).reply(404)

      return wrapper.vm.deleteSpot(id, headers).catch(err => {
        expect(err).toStrictEqual(new Error('スポットの削除に失敗しました'))
      })
    })
  })

  describe('storeMutation', () => {
    it('route is profile', () => {
      wrapper.vm.$route.name = 'profile'
      const spot_id = 1

      wrapper.vm.storeMutation(spot_id)

      expect(user.actions.deleteSpot).toHaveBeenCalledWith(expect.any(Object), {
        spot_id
      })
      expect(spot.mutations.deleteSpot).not.toHaveBeenCalledWith(
        expect.any(Object),
        spot_id
      )
    })

    it('route is other', () => {
      wrapper.vm.$route.name = 'search'
      const spot_id = 1

      wrapper.vm.storeMutation(spot_id)

      expect(spot.mutations.deleteSpot).toHaveBeenCalledWith(
        expect.any(Object),
        spot_id
      )
      expect(user.actions.deleteSpot).not.toHaveBeenCalledWith(
        expect.any(Object),
        { spot_id }
      )
    })
  })
})

describe('emit', () => {
  it('closeDeleteDialog', () => {
    wrapper.vm.$emit('closeDeleteDialog')
    expect(wrapper.emitted().closeDeleteDialog).toBeTruthy()
  })

  it('closeDetailDialog', () => {
    wrapper.vm.$emit('closeDetailDialog')
    expect(wrapper.emitted().closeDetailDialog).toBeTruthy()
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
