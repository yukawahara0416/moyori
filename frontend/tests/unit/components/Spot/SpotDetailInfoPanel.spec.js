// template
// :spot
// v-if

// getters
// currentUser
// isLoggingIn

// computed isOwnPosted

// props spot

import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/components/Spot/SpotDetailInfoPanel.vue'

const localVue = createLocalVue()

let wrapper
let propsData

beforeEach(() => {
  propsData = {
    spot: {
      data: { id: 1, place_id: 'aaaaaaaaaaa', use_id: 1, image: 'test1' }
    }
  }

  wrapper = shallowMount(Component, {
    localVue,
    propsData
  })
})
