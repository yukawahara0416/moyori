import { shallowMount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Header/HeaderAvatarList.vue'
import HeaderAvatarListMypage from '@/components/Header/HeaderAvatarListMypage.vue'

const localVue = createLocalVue()

let wrapper
let propsData

beforeEach(() => {
  propsData = {
    currentUser: {
      data: { id: 1, name: 'name' }
    }
  }

  wrapper = shallowMount(Component, {
    localVue,
    propsData
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
  it('v-list-item has text', () => {
    expect(wrapper.find('v-list-item-stub').text()).toEqual(
      `${wrapper.vm.$props.currentUser.data.name} さん`
    )
  })

  it('HeaderAvatarListMypage has :currentUser', () => {
    expect(wrapper.find(HeaderAvatarListMypage).props().currentUser).toEqual(
      wrapper.vm.$props.currentUser
    )
  })

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
