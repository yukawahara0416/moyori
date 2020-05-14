import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import Component from '@/App.vue'

const localVue = createLocalVue()
localVue.use(VueRouter)
localVue.use(Vuetify)

const router = new VueRouter()
const vuetify = new Vuetify()

let wrapper

beforeEach(() => {
  wrapper = shallowMount(Component, {
    localVue,
    router,
    vuetify
  })
})

describe('Testing App component', () => {
  it('is a Vue instance', () => {
    expect(wrapper.isVueInstance).toBeTruthy()
  })
})
