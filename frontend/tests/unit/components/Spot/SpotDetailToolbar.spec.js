import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Spot/SpotDetailToolbar.vue'

const localVue = createLocalVue()

let wrapper

  wrapper = shallowMount(Component, {
    localVue
  })
