import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Profile/ProfileActionsEditButton.vue'
import Vuetify from 'vuetify'

const localVue = createLocalVue()
localVue.use(Vuetify)

let wrapper
let vuetify

beforeEach(() => {
  vuetify = new Vuetify()
})

describe('props', () => {
  it('user', () => {
    const propsData = { user: { data: { id: 1 } } }
    wrapper = shallowMount(Component, { localVue, vuetify, propsData })
    expect(wrapper.props().user).toStrictEqual(propsData.user)
    expect(wrapper.props().user instanceof Object).toBe(true)
  })
})

describe('computed', () => {
  it('isTestUser', () => {
    const propsData = {
      id: 1,
      user: { data: { id: 1 } }
    }
    wrapper = shallowMount(Component, { localVue, vuetify, propsData })
    expect(wrapper.vm.isTestUser).toBe(true)
  })
})

describe('v-on', () => {
  const openDialog = jest.fn()
  const closeDialog = jest.fn()

  beforeEach(() => {
    wrapper = mount(Component, {
      localVue,
      vuetify,
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
    wrapper = shallowMount(Component, { localVue, vuetify })
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
    wrapper = shallowMount(Component, { localVue, vuetify })
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
