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
        name: 'name',
        avatar: 'avatar'
      }
    }
  }

  wrapper = shallowMount(Component, {
    localVue,
    propsData
  })
})

describe('props', () => {
  it('currentUser', async () => {
    expect(wrapper.vm.$props.currentUser).toStrictEqual(propsData.currentUser)
    expect(wrapper.vm.$props.currentUser instanceof Object).toBeTruthy()
    expect(wrapper.vm.$options.props.currentUser.required).toBeTruthy()
  })
})

describe('template', () => {
  it('v-if="currentUser.data.avatar"', () => {
    expect(wrapper.findAll('v-img-stub').length).toEqual(1)
  })

  // attribute

  it('v-else', () => {
    expect(wrapper.html().includes('span')).toBeFalsy()
  })

  // text

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
