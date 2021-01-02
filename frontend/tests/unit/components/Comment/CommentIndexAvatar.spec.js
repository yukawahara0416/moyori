import { shallowMount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Comment/CommentIndexAvatar.vue'

const localVue = createLocalVue()

let wrapper
let propsData

beforeEach(() => {
  propsData = {
    comment: { id: 1 }
  }

  wrapper = shallowMount(Component, {
    localVue,
    propsData
  })
})

describe('props', () => {
  it('comment', () => {
    expect(wrapper.props().comment).toStrictEqual(propsData.comment)
    expect(wrapper.props().comment instanceof Object).toBe(true)
  })
})

describe('template', () => {
  it('comment-index-avatar-image-stub has :comment', () => {
    expect(
      wrapper.find('comment-index-avatar-image-stub').attributes().comment
    ).toEqual('[object Object]')
  })

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
