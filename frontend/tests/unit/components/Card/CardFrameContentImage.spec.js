import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import { Spot } from '@/class/Spot.js'
import Component from '@/components/Card/CardFrameContentImage.vue'
import LikeButton from '@/components/Buttons/LikeButton.vue'
import CommentButton from '@/components/Buttons/CommentButton.vue'

const localVue = createLocalVue()
localVue.use(Vuetify)

let wrapper
let propsData

let vuetify

beforeEach(() => {
  propsData = {
    spot: new Spot({
      data: { id: 1, name: 'test', photo_url: 'test' },
      comments: [{ image: 'test' }]
    })
  }

  vuetify = new Vuetify()

  wrapper = shallowMount(Component, {
    localVue,
    propsData,
    vuetify
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
  it('image, spot.data.photo_url is true', () => {
    propsData = {
      spot: {
        data: { id: 1, name: 'test', photo_url: 'test' },
        comments: [{ image: 'test' }]
      }
    }

    vuetify = new Vuetify()

    wrapper = shallowMount(Component, {
      localVue,
      propsData,
      vuetify
    })
    expect(wrapper.vm.photo).toEqual(propsData.spot.data.photo_url)
  })

  it('image/spot.data.photo_url is false', () => {
    propsData = {
      spot: {
        data: { id: 1, name: 'test', photo_url: '' },
        comments: [{ image: 'test' }]
      }
    }

    vuetify = new Vuetify()

    wrapper = shallowMount(Component, {
      localVue,
      propsData,
      vuetify
    })
    expect(wrapper.vm.photo).toEqual(propsData.spot.comments[0].image)
  })

  it('image/spot.data.photo_url & filterImages.length is false', () => {
    propsData = {
      spot: {
        data: { id: 1, name: 'test', photo_url: '' },
        comments: []
      }
    }

    vuetify = new Vuetify()

    wrapper = shallowMount(Component, {
      localVue,
      propsData,
      vuetify
    })
    expect(wrapper.vm.photo).toEqual(require('@/assets/noimage.png'))
  })

  it('filterImages', () => {
    propsData = {
      spot: {
        data: { id: 1, name: 'test', image: 'test' },
        comments: [{ image: 'test' }]
      }
    }

    vuetify = new Vuetify()

    wrapper = shallowMount(Component, {
      localVue,
      propsData,
      vuetify
    })
    expect(wrapper.vm.filterImages.length).toEqual(1)
  })
})

describe('template', () => {
  it('LikeButton has :spot', () => {
    expect(wrapper.find(LikeButton).props().spot).toMatchObject(propsData.spot)
  })
  it('CommentButton has :spot', () => {
    expect(wrapper.find(CommentButton).props().spot).toMatchObject(
      propsData.spot
    )
  })
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
