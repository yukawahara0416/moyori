import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/components/Header/HeaderAvatarImage.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let propsData
let store

beforeEach(() => {
  propsData = {
    currentUser: {
      data: {
        id: 1,
        name: 'test',
        image: 'image'
      }
    }
  }

  wrapper = shallowMount(Component, {
    localVue,
    propsData,
    store
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
