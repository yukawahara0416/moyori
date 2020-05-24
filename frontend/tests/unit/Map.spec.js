import Vuetify from 'vuetify'
import { mount } from '@vue/test-utils'
import Component from '@/components/Map.vue'

const vuetify = new Vuetify()
const sel = id => `[data-test="${id}"]`

let wrapper

beforeEach(() => {
  wrapper = mount(Component, {
    vuetify,
    stubs: ['GmapMap']
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('v-on', () => {
  it('clickでmoveToCurrentLocationメソッドが実行されること', () => {
    const stub = jest.fn()
    const button = wrapper.find(sel('btn1'))
    wrapper.setMethods({
      moveToCurrentLocation: stub
    })
    button.trigger('click')
    expect(stub).toHaveBeenCalledTimes(1)
  })

  it('clickでsetNearbyMarkersメソッドが実行されること', () => {
    const stub = jest.fn()
    const button = wrapper.find(sel('btn2'))
    wrapper.setMethods({
      setNearbyMarkers: stub
    })
    button.trigger('click')
    expect(stub).toHaveBeenCalledTimes(1)
  })
})
