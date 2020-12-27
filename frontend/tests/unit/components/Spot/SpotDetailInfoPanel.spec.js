import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/components/Spot/SpotDetailInfoPanel.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let propsData
let store
let auth

beforeEach(() => {
  propsData = {
    spot: {
      data: { id: 1, place_id: 'aaaaaaaaaa', user_id: 1 }
    }
  }

  auth = {
    getters: {
      currentUser: () => {
        return { data: { id: 1 } }
      },
      isLoggingIn: () => true
    }
  }

  store = new Vuex.Store({
    modules: {
      auth
    }
  })

  wrapper = shallowMount(Component, {
    localVue,
    propsData,
    store
  })
})

describe('props', () => {
  it('spot', () => {
    expect(wrapper.props().spot).toStrictEqual(propsData.spot)
    expect(wrapper.props().spot instanceof Object).toBe(true)
  })
})

describe('getters', () => {
  it('currentUser', () => {
    expect(wrapper.vm.currentUser).toMatchObject(store.getters.currentUser)
  })

  it('isLoggingIn', () => {
    expect(wrapper.vm.isLoggingIn).toBe(store.getters.isLoggingIn)
  })
})

describe('computed', () => {
  it('isOwnPosted is false with isLoggingIn is false', () => {
    auth = {
      getters: {
        currentUser: () => {
          return { data: { id: 1 } }
        },
        isLoggingIn: () => false
      }
    }

    store = new Vuex.Store({
      modules: {
        auth
      }
    })

    wrapper = shallowMount(Component, {
      localVue,
      propsData,
      store
    })

    expect(wrapper.vm.isOwnPosted).toBe(false)
    expect(wrapper.vm.$el).toMatchSnapshot()
  })

  it('isOwnPosted is false with spot.data.place_id.length > 11', () => {
    propsData = {
      spot: {
        data: { id: 1, place_id: 'aaaaaaaaaaxx', user_id: 1 }
      }
    }

    wrapper = shallowMount(Component, {
      localVue,
      propsData,
      store
    })

    expect(wrapper.props().spot.data.place_id.length >= 11).toBe(true)
    expect(wrapper.vm.isOwnPosted).toBe(false)
    expect(wrapper.vm.$el).toMatchSnapshot()
  })

  it('isOwnPosted is false with return spotOwner === currentUser', () => {
    propsData = {
      spot: {
        data: { id: 1, place_id: 'aaaaaaaaaa', user_id: 2 }
      }
    }

    wrapper = shallowMount(Component, {
      localVue,
      propsData,
      store
    })

    expect(wrapper.vm.isOwnPosted).toBe(false)
    expect(wrapper.vm.$el).toMatchSnapshot()
  })

  it('isOwnPosted is true with return spotOwner === currentUser', () => {
    expect(wrapper.vm.isOwnPosted).toBe(true)
  })
})

describe('template', () => {
  it('spot-detail-info-panel-address has :spot', () => {
    expect(
      wrapper.find('spot-detail-info-panel-address-stub').attributes().spot
    ).toEqual('[object Object]')
  })

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
