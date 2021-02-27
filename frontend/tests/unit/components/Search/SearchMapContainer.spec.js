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

describe('computed', () => {
  it('styleVariables', async () => {
    await wrapper.setData({ height: window.innerHeight })
    expect(wrapper.vm.styleVariables).toMatchObject({
      '--checkbox-height': `${wrapper.vm.height}px`
    })
  })
})

describe('methods', () => {
  it('handleResize', async () => {
    await wrapper.setData({ height: 100 })
    wrapper.vm.handleResize()
    expect(wrapper.vm.height).toEqual(window.innerHeight)
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
