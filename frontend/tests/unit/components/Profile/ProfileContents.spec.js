import { shallowMount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Profile/ProfileContents.vue'
import ProfileContentsItems from '@/components/Profile/ProfileContentsItems.vue'

const localVue = createLocalVue()

let wrapper
let propsData

beforeEach(() => {
  propsData = {
    user: { data: { id: 1 } }
  }

  wrapper = shallowMount(Component, {
    localVue,
    propsData
  })
})

describe('props', () => {
  it('user', () => {
    expect(wrapper.vm.$props.user).toEqual(propsData.user)
    expect(wrapper.vm.$props.user instanceof Object).toBeTruthy()
    expect(wrapper.vm.$options.props.user.required).toBeTruthy()
  })
})

describe('template', () => {
  it('ProfileContentsItems has :user', () => {
    expect(wrapper.find(ProfileContentsItems).props().user).toMatchObject(
      wrapper.vm.$props.user
    )
  })

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
