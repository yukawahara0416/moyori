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
  it('click closeDeleteDialog', () => {})

  it('click deleteHandler', () => {})
})

describe('methods', () => {
  it('deleteHandler', () => {})
  it('deleteSpot', () => {})
  it('closeDeleteDialog', () => {})
  it('closeDetailDialog', () => {})
  it('storeMutation', () => {})
})
