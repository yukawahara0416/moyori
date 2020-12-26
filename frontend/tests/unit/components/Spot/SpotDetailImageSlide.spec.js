import { shallowMount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Spot/SpotDetailImageSlide.vue'

const localVue = createLocalVue()

let wrapper
let propsData

afterEach(() => {
  wrapper = shallowMount(Component, {
    localVue,
    propsData
  })
})

// props
// computed images
// commentImages

describe('props', () => {})

describe('computed', () => {})

describe('template', () => {})

// template
// v-if v-slide-item
// v-img
// v-else
