import { shallowMount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Spot/SpotDetailTitle.vue'

const localVue = createLocalVue()

let wrapper
let propsData

beforeEach(() => {
  propsData = {
    spot: {
      data: { id: 1, name: 'test' }
    }
  }

  wrapper = shallowMount(Component, {
    localVue,
    propsData
  })
})
