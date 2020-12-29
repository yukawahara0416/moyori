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

describe('props', () => {
  it('comment', () => {
    expect(wrapper.props().comment).toStrictEqual(propsData.comment)
    expect(wrapper.props().comment instanceof Object).toBe(true)
  })
})

describe('template', () => {
  it('comment.user_name', () => {
    expect(wrapper.find('span').text()).toEqual(
      `${propsData.comment.user_name} さん`
    )
  })
})
