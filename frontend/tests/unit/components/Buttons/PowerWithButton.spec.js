import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { Spot } from '@/class/Spot.js'
import Component from '@/components/Buttons/PowerWithButton.vue'

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
let tab

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
      form: () => {
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
    getters: {
      profileTab: () => 'posts'
    }
  }

  store = new Vuex.Store({
    modules: {
      auth,
      form,
      map,
      tab
    }
  })

  wrapper = shallowMount(Component, {
    localVue,
    propsData,
    store
  })
})

describe('getters', () => {
  it('form', () => {
    expect(wrapper.vm.form).toBe(store.getters.form)
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

describe('comnputed', () => {
  it('isPowerWithing is true', () => {
    expect(wrapper.vm.isPowerWithing).toBe(true)
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

    data = new Spot(options)

    propsData = {
      spot: data
    }

    wrapper = shallowMount(Component, {
      localVue,
      propsData,
      store
    })
    expect(wrapper.vm.isPowerWithing).toBe(false)
  })

  it('isPowerWithouting is true', () => {
    expect(wrapper.vm.isPowerWithouting).toBe(true)
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

    data = new Spot(options)

    propsData = {
      spot: data
    }

    wrapper = shallowMount(Component, {
      localVue,
      propsData,
      store
    })
    expect(wrapper.vm.isPowerWithouting).toBe(false)
  })

  it('yourPowerWith', () => {
    expect(wrapper.vm.yourPowerWith).toMatchObject([options.power_withs[0]])
  })

