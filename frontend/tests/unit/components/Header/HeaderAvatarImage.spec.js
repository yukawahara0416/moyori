import { shallowMount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Header/HeaderAvatarImage.vue'

const localVue = createLocalVue()

let wrapper
let propsData

beforeEach(() => {
  propsData = {
    currentUser: {
      data: {
        id: 1,
        name: 'test',
        avatar: 'test'
      }
    }
  }

  wrapper = shallowMount(Component, {
    localVue,
    propsData
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('props', () => {
  it('currentUser', () => {
    expect(wrapper.props().currentUser).toStrictEqual(propsData.currentUser)
    expect(wrapper.props().currentUser instanceof Object).toBe(true)
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
