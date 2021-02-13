import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import { Spot } from '@/class/Spot.js'
import Component from '@/components/Buttons/WifiWithButton.vue'
import Counter from '@/components/Buttons/Counter.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let propsData
let options
let data

let store
let auth
let form
let map

beforeEach(() => {
  options = {
    data: { id: 1 },
    wifi_withs: [
      { id: 1, user_id: 1 },
      { id: 2, user_id: 2 }
    ],
    wifi_withouts: [
      { id: 3, user_id: 1 },
      { id: 4, user_id: 2 }
    ]
  }

  data = new Spot(options)

  propsData = {
    spot: data
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

  store = new Vuex.Store({
    modules: {
      auth,
      form,
      map
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
    expect(wrapper.vm.$props.spot instanceof Spot).toBeTruthy()
    expect(wrapper.vm.$options.props.spot.required).toBe(true)
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
})

describe('computed', () => {
  it('isWifiWithing is true', () => {
    expect(wrapper.vm.isWifiWithing).toBeTruthy()
  })

  it('isWifiWithing is false', () => {
    options = {
      data: { id: 1 },
      wifi_withs: [
        { id: 1, user_id: 2 },
        { id: 2, user_id: 2 }
      ],
      wifi_withouts: [
        { id: 3, user_id: 1 },
        { id: 4, user_id: 2 }
      ]
    }

    data = new Spot(options)

    propsData = {
      spot: data
    }

    wrapper = shallowMount(Component, {
      localVue,
      propsData,
      store
    })
    expect(wrapper.vm.isWifiWithing).toBeFalsy()
  })

  it('isWifiWithouting is true', () => {
    expect(wrapper.vm.isWifiWithouting).toBeTruthy()
  })

  it('isWifiWithouting is false', () => {
    options = {
      data: { id: 1 },
      wifi_withs: [
        { id: 1, user_id: 1 },
        { id: 2, user_id: 2 }
      ],
      wifi_withouts: [
        { id: 3, user_id: 2 },
        { id: 4, user_id: 2 }
      ]
    }

    data = new Spot(options)

    propsData = {
      spot: data
    }

    wrapper = shallowMount(Component, {
      localVue,
      propsData,
      store
    })
    expect(wrapper.vm.isWifiWithouting).toBeFalsy()
  })

  it('yourWifiWith', () => {
    expect(wrapper.vm.yourWifiWith).toMatchObject([options.wifi_withs[0]])
  })

  it('yourWifiWithout', () => {
    expect(wrapper.vm.yourWifiWithout).toMatchObject([options.wifi_withouts[0]])
  })
})

describe('v-on', () => {
  it('click wifiWithHandler', () => {
    const wifiWithHandler = jest.fn()

    wrapper = mount(Component, {
      localVue,
      propsData,
      store,
      methods: {
        wifiWithHandler
      }
    })

    wrapper.find('.v-btn').trigger('click')
    expect(wifiWithHandler).toHaveBeenCalled()
  })

  it('mouseover mouseover', () => {
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

  it('mouseleave mouseleave', () => {
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
    expect(wrapper.vm.color).toEqual('success')
  })

  it('mouseleave', () => {
    wrapper.vm.mouseleave()
    expect(wrapper.vm.color).toEqual(null)
  })
})

describe('template', () => {
  it('v-if="isWifiWithing"', () => {
    expect(wrapper.find('v-icon-stub').text()).toEqual('mdi-wifi')
  })

  it('v-else', () => {
    options = {
      data: { id: 1 },
      wifi_withs: [
        { id: 1, user_id: 2 },
        { id: 2, user_id: 2 }
      ],
      wifi_withouts: [
        { id: 3, user_id: 1 },
        { id: 4, user_id: 2 }
      ]
    }

    data = new Spot(options)

    propsData = {
      spot: data
    }

    wrapper = shallowMount(Component, {
      localVue,
      propsData,
      store
    })

    expect(wrapper.find('v-icon-stub').text()).toEqual('mdi-wifi')
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
