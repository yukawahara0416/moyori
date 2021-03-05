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
let user
let $route

beforeEach(() => {
  propsData = {
    spot: new Spot({
      data: { id: 1 }
    })
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

  store = new Vuex.Store({
    modules: {
      spot,
      user
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
  it('deleteHandler', () => {})

  it('deleteSpot', () => {})

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
