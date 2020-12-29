import { shallowMount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Comment/CommentIndexDay.vue'

const localVue = createLocalVue()

let wrapper
let propsData

beforeEach(() => {
  propsData = {
    comment: { id: 1, created_at: '2020-12-02T00:00:00.000Z' }
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

describe('computed', () => {
})
