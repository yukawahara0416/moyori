import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/components/Header/Header.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let store
let auth
let $route

beforeEach(() => {
  auth = {
    getters: {
      isLoggingIn: () => false
    }
  }

  store = new Vuex.Store({
    modules: {
      auth
    }
  })

  $route = {
    name: 'search'
  }
})

describe('with shallowMount wrapper', () => {
  beforeEach(() => {
    wrapper = shallowMount(Component, {
      localVue,
      store,
      mocks: {
        $route
      }
    })
  })

  describe('getters', () => {
    it('isLoggingIn', () => {
      expect(wrapper.vm.isLoggingIn).toEqual(auth.getters.isLoggingIn())
    })
  })

  describe('computed', () => {
    it('isSearchRoute', () => {
      expect(wrapper.vm.isSearchRoute).toBe(true)
    })
  })

  describe('methods', () => {
    it('openDrawer', () => {
      wrapper.vm.openDrawer()
      expect(wrapper.vm.drawerState).toBe(true)
    })
  })

  describe('template', () => {
    it('snapshot', () => {
      expect(wrapper.vm.$el).toMatchSnapshot()
    })
  })
})

describe('with mount wrapper', () => {
  beforeEach(() => {
    wrapper = mount(Component, {
      localVue,
      store,
      mocks: {
        $route
      },
      stubs: [
        'v-app-bar',
        'v-toolbar',
        'header-title',
        'header-tutorial-button',
        'header-avatar-button',
        'header-sign-button',
        'header-drawer-button'
      ]
    })
  })

  describe('v-on', () => {
    it('openDrawer', () => {
      const openDrawer = jest.fn()
      wrapper.setMethods({ openDrawer })
      wrapper.find('.v-app-bar__nav-icon').trigger('click')
      expect(openDrawer).toHaveBeenCalled()
    })
  })

  describe('template', () => {
    it('snapshot', () => {
      expect(wrapper.vm.$el).toMatchSnapshot()
    })
  })
})
