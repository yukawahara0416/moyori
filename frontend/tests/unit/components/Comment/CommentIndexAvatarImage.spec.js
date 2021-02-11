import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import Component from '@/components/Comment/CommentIndexAvatarImage.vue'

const localVue = createLocalVue()

let wrapper
let propsData

beforeEach(() => {
  propsData = {
    comment: { id: 1, user_id: 1, user_name: 'test', avatar: 'test' }
  }

  wrapper = shallowMount(Component, {
    localVue,
    propsData,
    stubs: {
      RouterLink: RouterLinkStub
    }
  })
})

describe('props', () => {
  it('comment', () => {
    expect(wrapper.props().comment).toStrictEqual(propsData.comment)
    expect(wrapper.props().comment instanceof Object).toBeTruthy()
  })
})

describe('router-link', () => {
  it('{ name: "profile" }', () => {
    expect(
      wrapper
        .findAll(RouterLinkStub)
        .at(0)
        .props().to.name
    ).toEqual('profile')
  })

  it('{ params: { id: comment.user_id } }', () => {
    expect(
      wrapper
        .findAll(RouterLinkStub)
        .at(0)
        .props().to.params.id
    ).toEqual(propsData.comment.user_id)
  })
})

describe('template', () => {
  it('v-if="comment.avatar"', () => {
    expect(wrapper.find('v-img-stub').exists()).toBeTruthy()
  })

  it('v-else {{ comment.user_name.slice(0, 1) }}', () => {
    propsData = {
      comment: { id: 1, user_id: 1, user_name: 'test', avatar: null }
    }

    wrapper = shallowMount(Component, {
      localVue,
      propsData,
      stubs: {
        RouterLink: RouterLinkStub
      }
    })
    expect(wrapper.find('v-img-stub').exists()).toBeFalsy()
    expect(wrapper.find('span').text()).toEqual(
      propsData.comment.user_name.slice(0, 1)
    )
    expect(wrapper.vm.$el).toMatchSnapshot()
  })

  it(':src', () => {
    expect(wrapper.find('v-img-stub').attributes().src).toEqual(
      propsData.comment.avatar
    )
  })

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
