import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Comment/CommentIndexImage.vue'
import CommentIndexImageDialog from '@/components/Comment/CommentIndexImageDialog.vue'

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
    expect(wrapper.vm.dialog).toBeTruthy()
  })
})

describe('template', () => {
  it('v-img has :src', () => {
    expect(wrapper.find('v-img-stub').attributes().src).toEqual(
      propsData.comment.image
    )
  })

  it('CommentIndexImageDialog:comment', () => {
    expect(wrapper.find(CommentIndexImageDialog).props().comment).toEqual(
      wrapper.vm.$props.comment
    )
  })

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
