import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/components/Profile/ProfileActionsSignOutButton.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let store
let auth
let snackbar

const signOutHandler = jest.fn()

beforeEach(() => {
  auth = {
    getters: {
      headers: () => {
        return {
          data: {
            id: 1
          }
        }
      }
    },
    mutations: {
      clearHearders: jest.fn()
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

  wrapper = mount(Component, {
    localVue,
    store,
    methods: {
      signOutHandler
    }
  })
})

describe('getters', () => {
  it('headers', () => {
    expect(wrapper.vm.headers).toEqual(store.getters.headers)
  })
})

describe('v-on', () => {
  it('signOutHandler', () => {
    wrapper.find('.v-btn').trigger('click')
    expect(signOutHandler).toHaveBeenCalledTimes(1)
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
