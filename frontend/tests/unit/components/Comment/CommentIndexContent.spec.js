import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Comment/CommentIndexContent.vue'

const localVue = createLocalVue()

let wrapper
let propsData

beforeEach(() => {
  propsData = {
    comment: { id: 1, content: 'test', image: 'test' }
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
  it('isImageExist is true', () => {
    expect(wrapper.vm.isImageExist(propsData.comment)).toBe(true)
  })

  it('isImageExist is false', () => {
    propsData = {
      comment: { id: 1, content: 'test', image: null }
    }

    wrapper = shallowMount(Component, {
      localVue,
      propsData
    })

    expect(wrapper.vm.isImageExist(propsData.comment)).toBe(false)
  })

  it('isAboveLimit is true', () => {
    propsData = {
      comment: {
        id: 1,
        content: 'a'.repeat(101),
        image: 'test'
      }
    }

    wrapper = shallowMount(Component, {
      localVue,
      propsData
    })

    expect(wrapper.vm.isAboveLimit).toBe(true)
  })

  it('isAboveLimit is false', () => {
    expect(wrapper.vm.isAboveLimit).toBe(false)
  })

  it('readMore is true', () => {
    propsData = {
      comment: {
        id: 1,
        content: 'a'.repeat(101),
        image: 'test'
      }
    }

    wrapper = shallowMount(Component, {
      localVue,
      propsData
    })

    expect(wrapper.vm.readMore).toBe(true)
  })

  it('readMore is false', () => {
    expect(wrapper.vm.readMore).toBe(false)
  })
})

describe('v-on', () => {
  it('click activateReadMore', () => {
    const activateReadMore = jest.fn()

    propsData = {
      comment: {
        id: 1,
        content: 'a'.repeat(101),
        image: 'test'
      }
    }

    wrapper = mount(Component, {
      localVue,
      propsData,
      methods: {
        activateReadMore
      }
    })

    wrapper.find('a').trigger('click')
    expect(activateReadMore).toHaveBeenCalled()
  })
})
