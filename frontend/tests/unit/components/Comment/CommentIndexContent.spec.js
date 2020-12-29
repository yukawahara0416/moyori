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

describe('methods', () => {
  it('activateReadMore', () => {
    wrapper.vm.activateReadMore()
    expect(wrapper.vm.readMoreToggle).toBe(true)
  })
})

describe('template', () => {
  it(':cols="isImageExist(comment) is 10"', () => {
    expect(wrapper.find('v-col-stub').attributes().cols).toEqual('10')
  })

  it(':cols="isImageExist(comment) is 12"', () => {
    propsData = {
      comment: { id: 1, content: 'test', image: null }
    }

    wrapper = shallowMount(Component, {
      localVue,
      propsData
    })

    expect(wrapper.find('v-col-stub').attributes().cols).toEqual('12')
  })

  it('v-if readMore', () => {
    propsData = {
      comment: {
        id: 1,
        content: 'a'.repeat(101),
        image: 'test'
      }
    }

    wrapper = mount(Component, {
      localVue,
      propsData
    })

    expect(wrapper.find('a').text()).toContain('...続きをよむ')
  })

  it('v-else readMore', () => {
    expect(wrapper.find('p').text()).toEqual(propsData.comment.content)
  })

  it('v-if isImageExist is true', () => {
    expect(wrapper.find('comment-index-image-stub').exists()).toBe(true)
  })

})
