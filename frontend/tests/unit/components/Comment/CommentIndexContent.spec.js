import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Comment/CommentIndexContent.vue'

const localVue = createLocalVue()

let wrapper
let propsData

beforeEach(() => {
  propsData = {
    comment: { id: 1, content: 'test', image: 'test' }
  }

})
