import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import Component from '@/components/Search/SearchMapContainer.vue'

const localVue = createLocalVue()
localVue.use(Vuetify)

let wrapper
let vuetify

beforeEach(() => {
  vuetify = new Vuetify()

  wrapper = shallowMount(Component, {
    localVue,
    vuetify
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
