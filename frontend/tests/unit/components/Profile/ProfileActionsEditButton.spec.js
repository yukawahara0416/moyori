import { mount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Profile/ProfileActionsEditButton.vue'

const localVue = createLocalVue()

let wrapper
let propsData

const openDialog = jest.fn()
const closeDialog = jest.fn()

beforeEach(() => {
  propsData = {
    user: { data: { id: 1 } }
  }

  wrapper = mount(Component, {
    localVue,
    propsData,
    methods: { openDialog, closeDialog }
  })
})

describe('props', () => {
  it('user', () => {
    expect(wrapper.props().user).toStrictEqual(propsData.user)
    expect(wrapper.props().user instanceof Object).toBe(true)
  })
})

describe('v-on', () => {
  it('dialogOn', () => {
    wrapper.find('.v-btn').trigger('click')
    expect(openDialog).toHaveBeenCalledTimes(1)
  })

  it('$emit.closeDialog', () => {
    wrapper.vm.$emit('closeDialog')
    expect(wrapper.emitted().closeDialog).toBeTruthy()
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
