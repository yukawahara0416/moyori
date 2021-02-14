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
    expect(wrapper.vm.$props.comment).toStrictEqual(propsData.comment)
    expect(wrapper.vm.$props.comment instanceof Object).toBeTruthy()
  })
})

describe('computed', () => {
  it('isImageExist is true', () => {
    expect(wrapper.vm.isImageExist(propsData.comment)).toBeTruthy()
  })

  it('isImageExist is false', () => {
    propsData = {
      comment: { id: 1, content: 'test', image: null }
    }

    wrapper = shallowMount(Component, {
      localVue,
      propsData
    })

    expect(wrapper.vm.isImageExist(propsData.comment)).toBeFalsy()
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

    expect(wrapper.vm.isAboveLimit).toBeTruthy()
  })

  it('isAboveLimit is false', () => {
    expect(wrapper.vm.isAboveLimit).toBeFalsy()
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

    expect(wrapper.vm.readMore).toBeTruthy()
  })

  it('readMore is false', () => {
    expect(wrapper.vm.readMore).toBeFalsy()
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
    expect(wrapper.vm.readMoreToggle).toBeTruthy()
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
    expect(wrapper.find('comment-index-image-stub').exists()).toBeTruthy()
  })

  it('v-if isImageExist is false', () => {
    propsData = {
      comment: { id: 1, content: 'test', image: null }
    }

    wrapper = shallowMount(Component, {
      localVue,
      propsData
    })

    expect(wrapper.find('comment-index-image-stub').exists()).toBeFalsy()
  })

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
