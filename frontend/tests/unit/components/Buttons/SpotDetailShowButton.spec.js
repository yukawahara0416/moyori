import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import { Spot } from '@/class/Spot.js'
import Component from '@/components/Buttons/SpotDetailShowButton.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(Vuetify)

let wrapper
let propsData
let options
let data

let store
let map
let vuetify

beforeEach(() => {
  options = {
    data: { id: 1, place_id: 'aaaaaaaaaaa' }
  }

  data = new Spot(options)

  propsData = {
    spot: data
  }

  map = {
    getters: {
      map: () => {
        return {
          data: 'test'
        }
      }
    }
  }

  store = new Vuex.Store({
    modules: {
      map
    }
  })

  vuetify = new Vuetify()

  wrapper = shallowMount(Component, {
    localVue,
    propsData,
    store,
    vuetify
  })
})

describe('props', () => {
  it('spot', () => {
    expect(wrapper.props().spot).toStrictEqual(propsData.spot)
    expect(wrapper.props().spot instanceof Object).toBe(true)
  })
})

describe('getters', () => {
  it('map', () => {
    expect(wrapper.vm.map).toMatchObject(store.getters.map)
  })
})

describe('v-on', () => {
  it('placeDetail, openDialog', () => {
    const placeDetail = jest.fn()
    const openDialog = jest.fn()

    options = {
      data: { id: 1, place_id: 'aaaaaaaaaaa' }
    }

    data = new Spot(options)

    propsData = {
      spot: data
    }

    wrapper = mount(Component, {
      localVue,
      vuetify,
      propsData,
      methods: {
        placeDetail,
        openDialog
      },
      stubs: ['v-dialog', 'spot-detail']
    })

    wrapper.find('.v-btn').trigger('click')
    expect(placeDetail).toHaveBeenCalled()
    expect(openDialog).toHaveBeenCalled()
  })
})

describe('methods', () => {
  it('openDialog', () => {
    wrapper.vm.openDialog()
    expect(wrapper.vm.dialog).toBe(true)
  })

  it('closeDialog', () => {
    wrapper.vm.dialog = true
    wrapper.vm.closeDialog()
    expect(wrapper.vm.dialog).toBe(false)
  })
})

describe('emit', () => {
  it('closeDialog', () => {
    wrapper.vm.$emit('closeDialog')
    expect(wrapper.emitted().closeDialog).toBeTruthy()
  })
})

describe('template', () => {
  it('spot-detail has :spot', () => {
    expect(wrapper.find('spot-detail-stub').attributes().spot).toEqual(
      '[object Object]'
    )
  })

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
