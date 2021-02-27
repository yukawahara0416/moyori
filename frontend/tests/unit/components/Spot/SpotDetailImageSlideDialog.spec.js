import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Spot/SpotDetailImageSlideDialog.vue'

const localVue = createLocalVue()

let wrapper
let propsData

beforeEach(() => {
  propsData = {
    photo: 'photo'
  }

  wrapper = shallowMount(Component, {
    localVue,
    propsData
  })
})

describe('props', () => {
  it('photo', () => {
    expect(wrapper.vm.$props.photo).toStrictEqual(propsData.photo)
    expect(typeof wrapper.vm.$props.photo).toBe('string')
    expect(wrapper.vm.$options.props.photo.required).toBeTruthy()
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
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})

describe('methods', () => {
  it('openDialog', () => {
    wrapper.vm.openDialog()
    expect(wrapper.vm.dialog).toBeTruthy()
  })
})

describe('template', () => {
  it('v-img has :src', () => {
    const target = wrapper.findAll('v-img-stub')
    expect(target.at(0).attributes().src).toEqual('test')
    expect(target.at(1).attributes().src).toEqual('test')
  })

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
