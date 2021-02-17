import { shallowMount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Comment/CommentIndexImageDialog.vue'

const localVue = createLocalVue()

let wrapper
let propsData

beforeEach(() => {
  propsData = {
    comment: { id: 1, image: 'image' }
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
  it('v-img has :src', () => {
    expect(wrapper.find('v-img-stub').attributes().src).toEqual('test')
  })

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
