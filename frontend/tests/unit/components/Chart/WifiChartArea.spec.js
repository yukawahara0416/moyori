import { shallowMount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Chart/WifiChartArea.vue'

const localVue = createLocalVue()

let wrapper
let propsData

beforeEach(() => {
  propsData = {
    spot: {
      data: { id: 1 },
      wifi_withs: [
        { id: 1, created_at: '2020-12-01T00:00:00.000Z' },
        { id: 2, created_at: '2020-12-02T00:00:00.000Z' }
      ],
      wifi_withouts: [
        { id: 3, created_at: '2020-12-03T00:00:00.000Z' },
        { id: 4, created_at: '2020-12-04T00:00:00.000Z' }
      ]
    }
  }

  wrapper = shallowMount(Component, {
    localVue,
    propsData
  })
})

describe('props', () => {
})
