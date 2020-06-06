import { mount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import GoogleMapsTextSearch from '@/basics/GoogleMapsTextSearch.vue'

const localVue = createLocalVue()
localVue.use(Vuetify)

let wrapper
let vuetify

beforeEach(() => {
  vuetify = new Vuetify()

  wrapper = mount(GoogleMapsTextSearch, {
    localVue,
    vuetify
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('v-on', () => {
  it('textSearch', () => {
    const event = jest.fn()
    wrapper.setMethods({ textSearch: event })
    wrapper.findAll('[data-test="textsearch"]').trigger('keydown.enter')
    expect(event).toHaveBeenCalledTimes(1)
  })
})

describe('emit', () => {
  it('text-search', () => {
    wrapper.vm.textSearch()
    expect(wrapper.emitted('text-search')).toBeTruthy()
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
