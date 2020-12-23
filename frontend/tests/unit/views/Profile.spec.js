import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/views/Profile.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let propsData
let store
let user
let auth

const fetchData = jest.fn()

beforeEach(() => {
  propsData = { id: 1 }

  user = {
    namespaced: true,
    getters: {
      user: () => {
        return {
          data: {
            id: 1
          }
        }
      }
    }
  }

  auth = {
    getters: {
      currentUser: () => {
        return {
          data: {
            id: 1
          }
        }
      }
    }
  }

  store = new Vuex.Store({
    modules: {
      user,
      auth
    }
  })

  wrapper = shallowMount(Component, {
    localVue,
    propsData,
    store,
    methods: {
      fetchData
    }
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
  let beforeRouteUpdate
  let to
  let next

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

describe('getters', () => {
  it('user', () => {})
  it('currentUser', () => {})
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
