import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Profile/ProfileActionsEditButton.vue'

const localVue = createLocalVue()

let wrapper

describe('props', () => {
  it('user', () => {
    const propsData = { user: { data: { id: 1 } } }
    wrapper = shallowMount(Component, { localVue, propsData })
    expect(wrapper.props().user).toStrictEqual(propsData.user)
    expect(wrapper.props().user instanceof Object).toBe(true)
  })
})

describe('v-on', () => {
  const openDialog = jest.fn()
  const closeDialog = jest.fn()

  beforeEach(() => {
    wrapper = mount(Component, {
      localVue,
      methods: { openDialog, closeDialog }
    })
  })

  it('dialogOn', () => {
    wrapper.find('.v-btn').trigger('click')
    expect(openDialog).toHaveBeenCalledTimes(1)
  })

  it('$emit.closeDialog', () => {
    wrapper.vm.$emit('closeDialog')
    expect(wrapper.emitted().closeDialog).toBeTruthy()
  })
})

describe('methods', () => {
  beforeEach(() => {
    wrapper = shallowMount(Component, { localVue })
  })

  it('openDialog', () => {
    wrapper.vm.openDialog()
    expect(wrapper.vm.dialog).toBe(true)
  })

  it('closeDialog', () => {
    wrapper.vm.dialog = true
    wrapper.vm.closeDialog()
    expect(wrapper.vm.dialog).toBe(false)
  })
})

describe('template', () => {
  it('snapshot', () => {
    wrapper = shallowMount(Component, { localVue })
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
