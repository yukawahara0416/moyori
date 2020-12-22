import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/views/Profile.vue'
import userStore from '@/store/modules/user/user.js'
import authStore from '@/store/modules/user/auth.js'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper, propsData, store, spot, user, auth

const fetchData = jest.fn()

beforeEach(() => {
  propsData = { id: 1 }

  spot = {
    namespaced: true,
    mutations: {}
  }

  user = {
    namespaced: true,
    state: {
      user: {
        data: { id: 1 }
      }
    },
    getters: userStore.getters
  }

  auth = {
    state: {
      currentUser: {
        data: { id: 1 }
      }
    },
    getters: authStore.getters
  }

  store = new Vuex.Store({
    modules: {
      spot,
      user,
      auth
    }
  })

  wrapper = shallowMount(Component, {
    localVue,
    propsData,
    store,
    methods: { fetchData }
  })
})

describe('props data', () => {
  it('id', () => {
    expect(wrapper.props().id).toEqual(propsData.id)
    expect(typeof wrapper.props().id).toBe('number')
  })
})

describe('call at created hook', () => {
  it('fetchData', () => {
    expect(fetchData).toHaveBeenCalled()
  })
})

describe('call at beforeRouteUpdate hook', () => {
  let beforeRouteUpdate, to, next

  beforeEach(() => {
    beforeRouteUpdate = wrapper.vm.$options.beforeRouteUpdate[0]
    to = { params: propsData.id }
    next = jest.fn()
    beforeRouteUpdate.call(wrapper.vm, to, null, next)
  })

  it('fetchData', () => {
    expect(fetchData).toHaveBeenCalled()
  })

  it('next', () => {
    expect(next).toHaveBeenCalled()
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
