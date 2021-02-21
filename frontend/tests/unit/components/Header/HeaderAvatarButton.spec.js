import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/components/Header/HeaderAvatarButton.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let store
let auth

beforeEach(() => {
  auth = {
    getters: {
      currentUser: () => {
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
  it('currentUser', () => {
    expect(wrapper.vm.currentUser).toEqual(store.getters.currentUser)
  })
})

describe('template', () => {
  // has currentUser

  //
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
