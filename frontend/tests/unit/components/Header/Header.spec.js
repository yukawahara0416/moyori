import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
// import Vuetify from 'vuetify'
import Component from '@/components/Header/Header.vue'
import HeaderAvatarButton from '@/components/Header/HeaderAvatarButton.vue'
import HeaderSignButton from '@/components/Header/HeaderSignButton.vue'
import HeaderDrawerButton from '@/components/Header/HeaderDrawerButton.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
// localVue.use(Vuetify)

let wrapper
let store
let auth
let $route
// let vuetify

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

  // vuetify = new Vuetify()
})

describe('with shallowMount wrapper', () => {
  beforeEach(() => {
    wrapper = shallowMount(Component, {
      localVue,
      store,
      // vuetify,
      mocks: {
        $route
      }
    })
  })

  describe('getters', () => {
    it('isLoggingIn', () => {
      expect(wrapper.vm.isLoggingIn).toEqual(store.getters.isLoggingIn)
    })
  })

  describe('computed', () => {
    it('isSearchRoute is true', () => {
      expect(wrapper.vm.isSearchRoute).toBeTruthy()
    })

    it('isSearchRoute is false', () => {
      throw new Error('テスト未作成')
    })
  })

  describe('methods', () => {
    it('openDrawer', () => {
      wrapper.setData({ drawerState: false })

      wrapper.vm.openDrawer()
      expect(wrapper.vm.drawerState).toBeTruthy()
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
      // vuetify,
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

      // wrapper.setMethods({ openDrawer })

      wrapper.find('.v-app-bar__nav-icon').trigger('click')
      expect(openDrawer).toHaveBeenCalled()
    })
  })

  describe('template', () => {
    it('v-if="isLoggingIn"', () => {
      auth.getters.isLoggingIn = () => true

      store = new Vuex.Store({
        modules: {
          auth
        }
      })

      wrapper = shallowMount(Component, {
        localVue,
        store
      })

      expect(wrapper.findAll(HeaderAvatarButton).length).toEqual(1)
      expect(wrapper.findAll(HeaderSignButton).length).toEqual(0)
    })

    it('v-else', () => {
      auth.getters.isLoggingIn = () => false

      store = new Vuex.Store({
        modules: {
          auth
        }
      })

      wrapper = shallowMount(Component, {
        localVue,
        store
      })

      expect(wrapper.findAll(HeaderAvatarButton).length).toEqual(0)
      expect(wrapper.findAll(HeaderSignButton).length).toEqual(1)
    })

    it('HeaderDrawerButton has :drawerState', () => {
      expect(wrapper.find(HeaderDrawerButton).props().value).toEqual(
        wrapper.vm.drawerState
      )
    })

    it('snapshot', () => {
      expect(wrapper.vm.$el).toMatchSnapshot()
    })
  })
})
