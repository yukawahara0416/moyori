import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import Component from '@/components/Card/CardFrameContentImage.vue'

const localVue = createLocalVue()
localVue.use(Vuetify)

let wrapper
let propsData
let vuetify

describe('props', () => {
  beforeEach(() => {
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
  })

  it('spot', () => {
    expect(wrapper.props().spot).toStrictEqual(propsData.spot)
    expect(wrapper.props().spot instanceof Object).toBe(true)
  })
})

describe('computed', () => {
  it('image, spot.data.image is true', () => {
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
    expect(wrapper.vm.image).toEqual(propsData.spot.data.image)
  })

  it('image/spot.data.image is false', () => {
    propsData = {
      spot: {
        data: { id: 1, name: 'test', image: '' },
        comments: [{ image: 'test' }]
      }
    }

    vuetify = new Vuetify()

    wrapper = shallowMount(Component, {
      localVue,
      propsData,
      vuetify
    })
    expect(wrapper.vm.image).toEqual(propsData.spot.comments[0].image)
  })

  it('image/spot.data.image & filterImages.length is false', () => {
    propsData = {
      spot: {
        data: { id: 1, name: 'test', image: '' },
        comments: []
      }
    }

    vuetify = new Vuetify()

    wrapper = shallowMount(Component, {
      localVue,
      propsData,
      vuetify
    })
    expect(wrapper.vm.image).toEqual(require('@/assets/noimage.png'))
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
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
