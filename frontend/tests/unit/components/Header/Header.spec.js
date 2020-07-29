import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/components/Header/Header.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let getters
let store

beforeEach(() => {
  getters = {
    headers: () => ({ uid: 'tester@example.com' }),
    currentUser: () => ({ data: { id: 1 } })
  }

  store = new Vuex.Store({
    getters
  })

  wrapper = shallowMount(Component, {
    localVue,
    store
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('getters', () => {
  it('headers', () => {
    expect(wrapper.vm.headers).toEqual(getters.headers())
  })
  it('currentUser', () => {
    expect(wrapper.vm.currentUser).toEqual(getters.currentUser())
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
