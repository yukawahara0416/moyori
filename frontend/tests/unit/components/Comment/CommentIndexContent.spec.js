import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Comment/CommentIndexContent.vue'
import CommentIndexImage from '@/components/Comment/CommentIndexImage.vue'

const localVue = createLocalVue()

let wrapper
let propsData

const hasFull = { id: 1, content: 'content', image: 'image' }
const notHasImage = { id: 1, content: 'content', image: null }
const hasTooLongContent = { id: 1, content: 'a'.repeat(101), image: 'image' }

beforeEach(() => {
  propsData = {
    comment: hasFull
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

describe('computed', () => {
  it('isImageExist is true', () => {
    expect(wrapper.vm.isImageExist(wrapper.vm.$props.comment)).toBeTruthy()
  })

  it('isImageExist is false', () => {
    wrapper.setProps({ comment: notHasImage })
    expect(wrapper.vm.isImageExist(wrapper.vm.$props.comment)).toBeFalsy()
  })

  it('isAboveLimit is true', () => {
    wrapper.setProps({ comment: hasTooLongContent })
    expect(wrapper.vm.isAboveLimit).toBeTruthy()
  })

  it('isAboveLimit is false', () => {
    expect(wrapper.vm.isAboveLimit).toBeFalsy()
  })

  it('readMore is true', () => {
    wrapper.setProps({ comment: hasTooLongContent })
    expect(wrapper.vm.readMore).toBeTruthy()
  })

  it('readMore is false', () => {
    expect(wrapper.vm.readMore).toBeFalsy()
  })
})

describe('v-on', () => {
  it('click activateReadMore', () => {
    const activateReadMore = jest.fn()

    wrapper = mount(Component, {
      localVue,
      propsData: {
        comment: hasTooLongContent
      },
      methods: {
        activateReadMore
      }
    })

    wrapper.find('a').trigger('click')
    expect(activateReadMore).toHaveBeenCalled()
  })
})

describe('methods', () => {
  it('activateReadMore', () => {
    wrapper.setData({ readMoreToggle: false })

    wrapper.vm.activateReadMore()
    expect(wrapper.vm.readMoreToggle).toBeTruthy()
  })
})

describe('template', () => {
  it(':cols="isImageExist(comment) is 10"', () => {
    expect(wrapper.find('v-col-stub').attributes().cols).toEqual('10')
  })

  it(':cols="isImageExist(comment) is 12"', () => {
    wrapper = shallowMount(Component, {
      localVue,
      propsData: {
        comment: notHasImage
      }
    })

    expect(wrapper.find('v-col-stub').attributes().cols).toEqual('12')
  })

  it('v-if readMore', () => {
    wrapper = shallowMount(Component, {
      localVue,
      propsData: {
        comment: hasTooLongContent
      }
    })

    expect(wrapper.find('a').text()).toContain('...続きをよむ')
  })

  it('v-else readMore', () => {
    expect(wrapper.find('p').text()).toEqual(wrapper.vm.$props.comment.content)
  })

  it('v-if isImageExist is true', () => {
    expect(wrapper.find(CommentIndexImage).exists()).toBeTruthy()
  })

  it('v-if isImageExist is false', () => {
    wrapper = shallowMount(Component, {
      localVue,
      propsData: {
        comment: notHasImage
      }
    })

    expect(wrapper.find(CommentIndexImage).exists()).toBeFalsy()
  })

  it('CommentIndexImage has :comment', () => {
    expect(wrapper.find(CommentIndexImage).props().comment).toMatchObject(
      wrapper.vm.$props.comment
    )
  })

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
