import { shallowMount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Profile/ProfileItems.vue'
import ProfileItemsImage from '@/components/Profile/ProfileItemsImage.vue'
import ProfileItemsName from '@/components/Profile/ProfileItemsName.vue'

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
  it('ProfileItemsImage has :user', () => {
    expect(wrapper.find(ProfileItemsImage).props().user).toMatchObject(
      wrapper.vm.$props.user
    )
  })

  it('ProfileItemsName has :user', () => {
    expect(wrapper.find(ProfileItemsName).props().user).toMatchObject(
      wrapper.vm.$props.user
    )
  })

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
