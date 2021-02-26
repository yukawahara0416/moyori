import { shallowMount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Profile/ProfileItemsImage.vue'

const localVue = createLocalVue()

let wrapper
let propsData

beforeEach(() => {
  propsData = {
    user: { data: { id: 1, avatar: 'avatar' } }
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

describe('computed', () => {
  it('avatar return filledData', () => {
    expect(wrapper.vm.avatar).toEqual(wrapper.vm.$props.user.data.avatar)
  })

  it('avatar return noimage', async () => {
    await wrapper.setProps({ user: { data: { id: 1, avatar: null } } })
    expect(wrapper.vm.avatar).toEqual('')
  })
})

describe('template', () => {
  it('v-img has :src', () => {
    expect(wrapper.find('v-img-stub').attributes().src).toEqual(
      wrapper.vm.$props.user.data.avatar
    )
  })

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
