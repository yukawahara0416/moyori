import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import Component from '@/components/Comment/CommentIndexAvatarImage.vue'

const localVue = createLocalVue()

let wrapper
let propsData

beforeEach(() => {
  propsData = {
    comment: { id: 1, user_id: 1, user_name: 'test', avatar: 'test' }
  }

})
