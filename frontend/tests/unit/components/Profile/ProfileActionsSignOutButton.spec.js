import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import Component from '@/components/Profile/ProfileActionsSignOutButton.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(Vuetify)

let wrapper
let store
let auth
let snackbar
let vuetify

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

  vuetify = new Vuetify()

  wrapper = shallowMount(Component, {
    localVue,
    vuetify,
    store
  })
})

describe('getters', () => {
  it('headers', () => {
    expect(wrapper.vm.headers).toEqual(store.getters.headers)
  })
})

describe('v-on', () => {
  it('signOutHandler', () => {
    const signOutHandler = jest.fn()

    wrapper = mount(Component, {
      localVue,
      vuetify,
      store,
      methods: {
        signOutHandler
      }
    })

    wrapper.find('.v-btn').trigger('click')
    expect(signOutHandler).toHaveBeenCalled()
  })
})

describe('methods', () => {
  it('signOutHandler', () => {
    return wrapper.vm.signOutHandler().then(() => {
      expect(auth.actions.signOut).toHaveBeenCalledWith(
        expect.any(Object),
        auth.getters.headers()
      )
      expect(snackbar.actions.pushSnackbarSuccess).toHaveBeenCalledWith(
        expect.any(Object),
        {
          message: 'ログアウトしました'
        }
      )
      expect(snackbar.actions.pushSnackbarError).not.toHaveBeenCalled()
    })
  })
})

describe('template', () => {
  it('v-btn has small', () => {
    const smAndDown = wrapper.vm.$vuetify.breakpoint.thresholds.sm - 1
    Object.assign(window, { innerWidth: smAndDown })

    wrapper = mount(Component, {
      localVue,
      store,
      vuetify
    })

    expect(wrapper.find('.v-btn').classes()).toContain('v-size--small')

    Object.assign(window, { innerWidth: 1024 })
  })

  it('v-btn not has small', () => {
    const md = wrapper.vm.$vuetify.breakpoint.thresholds.md
    Object.assign(window, { innerWidth: md })

    wrapper = mount(Component, {
      localVue,
      store,
      vuetify
    })

    expect(wrapper.vm.$vuetify.breakpoint.smAndDown).toBeFalsy()
    expect(wrapper.find('.v-btn').classes()).toContain('v-size--default')

    Object.assign(window, { innerWidth: 1024 })
  })

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
