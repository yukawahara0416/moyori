import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/components/Header/HeaderAvatarButton.vue'
import HeaderAvatarImage from '@/components/Header/HeaderAvatarImage.vue'
import HeaderAvatarList from '@/components/Header/HeaderAvatarList.vue'

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
          data: { id: 1, name: 'name' }
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
  it('HeaderAvatarImage has :currentUser', () => {
    wrapper = mount(Component, {
      localVue,
      store
    })

    expect(wrapper.find(HeaderAvatarImage).props().currentUser).toEqual(
      wrapper.vm.currentUser
    )
  })

  //
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
