import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import { Spot } from '@/class/Spot.js'
import Component from '@/components/Buttons/WifiWithoutButton.vue'
import Counter from '@/components/Buttons/Counter.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)

let wrapper
let propsData

let store
let auth
let spot
let vote
let form
let map
let tab
let dialog
let snackbar

let router

const hasWith = {
  data: { id: 1, place_id: '1234567890test' },
  wifi_withs: [
    { id: 1, user_id: 1 },
    { id: 2, user_id: 2 }
  ]
}

const notHasWith = {
  data: { id: 1, place_id: '1234567890test' },
  wifi_withs: [
    // { id: 1, user_id: 1 },
    { id: 2, user_id: 2 }
  ]
}

const hasWithout = {
  data: { id: 1, place_id: '1234567890test' },
  wifi_withouts: [
    { id: 1, user_id: 1 },
    { id: 2, user_id: 2 }
  ]
}

const notHasWithout = {
  data: { id: 1, place_id: '1234567890test' },
  wifi_withouts: [
    // { id: 1, user_id: 1 },
    { id: 2, user_id: 2 }
  ]
}

const beforePost = {
  data: { id: null, place_id: '1234567890test' }
}

beforeEach(() => {
  propsData = {
    spot: new Spot(hasWith)
  }

  auth = {
    getters: {
      headers: () => {
        return {
          data: { id: 1 }
        }
      },
      currentUser: () => {
        return {
          data: { id: 1 }
        }
      },
      isLoggingIn: () => true
    }
  }

  spot = {
    mutations: {
      updateSpot: jest.fn()
    }
  }

  vote = {
    actions: {
      vote: jest.fn(),
      unVote: jest.fn()
    }
  }

  form = {
    getters: {
      spotForm: () => {
        return {
          place_id: ''
        }
      }
    }
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

  tab = {
    mutations: {
      changeSignTab: jest.fn()
    }
  }
  store = new Vuex.Store({
    modules: {
      auth,
      spot,
      vote,
      form,
      map,
      tab,
    }
  })

  wrapper = shallowMount(Component, {
    localVue,
    propsData,
    store
  })
})

describe('getters', () => {
  it('spotForm', () => {
    expect(wrapper.vm.spotForm).toBe(store.getters.spotForm)
  })

  it('map', () => {
    expect(wrapper.vm.map).toMatchObject(store.getters.map)
  })

  it('headers', () => {
    expect(wrapper.vm.headers).toMatchObject(store.getters.headers)
  })

  it('currentUser', () => {
    expect(wrapper.vm.currentUser).toMatchObject(store.getters.currentUser)
  })

  it('isLoggingIn', () => {
    expect(wrapper.vm.isLoggingIn).toBe(store.getters.isLoggingIn)
  })

  it('profileTab', () => {
    expect(wrapper.vm.profileTab).toEqual(store.getters.profileTab)
  })
})

describe('computed', () => {
  it('isWifiWithing is true', () => {
    expect(wrapper.vm.isWifiWithing).toBeTruthy()
  })

  it('isWifiWithing is false', () => {
    wrapper.setProps({ spot: new Spot(notHasWith) })
    expect(wrapper.vm.isWifiWithing).toBeFalsy()
  })

  it('isWifiWithouting is true', () => {
    wrapper.setProps({ spot: new Spot(hasWithout) })
    expect(wrapper.vm.isWifiWithouting).toBeTruthy()
  })

  it('isWifiWithouting is false', () => {
    wrapper.setProps({ spot: new Spot(notHasWithout) })
    expect(wrapper.vm.isWifiWithouting).toBeFalsy()
  })

  it('yourWifiWith', () => {
    expect(wrapper.vm.yourWifiWith).toMatchObject([hasWith.wifi_withs[0]])
  })

  it('yourWifiWithout', () => {
    wrapper.setProps({ spot: new Spot(hasWithout) })
    expect(wrapper.vm.yourWifiWithout).toMatchObject([
      hasWithout.wifi_withouts[0]
    ])
  })
})

describe('v-on', () => {
  it('click wifiWithoutHandler', () => {
    const wifiWithoutHandler = jest.fn()

    wrapper = mount(Component, {
      localVue,
      propsData,
      store,
      methods: {
        wifiWithoutHandler
      }
    })

    wrapper.find('.v-btn').trigger('click')
    expect(wifiWithoutHandler).toHaveBeenCalled()
  })

  it('mouseover', () => {
    const mouseover = jest.fn()

    wrapper = mount(Component, {
      localVue,
      propsData,
      store,
      methods: {
        mouseover
      }
    })

    wrapper.find('.v-btn').trigger('mouseover')
    expect(mouseover).toHaveBeenCalled()
  })

  it('mouseleave', () => {
    const mouseleave = jest.fn()

    wrapper = mount(Component, {
      localVue,
      propsData,
      store,
      methods: {
        mouseleave
      }
    })

    wrapper.find('.v-btn').trigger('mouseleave')
    expect(mouseleave).toHaveBeenCalled()
  })
})

describe('methods', () => {
  it('mouseover', () => {
    wrapper.vm.mouseover()
    expect(wrapper.vm.color).toEqual('error')
  })

  it('mouseleave', () => {
    wrapper.vm.mouseleave()
    expect(wrapper.vm.color).toEqual(null)
  })
})

describe('template', () => {
  it('v-if="isWifiWithing"', () => {
    expect(wrapper.find('v-icon-stub').text()).toEqual('mdi-wifi-off')
  })

  it('v-else', () => {
    wrapper.setProps({ spot: new Spot(notHasWithout) })

    expect(wrapper.find('v-icon-stub').text()).toEqual('mdi-wifi-off')
    expect(wrapper.vm.$el).toMatchSnapshot()
  })

  it('counter has :spot', () => {
    expect(wrapper.find('counter-stub').attributes().spot).toEqual(
      '[object Object]'
    )
  })

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
