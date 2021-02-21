import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/components/Header/HeaderAvatarListSignout.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let store
let auth
let snackbar

beforeEach(() => {
  auth = {
    getters: {
      headers: () => {
        return {
          data: { id: 1 }
        }
      }
    },
    mutations: {
      clearHeaders: jest.fn()
    },
    actions: {
      signOut: jest.fn()
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
      snackbar
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
