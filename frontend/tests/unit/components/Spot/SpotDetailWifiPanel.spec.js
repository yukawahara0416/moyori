import { shallowMount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Spot/SpotDetailWifiPanel.vue'

const localVue = createLocalVue()

let wrapper
let propsData

beforeEach(() => {
  propsData = {
    spot: {
      data: { id: 1 },
      wifi_withs: [{ id: 2 }, { id: 3 }],
      wifi_withouts: [{ id: 4 }, { id: 5 }]
    }
  }

  wrapper = shallowMount(Component, {
    localVue,
    propsData
  })
})

describe('props', () => {
})
