import { shallowMount, createLocalVue } from '@vue/test-utils'
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
  })
})

describe('template', () => {
  it('CardFrameContentImage has :spot', () => {
    expect(wrapper.find(CardFrameContentImage).props().spot).toMatchObject(
      propsData.spot
    )
  })

  it('CardFrameContentTitle has :spot', () => {
    expect(wrapper.find(CardFrameContentTitle).props().spot).toMatchObject(
      propsData.spot
    )
  })

  it('CardFrameContentAction has :spot', () => {
    expect(wrapper.find(CardFrameContentAction).props().spot).toMatchObject(
      propsData.spot
    )
  })

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
