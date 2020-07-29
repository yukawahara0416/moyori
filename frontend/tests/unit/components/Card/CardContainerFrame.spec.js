import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/components/Card/CardContainerFrame.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let propsData
let spot
let user
let store

beforeEach(() => {
  propsData = {
    spot: { marker: { name: 'test' }, data: { id: 1 } },
    id: 1,
    type: 'map'
  }

  spot = {
    namespaced: true,
    actions: {
      spotlight: jest.fn()
    }
  }

  user = {
    namespaced: true,
    actions: {
      spotlight: jest.fn()
    }
  }

  store = new Vuex.Store({
    modules: {
      spot,
      user
    }
  })

  wrapper = mount(Component, {
    localVue,
    propsData,
    store,
    stubs: ['card-container-frame-content']
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('props', () => {
  it('spot', () => {
    expect(wrapper.props().spot).toStrictEqual(propsData.spot)
    expect(wrapper.props().spot instanceof Object).toBe(true)
  })
  it('id', () => {
    expect(wrapper.props().id).toStrictEqual(propsData.id)
    expect(typeof wrapper.vm.$props.id).toBe('number')
  })
  it('type', () => {
    expect(wrapper.props().type).toStrictEqual(propsData.type)
    expect(typeof wrapper.vm.$props.type).toBe('string')
  })
})

describe('v-on', () => {
  it('spotlight, panTo', () => {
    const event1 = jest.fn()
    const event2 = jest.fn()
    wrapper.setMethods({ spotlight: event1, panTo: event2 })
    wrapper.find('.v-card').trigger('click')
    expect(event1).toHaveBeenCalledTimes(1)
    expect(event2).toHaveBeenCalledTimes(1)
  })
})

describe('actions', () => {
  it('spot/spotlight', () => {
    wrapper.vm.spotlight()
    expect(spot.actions.spotlight).toHaveBeenCalled()
  })
  it('user/spotlight', () => {
    wrapper.setProps({ type: 'user' })
    wrapper.vm.spotlight()
    expect(user.actions.spotlight).toHaveBeenCalled()
  })
})

// describe('emit', () => {
//   it('panTo', () => {
//     wrapper.vm.$root.$emit('panTo')
//     const rootWrapper = createWrapper(wrapper.vm.$root)
//     expect(wrapper.emitted('panTo')).toBeTruthy()
//   })
// })

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
