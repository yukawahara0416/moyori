import { mount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Profile/ProfileActionsDeleteButton.vue'
import Vuetify from 'vuetify'

const localVue = createLocalVue()
localVue.use(Vuetify)

let wrapper
let propsData
let vuetify

const openDialog = jest.fn()
const closeDialog = jest.fn()

beforeEach(() => {
  propsData = {
    id: 2,
    user: { data: { id: 1 } }
  }
  vuetify = new Vuetify()

  wrapper = mount(Component, {
    localVue,
    propsData,
    vuetify,
    methods: { openDialog, closeDialog }
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

describe('computed', () => {
  it('isTestUser', () => {
    expect(wrapper.vm.isTestUser).toBeFalsy()
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
