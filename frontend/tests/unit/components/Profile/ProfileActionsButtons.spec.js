import { shallowMount } from '@vue/test-utils'
import Component from '@/components/Profile/ProfileActionsButtons.vue'

let wrapper
let propsData

beforeEach(() => {
  propsData = {
    id: 1,
    headers: { uid: 'tester@example.com' },
    currentUser: { data: { id: 1 } }
  }

  wrapper = shallowMount(Component, {
    propsData
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('props', () => {
  it('id', () => {
    expect(wrapper.props().id).toStrictEqual(propsData.id)
    expect(typeof wrapper.vm.$props.id).toBe('number')
  })
  it('headers', () => {
    expect(wrapper.props().headers).toStrictEqual(propsData.headers)
    expect(wrapper.props().headers instanceof Object).toBe(true)
  })
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
