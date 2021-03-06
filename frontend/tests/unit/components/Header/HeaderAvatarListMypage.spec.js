import { mount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import Component from '@/components/Header/HeaderAvatarListMypage.vue'

const localVue = createLocalVue()

let wrapper
let propsData

beforeEach(() => {
  propsData = {
    currentUser: { data: { id: 1 } }
  }

  wrapper = mount(Component, {
    localVue,
    propsData,
    stubs: {
      RouterLink: RouterLinkStub
    }
  })
})

describe('props', () => {
  it('currentUser', () => {
    expect(wrapper.vm.$props.currentUser).toStrictEqual(propsData.currentUser)
    expect(wrapper.vm.$props.currentUser instanceof Object).toBeTruthy()
    expect(wrapper.vm.$options.props.currentUser.required).toBeTruthy()
  })
})

describe('template', () => {
  it('v-list-item has to.name', () => {
    expect(wrapper.find(RouterLinkStub).props().to.name).toEqual('profile')
  })

  it('v-list-item has to.params', () => {
    expect(wrapper.find(RouterLinkStub).props().to.params).toMatchObject(
      wrapper.vm.$props.currentUser.data
    )
  })

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
