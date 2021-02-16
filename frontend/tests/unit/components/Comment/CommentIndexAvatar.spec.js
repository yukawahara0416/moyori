import { shallowMount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Comment/CommentIndexAvatar.vue'
import CommentIndexAvatarImage from '@/components/Comment/CommentIndexAvatarImage.vue'

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
    expect(wrapper.vm.$props.comment).toStrictEqual(propsData.comment)
    expect(wrapper.vm.$props.comment instanceof Object).toBeTruthy()
    expect(wrapper.vm.$options.props.comment.required).toBeTruthy()
  })
})

describe('template', () => {
  it('CommentIndexAvatarImage has :comment', () => {
    expect(wrapper.find(CommentIndexAvatarImage).props().comment).toMatchObject(
      propsData.comment
    )
  })

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
