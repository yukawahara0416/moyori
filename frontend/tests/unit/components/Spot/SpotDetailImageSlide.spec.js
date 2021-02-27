import { shallowMount, createLocalVue } from '@vue/test-utils'
import { Spot } from '@/class/Spot.js'
import Component from '@/components/Spot/SpotDetailImageSlide.vue'
import SpotDetailImageSlideDialog from '@/components/Spot/SpotDetailImageSlideDialog.vue'

const localVue = createLocalVue()

let wrapper
let propsData

const hasFull = {
  data: { id: 1, image: 'image1', picture: 'picture' },
  comments: [
    { id: 1, image: 'image2' },
    { id: 2, image: 'image3' }
  ]
}

const notHas = {
  data: { id: 1, image: null, picture: null },
  comments: [
    { id: 1, image: null },
    { id: 2, image: null }
  ]
}

beforeEach(() => {
  propsData = {
    spot: new Spot(hasFull)
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

describe('computed', () => {
  it('images', () => {
    expect(wrapper.vm.images).toMatchObject([
      'picture',
      'image2',
      'image3',
      'image1'
    ])
  })

  it('postImage', () => {
    expect(wrapper.vm.postImage).toMatchObject(['picture'])
  })

  it('commentImages', () => {
    expect(wrapper.vm.commentImages).toMatchObject(['image2', 'image3'])
  })

  it('gmapImages', () => {
    expect(wrapper.vm.gmapImages).toMatchObject(['image1'])
  })
})

describe('template', () => {
  it('v-if="images.length < 1"', async () => {
    await wrapper.setProps({ spot: new Spot(notHas) })

    expect(wrapper.find('v-img-stub').exists()).toBeTruthy()
    expect(wrapper.find(SpotDetailImageSlideDialog).exists()).toBeFalsy()
    expect(wrapper.vm.$el).toMatchSnapshot()
  })

  it('v-else', () => {
    expect(wrapper.findAll('v-slide-item-stub').length).toBe(4)
  })

  it('SpotDetailImageSlideDialog has :photo', () => {
    const target = wrapper.findAll(SpotDetailImageSlideDialog)
    expect(target.at(0).attributes().photo).toEqual('picture')
    expect(target.at(1).attributes().photo).toEqual('image2')
    expect(target.at(2).attributes().photo).toEqual('image3')
    expect(target.at(3).attributes().photo).toEqual('image1')
  })

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
