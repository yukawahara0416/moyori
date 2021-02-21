import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/components/Header/HeaderAvatarListSignout.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let store
let auth

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

  store = new Vuex.Store({
    modules: {
      auth
    }
  })

  wrapper = shallowMount(Component, {
    localVue,
    store
  })
})

describe('getters', () => {
  it('headers', () => {
    expect(wrapper.vm.headers).toMatchObject(store.getters.headers)
  })
})

describe('v-on', () => {
  it('signOutHandler', () => {
    const signOutHandler = jest.fn()

    wrapper = mount(Component, {
      localVue,
      store,
      methods: {
        signOutHandler
      }
    })

    wrapper.find('.v-list-item').trigger('click')
    expect(signOutHandler).toHaveBeenCalledTimes(1)
  })
})

describe('methods', () => {
  it('signOutHandler', () => {})
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
