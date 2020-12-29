import { shallowMount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Comment/CommentIndexImageDialog.vue'

const localVue = createLocalVue()

let wrapper
let propsData

beforeEach(() => {
  propsData = {
    comment: { id: 1, image: 'test' }
  }

  wrapper = shallowMount(Component, {
    localVue,
    propsData
  })
})
