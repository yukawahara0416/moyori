import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import { Spot } from '@/class/Spot.js'
import Component from '@/components/Spot/SpotDeleteButton.vue'

const localVue = createLocalVue()

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
  it('click openDialog', () => {})
})

describe('methods', () => {
  it('openDialog', () => {})
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
  it('SpotDeleteButtonDialog has :spot', () => {})
})
