import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import { Spot } from '@/class/Spot.js'
import Component from '@/components/Spot/SpotDetail.vue'
import SpotDetailTitle from '@/components/Spot/SpotDetailTitle.vue'
import SpotDetailImageSlide from '@/components/Spot/SpotDetailImageSlide.vue'
import SpotDetailInfoPanel from '@/components/Spot/SpotDetailInfoPanel.vue'
import SpotDetailWifiPanel from '@/components/Spot/SpotDetailWifiPanel.vue'
import SpotDetailPowerPanel from '@/components/Spot/SpotDetailPowerPanel.vue'
import SpotDetailCommentPanel from '@/components/Spot/SpotDetailCommentPanel.vue'

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

describe('computed', () => {
  it('cols return 12', () => {
    const xsOnly = wrapper.vm.$vuetify.breakpoint.thresholds.xs - 1
    Object.assign(window, { innerWidth: xsOnly })

    wrapper = shallowMount(Component, {
      localVue,
      propsData,
      vuetify
    })

    expect(wrapper.vm.$vuetify.breakpoint.xsOnly).toBeTruthy()
    expect(wrapper.vm.cols).toEqual(12)

    Object.assign(window, { innerWidth: 1024 })
  })

  it('cols return 6', () => {
    expect(wrapper.vm.cols).toEqual(6)
  })
})

describe('emit', () => {
  it('closeDialog', () => {
    wrapper.vm.closeDialog()
    expect(wrapper.emitted('closeDialog')).toBeTruthy()
  })
})

describe('template', () => {
  it('SpotDetailTitle has :spot', () => {
    expect(wrapper.find(SpotDetailTitle).props().spot).toMatchObject(
      wrapper.vm.$props.spot
    )
  })

  it('SpotDetailImageSlide has :spot', () => {
    expect(wrapper.find(SpotDetailImageSlide).props().spot).toMatchObject(
      wrapper.vm.$props.spot
    )
  })

  it('SpotDetailWifiPanel has :spot', () => {
    expect(wrapper.find(SpotDetailWifiPanel).props().spot).toMatchObject(
      wrapper.vm.$props.spot
    )
  })

  it('SpotDetailPowerPanel has :spot', () => {
    expect(wrapper.find(SpotDetailPowerPanel).props().spot).toMatchObject(
      wrapper.vm.$props.spot
    )
  })

  it('SpotDetailCommentPanel has :spot', () => {
    expect(wrapper.find(SpotDetailCommentPanel).props().spot).toMatchObject(
      wrapper.vm.$props.spot
    )
  })

  it('SpotDetailInfoPanel has :spot', () => {
    expect(wrapper.find(SpotDetailInfoPanel).props().spot).toMatchObject(
      wrapper.vm.$props.spot
    )
  })

  it('v-col has :cols', () => {
    expect(
      wrapper
        .findAll('v-col-stub')
        .at(0)
        .attributes().cols
    ).toEqual(wrapper.vm.cols.toString())
    expect(
      wrapper
        .findAll('v-col-stub')
        .at(1)
        .attributes().cols
    ).toEqual(wrapper.vm.cols.toString())
  })

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
