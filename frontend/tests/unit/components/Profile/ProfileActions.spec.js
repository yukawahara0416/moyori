import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/components/Profile/ProfileActions.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let propsData
let store
let auth

beforeEach(() => {
  propsData = {
    id: 1,
    user: { data: { id: 1 } },
    currentUser: { data: { id: 1 } }
  }

  auth = {
    getters: {
      isLoggingIn: () => true
    }
  }

  store = new Vuex.Store({
    modules: {
      auth
    }
  })

  wrapper = shallowMount(Component, {
    localVue,
    propsData,
    store
  })
})

describe('props', () => {
  it('id', () => {
    expect(wrapper.props().id).toStrictEqual(propsData.id)
    expect(typeof wrapper.vm.$props.id).toBe('number')
  })

  it('user', () => {
    expect(wrapper.props().user).toStrictEqual(propsData.user)
    expect(wrapper.props().user instanceof Object).toBe(true)
  })

  it('currentUser', () => {
    expect(wrapper.props().currentUser).toStrictEqual(propsData.currentUser)
    expect(wrapper.props().currentUser instanceof Object).toBe(true)
  })
})

describe('getters', () => {
  it('isLoggingIn', () => {
    expect(wrapper.vm.isLoggingIn).toEqual(store.getters.isLoggingIn)
  })
})

describe('computed', () => {
  it('isOwnPage', () => {
    expect(wrapper.vm.isOwnPage).toBe(true)
  })

  it('isTestUser', () => {
    expect(wrapper.vm.isTestUser).toBe(true)
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
