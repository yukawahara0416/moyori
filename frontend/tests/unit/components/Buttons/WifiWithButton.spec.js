import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import { Spot } from '@/class/Spot.js'
import { placeDetail, postSpot } from '@/plugins/maps.js'
import Component from '@/components/Buttons/WifiWithButton.vue'
import Counter from '@/components/Buttons/Counter.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)

jest.mock('@/plugins/maps.js', () => ({
  ...jest.requireActual('@/plugins/maps.js'),
  placeDetail: jest.fn().mockResolvedValue({ data: { id: null } }),
  postSpot: jest.fn().mockResolvedValue({ data: { id: 1 } })
}))

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
  const wifiWithHandler = jest.fn()
  const mouseover = jest.fn()
  const mouseleave = jest.fn()

  beforeEach(() => {
    wrapper = mount(Component, {
      localVue,
      propsData,
      store,
      methods: {
        wifiWithHandler,
        mouseover,
        mouseleave
      }
    })
  })

  it('click wifiWithHandler', () => {
    wrapper.find('.v-btn').trigger('click')
    expect(wifiWithHandler).toHaveBeenCalledWith(propsData.spot)
  })

  it('mouseover', () => {
    wrapper.find('.v-btn').trigger('mouseover')
    expect(mouseover).toHaveBeenCalled()
  })

  it('mouseleave', () => {
    wrapper.find('.v-btn').trigger('mouseleave')
    expect(mouseleave).toHaveBeenCalled()
  })
})

describe('methods', () => {
  describe('wifiWithHandler', () => {
    // ログインしていない場合は投票せず、ログインを促す
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
        expect(store.getters.isLoggingIn).toBeFalsy()
        expect(tab.mutations.changeSignTab).toHaveBeenCalledWith(
          expect.any(Object),
          'signin'
        )
        expect(dialog.mutations.dialogOn).toHaveBeenCalledWith(
          expect.any(Object),
          'dialogSign'
        )
        expect(snackbar.actions.pushSnackbarSuccess).not.toHaveBeenCalled()
        expect(snackbar.actions.pushSnackbarError).toHaveBeenCalledWith(
          expect.any(Object),
          {
            message: new Error('ログインしてください')
          }
        )
      })
    })

    // 未登録のスポットの場合、スポットを登録してから「WiFiあるよ」します
    it('isPosted is false', () => {
      const spot = new Spot(beforePost)
      propsData = { spot }

      const newSpot = { data: { id: 1 } }

      const params = new FormData()
      params.append('wifi_with[spot_id]', newSpot.data.id)

      const getNewSpot = jest.fn().mockResolvedValue(newSpot)
      const voteHandler = jest.fn()

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

      return wrapper.vm.wifiWithHandler(spot).then(() => {
        expect(!spot.isPosted()).toBeTruthy()
        expect(getNewSpot).toHaveBeenCalledWith(spot.data.place_id)
        expect(voteHandler).toHaveBeenCalledWith(newSpot, params)
        expect(snackbar.actions.pushSnackbarSuccess).toHaveBeenCalledWith(
          expect.any(Object),
          {
            message: '「Wifiあるよ」を投票しました'
          }
        )
      })
    })
  })

  it('getNewSpot', () => {
    throw new Error('テスト未作成')
  })

  describe('voteHandler', () => {
    let headers
    const route = null
    const isMyPage = false

    beforeEach(() => {
      headers = auth.getters.headers()
    })

    // 「WiFiないよ」を取り消してから、「WiFiあるよ」します
    it('isWifiWithouting is true', () => {
      const spot = new Spot(hasWithout)
      wrapper.setProps({ spot })

      const params = new FormData()
      params.append('wifi_with[spot_id]', spot.data.id)

      expect.assertions(3)

      return wrapper.vm.voteHandler(spot, params).then(() => {
        expect(wrapper.vm.isWifiWithouting).toBeTruthy()
        expect(vote.actions.unVote).toHaveBeenCalledWith(expect.any(Object), {
          prop: 'wifi_withouts',
          spot,
          target: wrapper.vm.yourWifiWithout[0],
          headers,
          route,
          isMyPage
        })
        expect(vote.actions.vote).toHaveBeenCalledWith(expect.any(Object), {
          prop: 'wifi_withs',
          spot,
          params,
          headers,
          route,
          isMyPage,
          vote_id: spot.data.id
        })
      })
    })

    // 「WiFiあるよ」を取り消します
    it('isWifiWithing is true', () => {
      const spot = new Spot(hasWith)
      wrapper.setProps({ spot })

      const params = new FormData()
      params.append('wifi_with[spot_id]', spot.data.id)

      expect.assertions(3)

      return wrapper.vm.voteHandler(spot, params).then(() => {
        expect(wrapper.vm.isWifiWithing).toBeTruthy()
        expect(vote.actions.unVote).toHaveBeenCalledWith(expect.any(Object), {
          prop: 'wifi_withs',
          spot,
          target: wrapper.vm.yourWifiWith[0],
          headers,
          route,
          isMyPage
        })
        expect(snackbar.actions.pushSnackbarSuccess).toHaveBeenCalledWith(
          expect.any(Object),
          {
            message: '「Wifiあるよ」を取り消しました'
          }
        )
      })
    })

    // 「Wifiあるよ」します
    it('isWifiWithouting is false', () => {
      const spot = new Spot(notHasWith)
      wrapper.setProps({ spot })

      const params = new FormData()
      params.append('wifi_with[spot_id]', spot.data.id)

      expect.assertions(3)

      return wrapper.vm.voteHandler(spot, params).then(() => {
        expect(wrapper.vm.isWifiWithouting).toBeFalsy()
        expect(wrapper.vm.isWifiWithing).toBeFalsy()
        expect(vote.actions.vote).toHaveBeenCalledWith(expect.any(Object), {
          prop: 'wifi_withs',
          spot,
          params,
          headers,
          route,
          isMyPage,
          vote_id: null
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

  it('Counter has :spot', () => {
    expect(wrapper.find(Counter).props().spot).toMatchObject(propsData.spot)
  })

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
