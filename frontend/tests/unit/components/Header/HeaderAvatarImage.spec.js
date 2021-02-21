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

  it('v-img has :src', () => {
    expect(wrapper.find('v-img-stub').attributes().src).toEqual(
      wrapper.vm.$props.currentUser.data.avatar
    )
  })

  it('v-else', async () => {
    await wrapper.setProps({
      currentUser: { data: { id: 1, name: 'name', avatar: null } }
    })

    expect(wrapper.findAll('span').length).toEqual(1)
  })

  it('span has text', async () => {
    await wrapper.setProps({
      currentUser: { data: { id: 1, name: 'name', avatar: null } }
    })

    expect(wrapper.find('span').text()).toEqual(
      wrapper.vm.$props.currentUser.data.name.slice(0, 1)
    )
  })

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
