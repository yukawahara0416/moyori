import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/components/Sign/Policy.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let store
let dialog

beforeEach(() => {
  dialog = {
    mutations: {
      dialogOff: jest.fn()
    }
  }

  store = new Vuex.Store({
    modules: {
      dialog
    }
  })

  wrapper = shallowMount(Component, {
    localVue,
    store,
    stubs: {
      RouterLink: RouterLinkStub
    }
  })
})

describe('router-link', () => {
  it('to="/rules"', () => {
    expect(
      wrapper
        .findAll(RouterLinkStub)
        .at(0)
        .props().to
    ).toBe('/rules')
  })

  it('to="privacy"', () => {
    expect(
      wrapper
        .findAll(RouterLinkStub)
        .at(1)
        .props().to
    ).toBe('privacy')
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
