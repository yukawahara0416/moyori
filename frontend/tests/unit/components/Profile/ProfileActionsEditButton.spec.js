import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Profile/ProfileActionsEditButton.vue'
import Vuetify from 'vuetify'

const localVue = createLocalVue()
localVue.use(Vuetify)

let wrapper
let propsData
let vuetify

beforeEach(() => {
  propsData = {
    id: 1,
    user: { data: { id: 1 } }
  }

  vuetify = new Vuetify()

  wrapper = shallowMount(Component, {
    localVue,
    propsData,
    vuetify
  })
})

describe('props', () => {
  it('id', () => {
    expect(wrapper.vm.$props.id).toStrictEqual(propsData.id)
    expect(typeof wrapper.vm.$props.id).toBe('number')
    expect(wrapper.vm.$options.props.id.required).toBeTruthy()
  })

  it('user', () => {
    expect(wrapper.vm.$props.user).toStrictEqual(propsData.user)
    expect(wrapper.vm.$props.user instanceof Object).toBeTruthy()
    expect(wrapper.vm.$options.props.user.required).toBeTruthy()
  })
})

describe('computed', () => {
  it('isTestUser is true', async () => {
    await wrapper.setProps({ id: 1 })
    expect(wrapper.vm.isTestUser).toBeTruthy()
  })

  it('isTestUser is false', async () => {
    await wrapper.setProps({ id: 2 })
    expect(wrapper.vm.isTestUser).toBeFalsy()
  })
})

describe('v-on', () => {
  const openDialog = jest.fn()
  const closeDialog = jest.fn()

  beforeEach(() => {
    propsData.id = 2

    wrapper = mount(Component, {
      localVue,
      propsData,
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
  it('openDialog', async () => {
    await wrapper.setData({ dialog: false })
    wrapper.vm.openDialog()
    expect(wrapper.vm.dialog).toBeTruthy()
  })

  it('closeDialog', async () => {
    await wrapper.setData({ dialog: true })
    wrapper.vm.closeDialog()
    expect(wrapper.vm.dialog).toBeFalsy()
  })
})

describe('emit', () => {})

describe('template', () => {
  it('v-btn click disabled', () => {})

  it('ProfileActionsEditDialog has :user', () => {})

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
