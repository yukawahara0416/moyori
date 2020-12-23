import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Component from '@/App.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)

let wrapper
let store
let getters
let router

beforeEach(() => {
  getters = {
    loading: () => true
  }

  store = new Vuex.Store({
    getters
  })

  router = new VueRouter()

  wrapper = shallowMount(Component, {
    localVue,
    store,
    router
  })
})

describe('component', () => {
  it('instance', () => {
    expect(wrapper.isVueInstance).toBeTruthy()
  })
})

describe('getters', () => {
  it('loading', () => {
    expect(wrapper.vm.loading).toEqual(getters.loading())
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
