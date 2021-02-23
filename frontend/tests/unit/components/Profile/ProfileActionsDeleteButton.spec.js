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
    id: 1,
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
  it('isTestUser return true', () => {
    wrapper.setProps({ id: 1 })
    expect(wrapper.vm.isTestUser).toBeTruthy()
  })

  it('isTestUser return false', () => {
    //
    expect(wrapper.vm.isTestUser).toBeFalsy()
  })
})

describe('v-on', () => {
  it('click openDialog', () => {
    wrapper.find('.v-btn').trigger('click')
    expect(openDialog).toHaveBeenCalledTimes(1)
  })
})

describe('methods', () => {
  it('openDialog', () => {
    const app = document.createElement('div')
    app.setAttribute('data-app', true)
    document.body.append(app)

    propsData = {
      id: 2,
      user: { data: { id: 1 } }
    }
    // vuetify = new Vuetify()

    wrapper = mount(Component, {
      localVue,
      propsData,
      vuetify
      // methods: { openDialog, closeDialog }
    })

    wrapper.setData({ dialog: false })
    wrapper.vm.openDialog()
    expect(wrapper.vm.dialog).toBeTruthy()
  })

  it('closeDialog', () => {
    const app = document.createElement('div')
    app.setAttribute('data-app', true)
    document.body.append(app)

    propsData = {
      id: 2,
      user: { data: { id: 1 } }
    }
    // vuetify = new Vuetify()

    wrapper = mount(Component, {
      localVue,
      propsData,
      vuetify
      // methods: { openDialog, closeDialog }
    })

    wrapper.setData({ dialog: true })
    wrapper.vm.closeDialog()
    expect(wrapper.vm.dialog).toBeFalsy()
  })
})

describe('emit', () => {
  it('$emit.closeDialog', () => {
    wrapper.vm.$emit('closeDialog')
    expect(wrapper.emitted().closeDialog).toBeTruthy()
  })
})

describe('template', () => {
  it('v-btn click disabled', () => {
    expect(wrapper.find('.v-btn').attributes().disabled).toBeTruthy()
  })

  it('v-btn click abled', () => {
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

    expect(wrapper.find('.v-btn').attributes().disabled).toBeFalsy()
  })

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
