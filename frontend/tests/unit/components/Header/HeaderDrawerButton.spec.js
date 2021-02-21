import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import Component from '@/components/Header/HeaderDrawerButton.vue'

const localVue = createLocalVue()
localVue.use(Vuetify)

let wrapper
let propsData

let vuetify

beforeEach(() => {
  propsData = {
    value: false
  }

  wrapper = shallowMount(Component, {
    localVue,
    propsData
  })
})

describe('props', () => {
  it('value', () => {
    expect(wrapper.vm.$props.value).toStrictEqual(propsData.value)
    expect(typeof wrapper.vm.$props.value).toBe('boolean')
    expect(wrapper.vm.$options.props.value.required).toBeTruthy()
  })
})

describe('v-on', () => {
  it('input', async () => {
    const input = jest.fn()

    vuetify = new Vuetify()

    wrapper = mount(Component, {
      localVue,
      vuetify,
      propsData,
      methods: {
        input
      },
      stubs: ['header-drawer-pages', 'header-drawer-footer']
    })

    await wrapper.setProps({ value: true })

    wrapper.find('.v-navigation-drawer').trigger('input')
    expect(input).toHaveBeenCalled()
  })
})

describe('emit', () => {
  it('input', () => {
    wrapper.vm.input()
    expect(wrapper.emitted('input')).toBeTruthy()
  })
})

describe('template', () => {
  // value

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
