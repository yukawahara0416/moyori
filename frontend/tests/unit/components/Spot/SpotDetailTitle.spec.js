import { shallowMount, createLocalVue } from '@vue/test-utils'
import { Spot } from '@/class/Spot.js'
import Component from '@/components/Spot/SpotDetailTitle.vue'
import LikeButton from '@/components/Buttons/LikeButton.vue'

const localVue = createLocalVue()

let wrapper
let propsData

beforeEach(() => {
  propsData = {
    spot: new Spot({
      data: { id: 1, name: 'name' }
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

describe('template', () => {
  it('{{ spot.data.name }}', () => {
    expect(wrapper.find('.ml-2').text()).toEqual(propsData.spot.data.name)
  })

  it('LikeButton has :spot', () => {
    expect(wrapper.find(LikeButton).props().spot).toMatchObject(
      wrapper.vm.$props.spot
    )
  })

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
