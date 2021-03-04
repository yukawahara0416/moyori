import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
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

const hasPhotoUrl = {
  data: { id: 1, photo_url: 'photo_url' },
  comments: []
}

const hasPhotoReference = {
  data: { id: 1, photo_url: null, photo_reference: 'photo_reference' },
  comments: []
}

const hasPicture = {
  data: {
    id: 1,
    photo_url: null,
    photo_reference: null,
    picture: 'picture'
  },
  comments: []
}

const hasComments = {
  data: {
    id: 1,
    photo_url: null,
    photo_reference: null,
    picture: null
  },
  comments: [{ image: 'image1' }, { image: 'image2' }]
}

const notHasPhoto = {
  data: {
    id: 1,
    photo_url: null,
    photo_reference: null,
    picture: null
  },
  comments: []
}

beforeEach(() => {
  propsData = {
    spot: new Spot(hasPhotoUrl)
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
  it('photo: spot has photo_url', () => {
    const spot = new Spot(hasPhotoUrl)

    wrapper.setProps({ spot })
    expect(wrapper.vm.photo).toEqual(spot.data.photo_url)
  })

  it('photo: spot has photo_reference', () => {
    const spot = new Spot(hasPhotoReference)

    wrapper.setProps({ spot })
    expect(wrapper.vm.photo).toMatch(
      'https://maps.googleapis.com/maps/api/place/photo?maxwidth=320&photoreference=photo_reference&key=undefined'
    )
  })

  it('photo: spot has picture', () => {
    const spot = new Spot(hasPicture)

    wrapper.setProps({ spot })
    expect(wrapper.vm.photo).toEqual(spot.data.picture)
  })

  it('photo: spot has comments', () => {
    const spot = new Spot(hasComments)

    wrapper.setProps({ spot })
    expect(wrapper.vm.photo).toEqual(spot.comments[0].image)
  })

  it('photo: spot has not photo', () => {
    const spot = new Spot(notHasPhoto)

    wrapper.setProps({ spot })
    expect(wrapper.vm.photo).toEqual(require('@/assets/noimage.png'))
  })

  it('filterImages', () => {
    const spot = new Spot(hasComments)

    wrapper.setProps({ spot })
    expect(wrapper.vm.filterImages).toMatchObject(spot.comments)
    expect(wrapper.vm.filterImages.length).toEqual(2)
  })
})

describe('template', () => {
  it('v-img has :src="photo"', () => {
    expect(wrapper.find('v-img-stub').attributes().src).toEqual(
      wrapper.vm.photo
    )
  })

  it('LikeButton has :spot', () => {
    expect(wrapper.find(LikeButton).props().spot).toMatchObject(
      wrapper.vm.$props.spot
    )
  })

  it('CommentButton has :spot', () => {
    expect(wrapper.find(CommentButton).props().spot).toMatchObject(
      wrapper.vm.$props.spot
    )
  })

  it('v-img has imgHeight_big', () => {
    wrapper = mount(Component, {
      localVue,
      propsData,
      vuetify,
      stubs: ['like-button', 'comment-button']
    })

    expect(wrapper.vm.$vuetify.breakpoint.mdAndUp).toBeTruthy()
    expect(wrapper.vm.$vuetify.breakpoint.smAndDown).toBeFalsy()
    expect(wrapper.find('.v-image').classes()).toContain('imgHeight_big')
  })

  it('v-img has imgHeight_small', () => {
    const smAndDown = wrapper.vm.$vuetify.breakpoint.thresholds.sm - 1
    Object.assign(window, { innerWidth: smAndDown })

    wrapper = mount(Component, {
      localVue,
      propsData,
      vuetify,
      stubs: ['like-button', 'comment-button']
    })

    expect(wrapper.vm.$vuetify.breakpoint.mdAndUp).toBeFalsy()
    expect(wrapper.vm.$vuetify.breakpoint.smAndDown).toBeTruthy()
    expect(wrapper.find('.v-image').classes()).toContain('imgHeight_small')

    Object.assign(window, { innerWidth: 1024 })
  })

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
