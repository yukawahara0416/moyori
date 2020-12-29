import { shallowMount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Comment/CommentIndexUsername.vue'

const localVue = createLocalVue()

let wrapper
let propsData

beforeEach(() => {
  propsData = {
    comment: { id: 1, user_name: 'test' }
  }

  wrapper = shallowMount(Component, {
    localVue,
    propsData
  })
})
