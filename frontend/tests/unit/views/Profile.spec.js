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
let tab
let notfound

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

  tab = {
    mutations: {
      changeProfileTab: jest.fn()
    }
  }

  notfound = {
    getters: {
      isNotFound: () => false
    }
  }

  store = new Vuex.Store({
    modules: {
      user,
      auth,
      tab,
      notfound
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

describe('call at mounted hook', () => {
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
  it('user', () => {
    expect(wrapper.vm.user).toMatchObject(store.getters['user/user'])
  })

  it('currentUser', () => {
    expect(wrapper.vm.currentUser).toMatchObject(store.getters.currentUser)
  })

  it('isNotFound', () => {
    expect(wrapper.vm.isNotFound).toEqual(store.getters.isNotFound)
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
