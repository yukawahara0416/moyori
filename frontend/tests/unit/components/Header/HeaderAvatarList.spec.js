import { shallowMount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Header/HeaderAvatarList.vue'

const localVue = createLocalVue()

let wrapper
let propsData

beforeEach(() => {
  propsData = {
    currentUser: {
      data: { id: 1, name: 'name', avatar: 'avatar' }
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
  })
})

describe('template', () => {
  it('v-list-item has text', () => {
    expect(wrapper.find('v-list-item-stub').text()).toEqual(
      `${propsData.currentUser.data.name} さん`
    )
  })

  // has currentUser

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
