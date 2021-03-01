import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import { Spot } from '@/class/Spot.js'
import Component from '@/components/Card/CardFrameContent.vue'
import CardFrameContentImage from '@/components/Card/CardFrameContentImage.vue'
import CardFrameContentTitle from '@/components/Card/CardFrameContentTitle.vue'
import CardFrameContentAction from '@/components/Card/CardFrameContentAction.vue'

const localVue = createLocalVue()
localVue.use(Vuetify)

let wrapper
let propsData
let vuetify

beforeEach(() => {
  propsData = {
    spot: new Spot({ data: { id: 1 } })
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

describe('template', () => {
  it('CardFrameContentImage has :spot', () => {
    expect(wrapper.find(CardFrameContentImage).props().spot).toMatchObject(
      wrapper.vm.$props.spot
    )
  })

  it('CardFrameContentTitle has :spot', () => {
    expect(wrapper.find(CardFrameContentTitle).props().spot).toMatchObject(
      wrapper.vm.$props.spot
    )
  })

  it('CardFrameContentAction has :spot', () => {
    expect(wrapper.find(CardFrameContentAction).props().spot).toMatchObject(
      wrapper.vm.$props.spot
    )
  })

  it('v-col cardImgPadding_small, cardContentPadding_small}', async () => {
    Object.assign(window, { innerWidth: 959 })

    wrapper = mount(Component, {
      localVue,
      propsData,
      vuetify,
      stubs: [
        'card-frame-content-image',
        'card-frame-content-title',
        'card-frame-content-action'
      ]
    })

    expect(wrapper.find('.col-5').classes()).toContain('cardImgPadding_small')
    expect(wrapper.find('.col-7').classes()).toContain(
      'cardContentPadding_small'
    )

    Object.assign(window, { innerWidth: 1024 })
  })

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
