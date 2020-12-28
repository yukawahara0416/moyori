import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { Spot } from '@/class/Spot.js'
import Component from '@/components/Buttons/SpotDetailShowButton.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let propsData
let options
let data

let store
let map

beforeEach(() => {
  options = {
    data: { id: 1, place_id: 'aaaaaaaaaaa' }
  }

  data = new Spot(options)

  propsData = {
    spot: data
  }

  map = {
    getters: {
      map: () => {
        return {
          data: 'test'
        }
      }
    }
  }

})
