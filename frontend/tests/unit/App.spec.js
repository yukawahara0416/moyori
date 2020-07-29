import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import Component from '@/App.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)
localVue.use(Vuetify)

let wrapper
let getters
let store
let router
let vuetify

beforeEach(() => {
  getters = {
    loading: () => true
  }

  store = new Vuex.Store({
    getters
  })

  router = new VueRouter()
  vuetify = new Vuetify()

  wrapper = shallowMount(Component, {
    localVue,
    store,
    router,
    vuetify,
    stubs: { 'snackbar-stub': '<div />', 'header-stub': '<div />' }
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
