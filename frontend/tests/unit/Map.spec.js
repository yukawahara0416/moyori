import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import { mount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Map.vue'

const router = new VueRouter()
const vuetify = new Vuetify()
const localVue = createLocalVue()

let wrapper

beforeEach(() => {
  wrapper = mount(Component, {
    router,
    vuetify,
    localVue
    // stubs: ['GmapMap']
  })
})

afterEach(() => {
  wrapper.destroy()
})

it('buttonがある', () => {
  const event = jest.fn()
  const button = wrapper.find('.v-btn')
  wrapper.setMethods({
    setNearbyMarkers: event
  })
  // wrapper.vm.$on('setNearbyMarkers', event)
  // expect(event).toHaveBeenCalledTimes(0)
  button.trigger('click')
  expect(event).toHaveBeenCalledTimes(1)
  // wrapper.setMethods({ setNearbyMarkers: stub })
  // wrapper.find('.v-btn').trigger('click')
  // expect(stub).toHaveBeenCalled()
})
