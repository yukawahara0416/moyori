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
let vuetify

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
    }
  }

  store = new Vuex.Store({
    modules: {
      auth
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
  it('signOutHandler', () => {})
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
