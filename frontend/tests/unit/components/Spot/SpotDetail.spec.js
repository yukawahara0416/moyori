// props spot
// emit

//template
// spot-detail-title spot
// spot-detail-image-slide spot
// spot-detail-wifi-panel spot
// spot-detail-power-panel spot
// spot-detail-comment-panel spot
// spot-detail-info-panel spot

import { shallowMount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Search/SearchMapContainer.vue'

const localVue = createLocalVue()

let wrapper

beforeEach(() => {
  wrapper = shallowMount(Component, {
    localVue
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
