import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/components/Profile/ProfileActions.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let propsData

beforeEach(() => {
  propsData = {
    id: 1,
    user: { data: { id: 1 }, posts: [{ data: { id: 1 } }] },
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
  it('user', () => {
    expect(wrapper.props().user).toStrictEqual(propsData.user)
    expect(wrapper.props().user instanceof Object).toBe(true)
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
