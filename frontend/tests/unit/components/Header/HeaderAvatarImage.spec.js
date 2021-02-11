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

describe('props', () => {
  it('currentUser', async () => {
    expect(wrapper.props().currentUser).toStrictEqual(propsData.currentUser)
    expect(wrapper.props().currentUser instanceof Object).toBeTruthy()
  })
})

describe('template', () => {
  it('v-if="currentUser.data.avatar"', () => {
    expect(wrapper.html().includes('v-img-stub')).toBeTruthy()
  })
  it('v-else', () => {
    expect(wrapper.html().includes('span')).toBeFalsy()
  })

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
