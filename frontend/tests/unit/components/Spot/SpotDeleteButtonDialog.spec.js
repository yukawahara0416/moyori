import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import { Spot } from '@/class/Spot.js'
import { axiosBase } from '@/plugins/axios.js'
import MockAdapter from 'axios-mock-adapter'
import Component from '@/components/Spot/SpotDeleteButtonDialog.vue'

const localVue = createLocalVue()
const axiosMock = new MockAdapter(axiosBase)

let wrapper
let propsData

beforeEach(() => {
  propsData = {
    spot: new Spot({
      data: { id: 1 }
    })
  }

  wrapper = shallowMount(Component, {
    localVue,
    propsData
  })
})

describe('props', () => {
  it('spot', () => {
    expect(wrapper.vm.$props.spot).toStrictEqual(propsData.spot)
    expect(wrapper.vm.$props.spot instanceof Spot).toBeTruthy()
    expect(wrapper.vm.$options.props.spot.required).toBeTruthy()
  })
})

describe('v-on', () => {
  it('click closeDeleteDialog/deleteHandler', () => {
    const closeDeleteDialog = jest.fn()
    const deleteHandler = jest.fn()

    wrapper = mount(Component, {
      localVue,
      propsData,
      methods: {
        closeDeleteDialog,
        deleteHandler
      }
    })

    wrapper
      .findAll('.v-btn')
      .at(0)
      .trigger('click')
    expect(closeDeleteDialog).toHaveBeenCalled()

    wrapper
      .findAll('.v-btn')
      .at(1)
      .trigger('click')
    expect(deleteHandler).toHaveBeenCalled()
  })
})

describe('methods', () => {
  it('deleteHandler', () => {})
  it('deleteSpot', () => {})
  it('storeMutation', () => {})
})

describe('emit', () => {
  it('closeDeleteDialog', () => {
    wrapper.vm.$emit('closeDeleteDialog')
    expect(wrapper.emitted().closeDeleteDialog).toBeTruthy()
  })

  it('closeDetailDialog', () => {
    wrapper.vm.$emit('closeDetailDialog')
    expect(wrapper.emitted().closeDetailDialog).toBeTruthy()
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
