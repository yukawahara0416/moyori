import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/components/Spot/SpotFormContainerForms.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper

let post
let store

beforeEach(() => {
  post = {
    namespaced: true,
    getters: {
      spotFormData: () => ({
        address: 'address',
        name: 'name',
        image: 'image',
        place_id: 'place_id',
        lat: '36.204824',
        lng: '138.252923',
        url: 'url'
      })
    },
    actions: {
      postSpot: jest.fn()
    }
  }

  store = new Vuex.Store({
    modules: {
      post
    }
  })

  wrapper = mount(Component, {
    localVue,
    store
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('getters', () => {
  it('post/spotFormData', () => {
    expect(wrapper.vm.spotFormData).toEqual(post.getters.spotFormData())
  })
})

describe('v-on', () => {
  it('postSpot', () => {
    const event = jest.fn()
    wrapper.setMethods({ postSpot: event })
    wrapper.find('.v-btn').trigger('click')
    expect(event).toHaveBeenCalledTimes(1)
  })
})

describe('actions', () => {
  it('post/postSpot', () => {
    wrapper.vm.postSpot()
    expect(post.actions.postSpot).toHaveBeenCalled()
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
