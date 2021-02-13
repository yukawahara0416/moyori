import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { Spot } from '@/class/Spot.js'
import Component from '@/components/Buttons/PowerWithoutButton.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let propsData
let options

let store
let auth
let form
let map

beforeEach(() => {
  options = {
    data: { id: 1 },
    power_withs: [
      { id: 1, user_id: 1 },
      { id: 2, user_id: 2 }
    ],
    power_withouts: [
      { id: 3, user_id: 1 },
      { id: 4, user_id: 2 }
    ]
  }

  propsData = {
    spot: new Spot(options)
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

describe('comnputed', () => {
  it('isPowerWithing is true', () => {
    expect(wrapper.vm.isPowerWithing).toBeTruthy()
  })

  it('isPowerWithing is false', () => {
    options = {
      data: { id: 1 },
      power_withs: [
        { id: 1, user_id: 2 },
        { id: 2, user_id: 2 }
      ],
      power_withouts: [
        { id: 3, user_id: 1 },
        { id: 4, user_id: 2 }
      ]
    }

    propsData = {
      spot: new Spot(options)
    }

    wrapper = shallowMount(Component, {
      localVue,
      propsData,
      store
    })
    expect(wrapper.vm.isPowerWithing).toBeFalsy()
  })

  it('isPowerWithouting is true', () => {
    expect(wrapper.vm.isPowerWithouting).toBeTruthy()
  })

  it('isPowerWithouting is false', () => {
    options = {
      data: { id: 1 },
      power_withs: [
        { id: 1, user_id: 1 },
        { id: 2, user_id: 2 }
      ],
      power_withouts: [
        { id: 3, user_id: 2 },
        { id: 4, user_id: 2 }
      ]
    }

    propsData = {
      spot: new Spot(options)
    }

    wrapper = shallowMount(Component, {
      localVue,
      propsData,
      store
    })
    expect(wrapper.vm.isPowerWithouting).toBeFalsy()
  })

  it('yourPowerWith', () => {
    expect(wrapper.vm.yourPowerWith).toMatchObject([options.power_withs[0]])
  })

  it('yourPowerWithout', () => {
    expect(wrapper.vm.yourPowerWithout).toMatchObject([
      options.power_withouts[0]
    ])
  })
})

describe('v-on', () => {
  it('click powerWithoutHandler', () => {
    const powerWithoutHandler = jest.fn()

    wrapper = mount(Component, {
      localVue,
      propsData,
      store,
      methods: {
        powerWithoutHandler
      }
    })

    wrapper.find('.v-btn').trigger('click')
    expect(powerWithoutHandler).toHaveBeenCalled()
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
    expect(wrapper.vm.color).toEqual('error')
  })

  it('mouseleave', () => {
    wrapper.vm.mouseleave()
    expect(wrapper.vm.color).toEqual(null)
  })
})

describe('template', () => {
  it('v-if="isPowerWithing"', () => {
    expect(wrapper.find('v-icon-stub').text()).toEqual('mdi-power-plug-off')
  })

  it('v-else', () => {
    options = {
      data: { id: 1 },
      power_withs: [
        { id: 1, user_id: 2 },
        { id: 2, user_id: 2 }
      ],
      power_withouts: [
        { id: 3, user_id: 1 },
        { id: 4, user_id: 2 }
      ]
    }

    propsData = {
      spot: new Spot(options)
    }

    wrapper = shallowMount(Component, {
      localVue,
      propsData,
      store
    })

    expect(wrapper.find('v-icon-stub').text()).toEqual('mdi-power-plug-off')
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
