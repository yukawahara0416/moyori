import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import { Spot } from '@/class/Spot.js'
import Component from '@/components/Buttons/WifiWithButton.vue'
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

  dialog = {
    mutations: {
      dialogOn: jest.fn()
    }
  }

  snackbar = {
    actions: {
      pushSnackbarSuccess: jest.fn(),
      pushSnackbarError: jest.fn()
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
      snackbar
    }
  })

  router = new VueRouter()

  wrapper = shallowMount(Component, {
    localVue,
    propsData,
    store,
    router
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
  describe('wifiWithHandler', () => {
    it('isLogging is false', () => {
      auth.getters.isLoggingIn = () => false

      store = new Vuex.Store({
        modules: {
          auth,
          tab,
          dialog,
          snackbar
        }
      })

      wrapper = shallowMount(Component, {
        localVue,
        propsData,
        store
      })

      expect.assertions(5)
      return wrapper.vm.wifiWithHandler(propsData.spot).then(() => {
        expect(store.getters['isLoggingIn']).toBeFalsy()
        expect(tab.mutations.changeSignTab).toHaveBeenCalled()
        expect(dialog.mutations.dialogOn).toHaveBeenCalled()
        expect(snackbar.actions.pushSnackbarSuccess).not.toHaveBeenCalled()
        expect(snackbar.actions.pushSnackbarError).toHaveBeenCalled()
      })
    })

    it('isPosted is false', () => {
      const getNewSpot = jest.fn().mockResolvedValue({ data: { id: 1 } })
      const voteHandler = jest.fn()

      propsData = {
        spot: new Spot(beforePost)
      }

      wrapper = shallowMount(Component, {
        localVue,
        propsData,
        store,
        methods: {
          getNewSpot,
          voteHandler
        }
      })

      expect.assertions(4)
      return wrapper.vm.wifiWithHandler(propsData.spot).then(() => {
        expect(!propsData.spot.isPosted()).toBeTruthy()
        expect(getNewSpot).toHaveBeenCalled()
        expect(voteHandler).toHaveBeenCalled()
        expect(snackbar.actions.pushSnackbarSuccess).toHaveBeenCalled()
      })
    })
  })

  it('getNewSpot', () => {
    throw new Error('テスト未作成')
  })

  describe('voteHandler', () => {
    it('isWifiWithouting is true', () => {
      wrapper.setProps({ spot: new Spot(hasWithout) })

      expect.assertions(3)
      return wrapper.vm.voteHandler().then(() => {
        expect(wrapper.vm.isWifiWithouting).toBeTruthy()
        expect(vote.actions.unVote).toHaveBeenCalled()
        expect(vote.actions.vote).toHaveBeenCalled()
      })
    })

    it('isWifiWithouting is false', () => {
      wrapper.setProps({ spot: new Spot(notHasWith) })

      expect.assertions(3)
      return wrapper.vm.voteHandler().then(() => {
        expect(wrapper.vm.isWifiWithouting).toBeFalsy()
        expect(wrapper.vm.isWifiWithing).toBeFalsy()
        expect(vote.actions.vote).toHaveBeenCalled()
      })
    })

  })
  })

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
    wrapper.setProps({ spot: new Spot(notHasWith) })

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
