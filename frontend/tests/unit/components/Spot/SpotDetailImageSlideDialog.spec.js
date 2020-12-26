import { mount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Spot/SpotDetailImageSlideDialog.vue'

const localVue = createLocalVue()

let wrapper
let propsData

beforeEach(() => {
  propsData = {
    photo: 'test'
  }

  wrapper = mount(Component, {
    localVue,
    propsData
  })
})

describe('props', () => {
  it('photo', () => {
    expect(wrapper.props().photo).toStrictEqual(propsData.photo)
    expect(typeof wrapper.vm.$props.photo).toBe('string')
  })
})

describe('v-on', () => {
  it('openDialog', () => {
    const openDialog = jest.fn()
    propsData = {
      photo: 'test'
    }

    wrapper = mount(Component, {
      localVue,
      propsData,
      methods: {
        openDialog
      }
    })

    wrapper
      .findAll('.v-card')
      .at(0)
      .trigger('click')
    expect(openDialog).toHaveBeenCalled()
  })
})

describe('methods', () => {
  it('openDialog', () => {})
})

describe('template', () => {
  it('v-img has :src', () => {})

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
