import { shallowMount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Spot/SpotDetailInfoPanelPhone.vue'

const localVue = createLocalVue()

let wrapper
let propsData

  propsData = {
    spot: {
      data: { id: 1, phone: '123456789' }
    }
  }
