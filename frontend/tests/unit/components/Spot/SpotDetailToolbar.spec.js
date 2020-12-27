import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Spot/SpotDetailToolbar.vue'

const localVue = createLocalVue()

let wrapper

beforeEach(() => {
  wrapper = shallowMount(Component, {
    localVue
  })
})

describe('v-on', () => {
  it('closeDialog', () => {
    const closeDialog = jest.fn()

    wrapper = mount(Component, {
      localVue,
      methods: {
        closeDialog
      }
    })

    wrapper.find('.v-btn').trigger('click')
    expect(closeDialog).toHaveBeenCalled()
  })
})

describe('emit', () => {
  it('closeDialog', () => {
    wrapper.vm.$emit('closeDialog')
    expect(wrapper.emitted()['closeDialog']).toBeTruthy()
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
