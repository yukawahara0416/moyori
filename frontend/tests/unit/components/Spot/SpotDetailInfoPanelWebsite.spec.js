import { shallowMount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Spot/SpotDetailInfoPanelWebsite.vue'

const localVue = createLocalVue()

let wrapper
let propsData

  propsData = {
    spot: {
      data: { id: 1, url: 'http://www.example.com' }
    }
  }

  wrapper = shallowMount(Component, {
    localVue,
    propsData
  })
