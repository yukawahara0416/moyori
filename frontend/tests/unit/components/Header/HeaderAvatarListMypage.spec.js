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
    console.log(wrapper.html())
    expect(wrapper.vm.$props.currentUser).toStrictEqual(propsData.currentUser)
    expect(wrapper.vm.$props.currentUser instanceof Object).toBeTruthy()
    expect(wrapper.vm.$options.props.currentUser.required).toBeTruthy()
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
