/**
 * template :href
 * template address
 *
 * props spot
 *
 * computed address
 * computed url
 */

import { shallowMount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Spot/SpotDetailInfoPanelAddress.vue'

const localVue = createLocalVue()

let wrapper
let propsData

  propsData = {
    spot: {
      data: { id: 1, address: 'test', position: { lat: 'lat', lng: 'lng' } }
    }
  }

  wrapper = shallowMount(Component, {
    localVue,
    propsData
  })
