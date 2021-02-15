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
    expect(wrapper.vm.$props.spot).toStrictEqual(propsData.spot)
    expect(wrapper.vm.$props.spot instanceof Object).toBeTruthy()
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

    expect(wrapper.vm.isOwnPosted).toBeFalsy()
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

    expect(wrapper.vm.$props.spot.data.place_id.length >= 11).toBeTruthy()
    expect(wrapper.vm.isOwnPosted).toBeFalsy()
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

    expect(wrapper.vm.isOwnPosted).toBeFalsy()
    expect(wrapper.vm.$el).toMatchSnapshot()
  })

  it('isOwnPosted is true with return spotOwner === currentUser', () => {
    expect(wrapper.vm.isOwnPosted).toBeTruthy()
  })
})

describe('template', () => {
  it('spot-detail-info-panel-address has :spot', () => {
    expect(
      wrapper.find('spot-detail-info-panel-address-stub').attributes().spot
    ).toEqual('[object Object]')
  })

  it('spot-detail-info-panel-phone has :spot', () => {
    expect(
      wrapper.find('spot-detail-info-panel-phone-stub').attributes().spot
    ).toEqual('[object Object]')
  })

  it('spot-detail-info-panel-website has :spot', () => {
    expect(
      wrapper.find('spot-detail-info-panel-website-stub').attributes().spot
    ).toEqual('[object Object]')
  })

  it('spot-detail-info-panel-business has :spot', () => {
    expect(
      wrapper.find('spot-detail-info-panel-business-stub').attributes().spot
    ).toEqual('[object Object]')
  })

  it('spot-edit-dialog has :spot', () => {
    expect(wrapper.find('spot-edit-dialog-stub').attributes().spot).toEqual(
      '[object Object]'
    )
  })

  it('v-if="isOwnPosted" is true', () => {
    expect(wrapper.find('v-card-actions-stub').exists()).toBeTruthy()
  })

  it('v-if="isOwnPosted" is false', () => {
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

    expect(wrapper.find('v-card-actions-stub').exists()).toBeFalsy()
    expect(wrapper.vm.$el).toMatchSnapshot()
  })

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
