import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Comment/CommentIndexImage.vue'

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

describe('props', () => {
  it('comment', () => {
    expect(wrapper.props().comment).toStrictEqual(propsData.comment)
    expect(wrapper.props().comment instanceof Object).toBe(true)
  })
})

describe('v-on', () => {
  it('click openDialog', () => {
    const openDialog = jest.fn()

    wrapper = mount(Component, {
      localVue,
      propsData,
      methods: {
        openDialog
      }
    })

    wrapper.find('.v-image').trigger('click')
    expect(openDialog).toHaveBeenCalled()
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})

describe('methods', () => {
  it('openDialog', () => {
    wrapper.vm.openDialog()
    expect(wrapper.vm.dialog).toBe(true)
  })
})

describe('template', () => {
  it('v-img has :src', () => {
    expect(wrapper.find('v-img-stub').attributes().src).toEqual(
      propsData.comment.image
    )
  })

  it('comment-index-image-dialog has :comment', () => {
    expect(
      wrapper.find('comment-index-image-dialog-stub').attributes().comment
    ).toEqual('[object Object]')
  })

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
