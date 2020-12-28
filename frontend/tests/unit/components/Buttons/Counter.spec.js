import { shallowMount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Buttons/Counter.vue'

const localVue = createLocalVue()

let wrapper
let propsData

beforeEach(() => {
  propsData = {
    spot: {
      data: { id: 1 },
      comments: [{ id: 1 }, { id: 2 }]
    },
    target: 'comments'
  }

  wrapper = shallowMount(Component, {
    localVue,
    propsData
  })
})

describe('props', () => {
  it('spot', () => {
    expect(wrapper.props().spot).toStrictEqual(propsData.spot)
    expect(wrapper.props().spot instanceof Object).toBe(true)
  })

})
