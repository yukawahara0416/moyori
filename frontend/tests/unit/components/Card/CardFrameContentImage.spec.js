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
  })

  it('spot', () => {
    expect(wrapper.vm.$props.spot).toStrictEqual(propsData.spot)
    expect(wrapper.vm.$props.spot instanceof Object).toBeTruthy()
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
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
