import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/components/Header/Header.vue'
import HeaderAvatarButton from '@/components/Header/HeaderAvatarButton.vue'
import HeaderSignButton from '@/components/Header/HeaderSignButton.vue'
import HeaderDrawerButton from '@/components/Header/HeaderDrawerButton.vue'

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
    name: null
  }

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
    expect(wrapper.vm.isLoggingIn).toEqual(store.getters.isLoggingIn)
  })
})

describe('computed', () => {
  it('isSearchRoute is true', () => {
    wrapper.vm.$route.name = 'search'
    expect(wrapper.vm.isSearchRoute).toBeTruthy()
  })

  it('isSearchRoute is false', () => {
    wrapper.vm.$route.name = 'profile'
    expect(wrapper.vm.isSearchRoute).toBeFalsy()
  })
})

describe('v-on', () => {
  it('openDrawer', () => {
    const openDrawer = jest.fn()

    wrapper = mount(Component, {
      localVue,
      store,
      methods: {
        openDrawer
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

    wrapper.find('.v-app-bar__nav-icon').trigger('click')
    expect(openDrawer).toHaveBeenCalled()
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
