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

it('buttonがある', () => {
  const stub = jest.fn()
  const button = wrapper.find(sel('hoge'))
  wrapper.setMethods({
    setNearbyMarkers: stub
  })
  button.trigger('click')
  expect(stub).toHaveBeenCalledTimes(1)
})
