import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Header/HeaderDemoButton.vue'

const localVue = createLocalVue()

let wrapper

beforeEach(() => {
  wrapper = shallowMount(Component, {
    localVue
  })
})

describe('v-on', () => {
  it('demoSearch', () => {
    const demoSearch = jest.fn()

    wrapper = mount(Component, {
      localVue,
      methods: {
        demoSearch
      }
    })

    wrapper.find('.v-btn').trigger('click')
    expect(demoSearch).toHaveBeenCalled()
  })
})

describe('emit', () => {
  it('demoSearch', () => {
    wrapper.vm.$emit('demoSearch')
    expect(wrapper.emitted().demoSearch).toBeTruthy()
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
