import { shallowMount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Spot/SpotDetailImageSlide.vue'

const localVue = createLocalVue()

let wrapper
let propsData

beforeEach(() => {
  propsData = {
    spot: {
      data: { id: 1, image: 'test1' },
      comments: [
        { id: 1, image: 'test2' },
        { id: 2, image: 'test3' }
      ]
    }
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

describe('computed', () => {
  it('images', () => {
    expect(wrapper.vm.images).toMatchObject(['test2', 'test3', 'test1'])
  })

  it('commentImages', () => {
    expect(wrapper.vm.commentImages).toMatchObject(['test2', 'test3'])
  })

  it('gmapImages', () => {
    expect(wrapper.vm.gmapImages).toMatchObject(['test1'])
  })
})

describe('template', () => {
  it('v-else v-slide-item count 3', () => {
    expect(wrapper.findAll('v-slide-item-stub').length).toBe(3)
  })

  it('v-else spot-detail-image-slide-dialog has :photo', () => {
    const target = wrapper.findAll('spot-detail-image-slide-dialog-stub')
    expect(target.at(0).attributes().photo).toEqual('test2')
    expect(target.at(1).attributes().photo).toEqual('test3')
    expect(target.at(2).attributes().photo).toEqual('test1')
  })

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
