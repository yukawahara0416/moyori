import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import { Spot } from '@/class/Spot.js'
import Component from '@/components/Comment/CommentPostDialogForm.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(Vuetify)
localVue.component('ValidationObserver', ValidationObserver)
localVue.component('ValidationProvider', ValidationProvider)

const { required } = require('vee-validate/dist/rules.umd')
extend('required', required)

let wrapper
let propsData
let options

let store
let auth
let spot
let vote
let form
let map
let tab
let dialog


const beforePost = {
  data: { id: null, place_id: '1234567890test' }
}

const hasWith = {
  data: { id: 1 },
  wifi_withs: [{ id: 1, user_id: 1 }],
  wifi_withouts: [],
  power_withs: [{ id: 1, user_id: 1 }],
  power_withouts: []
}

const hasWithout = {
  data: { id: 1 },
  wifi_withs: [],
  wifi_withouts: [{ id: 1, user_id: 1 }],
  power_withs: [],
  power_withouts: [{ id: 1, user_id: 1 }]
}

const notHasBoth = {
  data: { id: 1 },
  wifi_withs: [],
  wifi_withouts: [],
  power_withs: [],
  power_withouts: []
}

beforeEach(() => {
  propsData = {
    spot: new Spot(notHasBoth)
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
    namespaced: true,
    mutations: {
      updateSpot: jest.fn()
    }
  }

  vote = {
    actions: {
      vote: jest.fn(),
      unVote: jest.fn().mockResolvedValue(propsData.spot.data.id)
    }
  }

  form = {
    getters: {
      spotForm: () => {
        return {
          place_id: ''
        }
      }
    },
    mutations: {
      setSpotForm: jest.fn()
    }
  }

  map = {
    getters: {
      map: () => {
        return {
          data: 'map'
        }
      }
    }
  }

  tab = {
    getters: {
      profileTab: () => 'posts'
    },
    mutations: {
      changeSignTab: jest.fn()
    }
  }

  dialog = {
    mutations: {
      dialogOn: jest.fn()
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
      dialog,
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
    expect(wrapper.vm.$options.props.spot.required).toBeTruthy()
  })
})

describe('getters', () => {
  it('headers', () => {
    expect(wrapper.vm.headers).toMatchObject(store.getters.headers)
  })

  it('currentUser', () => {
    expect(wrapper.vm.currentUser).toMatchObject(store.getters.currentUser)
  })

  it('isLoggingIn', () => {
    expect(wrapper.vm.isLoggingIn).toBe(store.getters.isLoggingIn)
  })

  it('spotForm', () => {
    expect(wrapper.vm.spotForm).toMatchObject(store.getters.spotForm)
  })

  it('map', () => {
    expect(wrapper.vm.map).toMatchObject(store.getters.map)
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

    propsData = {
      spot: new Spot(options)
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

    propsData = {
      spot: new Spot(options)
    }

    wrapper = shallowMount(Component, {
      localVue,
      propsData,
      store
    })

    expect(wrapper.vm.isWifiWithouting).toBeFalsy()
  })

  it('yourWifiWith return vote', () => {
    expect(wrapper.vm.yourWifiWith).toMatchObject([options.wifi_withs[0]])
  })

  it('return []', () => {
    throw new Error('テスト未作成')
  })

  it('yourWifiWithout', () => {
    expect(wrapper.vm.yourWifiWithout).toMatchObject([options.wifi_withouts[0]])
  })

  it('return []', () => {
    throw new Error('テスト未作成')
  })

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

  it('return []', () => {
    throw new Error('テスト未作成')
  })

  it('yourPowerWithout', () => {
    expect(wrapper.vm.yourPowerWithout).toMatchObject([
      options.power_withouts[0]
    ])
  })

  it('return []', () => {
    throw new Error('テスト未作成')
  })
})

describe('methods', () => {
  it('commentHandler', () => {
    throw new Error('テスト未作成')
  })

  it('getNewSpot', () => {
    throw new Error('テスト未作成')
  })

  it('voteHandler', () => {
    throw new Error('テスト未作成')
  })

  it('wifiWithHandler', () => {
    throw new Error('テスト未作成')
  })

  it('wifiWithoutHandler', () => {
    throw new Error('テスト未作成')
  })

  it('powerWithHandler', () => {
    throw new Error('テスト未作成')
  })

  it('powerWithoutHandler', () => {
    throw new Error('テスト未作成')
  })

  it('onImagePicked', () => {
    throw new Error('テスト未作成')
  })

  it('closeDialog', () => {
    const clearForm = jest.fn()

    wrapper = shallowMount(Component, {
      localVue,
      propsData,
      store,
      methods: {
        clearForm
      }
    })

    wrapper.vm.closeDialog()
    wrapper.vm.$emit('closeDialog')
    expect(wrapper.emitted().closeDialog).toBeTruthy()
    expect(clearForm).toHaveBeenCalled()
  })

  it('clearForm', () => {
    wrapper.vm.content = 'update'
    wrapper.vm.image = 'update'
    wrapper.vm.uploadImageUrl = 'update'
    wrapper.vm.wifi_radio = 'update'
    wrapper.vm.power_radio = 'update'

    wrapper.vm.clearForm()
    expect(wrapper.vm.content).toEqual('')
    expect(wrapper.vm.image).toEqual(null)
    expect(wrapper.vm.uploadImageUrl).toEqual(null)
    expect(wrapper.vm.wifi_radio).toEqual('unknown')
    expect(wrapper.vm.power_radio).toEqual('unknown')
  })
})

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })

  it('snapshot mount', () => {
    wrapper = mount(Component, {
      localVue,
      propsData,
      store,
      vuetify: new Vuetify()
    })
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
