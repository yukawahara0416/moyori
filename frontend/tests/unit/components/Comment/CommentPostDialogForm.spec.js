import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import { Spot } from '@/class/Spot.js'
import { placeDetail, postSpot } from '@/plugins/maps.js'
import Component from '@/components/Comment/CommentPostDialogForm.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(Vuetify)
localVue.component('ValidationObserver', ValidationObserver)
localVue.component('ValidationProvider', ValidationProvider)

jest.mock('@/plugins/maps.js', () => ({
  ...jest.requireActual('@/plugins/maps.js'),
  placeDetail: jest.fn().mockResolvedValue({ data: { id: null } }),
  postSpot: jest.fn().mockResolvedValue({ data: { id: 1 } })
}))

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
let snackbar

let $route

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

  $route = {
    name: null,
    params: null
  }

  wrapper = shallowMount(Component, {
    localVue,
    propsData,
    store,
    mocks: {
      $route
    }
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
  describe('WifiWith/WifiWithout', () => {
    it('isWifiWithing is true', () => {
      wrapper.setProps({ spot: new Spot(hasWith) })
      expect(wrapper.vm.isWifiWithing).toBeTruthy()
    })

    it('isWifiWithing is false', () => {
      wrapper.setProps({ spot: new Spot(notHasBoth) })
      expect(wrapper.vm.isWifiWithing).toBeFalsy()
    })

    it('isWifiWithouting is true', () => {
      wrapper.setProps({ spot: new Spot(hasWithout) })
      expect(wrapper.vm.isWifiWithouting).toBeTruthy()
    })

    it('isWifiWithouting is false', () => {
      wrapper.setProps({ spot: new Spot(notHasBoth) })
      expect(wrapper.vm.isWifiWithouting).toBeFalsy()
    })

    it('yourWifiWith return vote', () => {
      wrapper.setProps({ spot: new Spot(hasWith) })
      expect(wrapper.vm.yourWifiWith).toMatchObject([
        wrapper.vm.$props.spot.wifi_withs[0]
      ])
    })

    it('yourWifiWith return []', () => {
      wrapper.setProps({ spot: new Spot(notHasBoth) })
      expect(wrapper.vm.yourWifiWith).toMatchObject([])
    })

    it('yourWifiWithout return vote', () => {
      wrapper.setProps({ spot: new Spot(hasWithout) })
      expect(wrapper.vm.yourWifiWithout).toMatchObject([
        wrapper.vm.$props.spot.wifi_withouts[0]
      ])
    })

    it('yourWifiWithout return []', () => {
      wrapper.setProps({ spot: new Spot(notHasBoth) })
      expect(wrapper.vm.yourWifiWith).toMatchObject([])
    })
  })

  describe('PowerWith/PowerWithout', () => {
    it('isPowerWithing is true', () => {
      wrapper.setProps({ spot: new Spot(hasWith) })
      expect(wrapper.vm.isPowerWithing).toBeTruthy()
    })

    it('isPowerWithing is false', () => {
      wrapper.setProps({ spot: new Spot(notHasBoth) })
      expect(wrapper.vm.isPowerWithing).toBeFalsy()
    })

    it('isPowerWithouting is true', () => {
      wrapper.setProps({ spot: new Spot(hasWithout) })
      expect(wrapper.vm.isPowerWithouting).toBeTruthy()
    })

    it('isPowerWithouting is false', () => {
      wrapper.setProps({ spot: new Spot(notHasBoth) })
      expect(wrapper.vm.isPowerWithouting).toBeFalsy()
    })

    it('yourPowerWith return vote', () => {
      wrapper.setProps({ spot: new Spot(hasWith) })
      expect(wrapper.vm.yourPowerWith).toMatchObject([
        wrapper.vm.$props.spot.power_withs[0]
      ])
    })

    it('return []', () => {
      wrapper.setProps({ spot: new Spot(notHasBoth) })
      expect(wrapper.vm.yourPowerWith).toMatchObject([])
    })

    it('yourPowerWithout return vote', () => {
      wrapper.setProps({ spot: new Spot(hasWithout) })
      expect(wrapper.vm.yourPowerWithout).toMatchObject([
        wrapper.vm.$props.spot.power_withouts[0]
      ])
    })

    it('yourPowerWithout return []', () => {
      wrapper.setProps({ spot: new Spot(notHasBoth) })
      expect(wrapper.vm.yourPowerWithout).toMatchObject([])
    })
  })
})

// ここから！！！！！！！
describe('methods', () => {
  describe('commentHandler', () => {
    // ログインしていない場合は「いいね」せず、ログインを促す
    it('isLoggingIn is false', () => {
      auth.getters.isLoggingIn = () => false

      store = new Vuex.Store({
        modules: {
          auth,
          tab,
          dialog,
          snackbar
        }
      })

      $route.name = 'search'
      $route.params = auth.getters.currentUser().data

      wrapper = shallowMount(Component, {
        localVue,
        propsData,
        store,
        mocks: {
          $route
        }
      })

      expect.assertions(5)

      return wrapper.vm.commentHandler(wrapper.vm.$props.spot).then(() => {
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

    // 未登録のスポットの場合、スポットを登録してからコメントと投票をします
    it('isPosted is false', () => {
      const newSpot = { data: { id: 1 } }

      $route.name = 'search'
      $route.params = auth.getters.currentUser().data

      const params = new FormData()
      params.append('comment[spot_id]', newSpot.data.id)

      const getNewSpot = jest.fn().mockResolvedValue(newSpot)
      const voteHandler = jest.fn()
      const closeDialog = jest.fn()

      wrapper = shallowMount(Component, {
        localVue,
        propsData: {
          spot: new Spot(beforePost)
        },
        store,
        methods: {
          getNewSpot,
          voteHandler,
          closeDialog
        },
        mocks: {
          $route
        }
      })

      const spot = wrapper.vm.$props.spot

      expect.assertions(5)

      return wrapper.vm.commentHandler(spot).then(() => {
        expect(!spot.isPosted()).toBeTruthy()
        expect(getNewSpot).toHaveBeenCalledWith(spot.data.place_id)
        expect(voteHandler).toHaveBeenCalledWith(newSpot)
        expect(snackbar.actions.pushSnackbarSuccess).toHaveBeenCalledWith(
          expect.any(Object),
          {
            message: 'コメントを投稿しました'
          }
        )
        expect(closeDialog).toHaveBeenCalled()
      })
    })
  })

  it('getNewSpot', () => {
    const place_id = wrapper.vm.$props.spot.data.place_id

    expect.assertions(5)

    return wrapper.vm.getNewSpot(place_id).then(() => {
      expect(placeDetail).toHaveBeenCalledWith({
        map: map.getters.map(),
        place_id
      })
      expect(spot.mutations.updateSpot).toHaveBeenCalledWith(
        expect.any(Object),
        {
          place_id,
          updated: { data: { id: null } }
        }
      )
      expect(form.mutations.setSpotForm).toHaveBeenCalledWith(
        expect.any(Object),
        wrapper.vm.$props.spot
      )
      expect(postSpot).toHaveBeenCalledWith(
        form.getters.spotForm(),
        auth.getters.headers()
      )
      expect(spot.mutations.updateSpot).toHaveBeenCalledWith(
        expect.any(Object),
        {
          place_id,
          updated: { data: { id: 1 } }
        }
      )
    })
  })

  describe('voteHandler', () => {
    let wifiWithHandler
    let wifiWithoutHandler
    let powerWithHandler
    let powerWithoutHandler

    let spot
    let headers
    let route
    let params
    let isMyPage

    beforeEach(() => {
      wifiWithHandler = jest.fn()
      wifiWithoutHandler = jest.fn()
      powerWithHandler = jest.fn()
      powerWithoutHandler = jest.fn()

      $route.name = 'search'
      $route.params = auth.getters.currentUser().data

      wrapper = shallowMount(Component, {
        localVue,
        propsData: {
          spot: new Spot(beforePost)
        },
        store,
        methods: {
          wifiWithHandler,
          wifiWithoutHandler,
          powerWithHandler,
          powerWithoutHandler
        },
        mocks: {
          $route
        }
      })

      spot = wrapper.vm.$props.spot
      headers = auth.getters.headers()
      route = $route.name
      params = new FormData()
      isMyPage = $route.params.id === auth.getters.currentUser().data.id
    })

    // wifi・電源どちらも「わからない」の場合は、処理を終了します
    it('process end', () => {
      wrapper.setData({ wifi_radio: 'unknown', power_radio: 'unknown' })

      expect.assertions(4)

      return wrapper.vm.voteHandler(spot).then(() => {
        expect(wifiWithHandler).not.toHaveBeenCalled()
        expect(wifiWithoutHandler).not.toHaveBeenCalled()
        expect(powerWithHandler).not.toHaveBeenCalled()
        expect(powerWithoutHandler).not.toHaveBeenCalled()
      })
    })

    // 「Wifiあり」が選択された場合
    it('vote wifiWith', () => {
      wrapper.setData({ wifi_radio: 'wifi_with', power_radio: 'unknown' })

      expect.assertions(4)

      return wrapper.vm.voteHandler(spot).then(() => {
        expect(wifiWithHandler).toHaveBeenCalledWith(
          spot,
          headers,
          route,
          params,
          isMyPage
        )
        expect(wifiWithoutHandler).not.toHaveBeenCalled()
        expect(powerWithHandler).not.toHaveBeenCalled()
        expect(powerWithoutHandler).not.toHaveBeenCalled()
      })
    })

    // 「Wifiなし」が選択された場合
    it('vote wifiWithout', () => {
      wrapper.setData({ wifi_radio: 'wifi_without', power_radio: 'unknown' })

      expect.assertions(4)

      return wrapper.vm.voteHandler(spot).then(() => {
        expect(wifiWithHandler).not.toHaveBeenCalled()
        expect(wifiWithoutHandler).toHaveBeenCalledWith(
          spot,
          headers,
          route,
          params,
          isMyPage
        )
        expect(powerWithHandler).not.toHaveBeenCalled()
        expect(powerWithoutHandler).not.toHaveBeenCalled()
      })
    })

    // 「電源あり」が選択された場合
    it('vote powerWith', () => {
      wrapper.setData({ wifi_radio: 'unknown', power_radio: 'power_with' })

      expect.assertions(4)

      return wrapper.vm.voteHandler(spot).then(() => {
        expect(wifiWithHandler).not.toHaveBeenCalled()
        expect(wifiWithoutHandler).not.toHaveBeenCalled()
        expect(powerWithHandler).toHaveBeenCalledWith(
          spot,
          headers,
          route,
          params,
          isMyPage
        )
        expect(powerWithoutHandler).not.toHaveBeenCalled()
      })
    })

    // 「電源なし」が選択された場合
    it('vote powerWithout', () => {
      wrapper.setData({ wifi_radio: 'unknown', power_radio: 'power_without' })

      expect.assertions(4)

      return wrapper.vm.voteHandler(spot).then(() => {
        expect(wifiWithHandler).not.toHaveBeenCalled()
        expect(wifiWithoutHandler).not.toHaveBeenCalled()
        expect(powerWithHandler).not.toHaveBeenCalled()
        expect(powerWithoutHandler).toHaveBeenCalledWith(
          spot,
          headers,
          route,
          params,
          isMyPage
        )
      })
    })
  })

  describe('Handler', () => {
    let spot
    let headers
    let route
    let params
    let isMyPage

    beforeEach(() => {
      $route.name = 'search'
      $route.params = auth.getters.currentUser().data

      wrapper = shallowMount(Component, {
        localVue,
        propsData: {
          spot: new Spot(beforePost)
        },
        store,
        mocks: {
          $route
        }
      })

      spot = wrapper.vm.$props.spot
      headers = auth.getters.headers()
      route = $route.name
      params = new FormData()
      isMyPage = $route.params.id === auth.getters.currentUser().data.id
    })

    describe('wifiWithHandler', () => {
      // 「Wifiあるよ」の投票があれば処理を終了します
      it('process end', () => {
        wrapper.setProps({ spot: new Spot(hasWith) })

        expect.assertions(3)

        return wrapper.vm
          .wifiWithHandler(spot, headers, route, params, isMyPage)
          .then(() => {
            expect(wrapper.vm.isWifiWithing).toBeTruthy()
            expect(vote.actions.unVote).not.toHaveBeenCalled()
            expect(vote.actions.vote).not.toHaveBeenCalled()
          })
      })

      // 「Wifiないよ」の投票があれば、投票を取り消して「Wifiあるよ」を投票します
      it('isWifiWithouting is true', () => {
        wrapper.setProps({ spot: new Spot(hasWithout) })
        const target = wrapper.vm.yourWifiWithout[0]

        expect.assertions(4)

        return wrapper.vm
          .wifiWithHandler(spot, headers, route, params, isMyPage)
          .then(() => {
            expect(wrapper.vm.isWifiWithing).toBeFalsy()
            expect(wrapper.vm.isWifiWithouting).toBeTruthy()
            expect(vote.actions.unVote).toHaveBeenCalledWith(
              expect.any(Object),
              {
                prop: 'wifi_withouts',
                spot,
                target,
                headers,
                route,
                isMyPage
              }
            )
            expect(vote.actions.vote).toHaveBeenCalledWith(expect.any(Object), {
              prop: 'wifi_withs',
              spot,
              params,
              headers,
              route,
              isMyPage
            })
          })
      })

      // 「Wifiあるよ」を投票します
      it('isWifiWithouting is false', () => {
        wrapper.setProps({ spot: new Spot(notHasBoth) })

        expect.assertions(4)

        return wrapper.vm
          .wifiWithHandler(spot, headers, route, params, isMyPage)
          .then(() => {
            expect(wrapper.vm.isWifiWithing).toBeFalsy()
            expect(wrapper.vm.isWifiWithouting).toBeFalsy()
            expect(vote.actions.unVote).not.toHaveBeenCalled()
            expect(vote.actions.vote).toHaveBeenCalledWith(expect.any(Object), {
              prop: 'wifi_withs',
              spot,
              params,
              headers,
              route,
              isMyPage
            })
          })
      })
    })

    describe('wifiWithoutHandler', () => {
      // 「Wifiないよ」の投票があれば処理を終了します
      it('process end', () => {
        wrapper.setProps({ spot: new Spot(hasWithout) })

        expect.assertions(3)

        return wrapper.vm
          .wifiWithoutHandler(spot, headers, route, params, isMyPage)
          .then(() => {
            expect(wrapper.vm.isWifiWithouting).toBeTruthy()
            expect(vote.actions.unVote).not.toHaveBeenCalled()
            expect(vote.actions.vote).not.toHaveBeenCalled()
          })
      })

      // 「Wifiあるよ」の投票があれば、投票を取り消して「Wifiないよ」を投票します
      it('isWifiWithing is true', () => {
        wrapper.setProps({ spot: new Spot(hasWith) })
        const target = wrapper.vm.yourWifiWith[0]

        expect.assertions(4)

        return wrapper.vm
          .wifiWithoutHandler(spot, headers, route, params, isMyPage)
          .then(() => {
            expect(wrapper.vm.isWifiWithing).toBeTruthy()
            expect(wrapper.vm.isWifiWithouting).toBeFalsy()
            expect(vote.actions.unVote).toHaveBeenCalledWith(
              expect.any(Object),
              {
                prop: 'wifi_withs',
                spot,
                target,
                headers,
                route,
                isMyPage
              }
            )
            expect(vote.actions.vote).toHaveBeenCalledWith(expect.any(Object), {
              prop: 'wifi_withouts',
              spot,
              params,
              headers,
              route,
              isMyPage
            })
          })
      })

      // 「Wifiないよ」を投票します
      it('isWifiWithouting is false', () => {
        wrapper.setProps({ spot: new Spot(notHasBoth) })

        expect.assertions(4)

        return wrapper.vm
          .wifiWithoutHandler(spot, headers, route, params, isMyPage)
          .then(() => {
            expect(wrapper.vm.isWifiWithing).toBeFalsy()
            expect(wrapper.vm.isWifiWithouting).toBeFalsy()
            expect(vote.actions.unVote).not.toHaveBeenCalled()
            expect(vote.actions.vote).toHaveBeenCalledWith(expect.any(Object), {
              prop: 'wifi_withouts',
              spot,
              params,
              headers,
              route,
              isMyPage
            })
          })
      })
    })

    describe('powerWithHandler', () => {
      // 「電源あるよ」の投票があれば処理を終了します
      it('process end', () => {
        wrapper.setProps({ spot: new Spot(hasWith) })

        expect.assertions(3)

        return wrapper.vm
          .powerWithHandler(spot, headers, route, params, isMyPage)
          .then(() => {
            expect(wrapper.vm.isPowerWithing).toBeTruthy()
            expect(vote.actions.unVote).not.toHaveBeenCalled()
            expect(vote.actions.vote).not.toHaveBeenCalled()
          })
      })

      // 「電源ないよ」の投票があれば、投票を取り消して「電源あるよ」を投票します
      it('isPowerWithouting is true', () => {
        wrapper.setProps({ spot: new Spot(hasWithout) })
        const target = wrapper.vm.yourPowerWithout[0]

        expect.assertions(4)

        return wrapper.vm
          .powerWithHandler(spot, headers, route, params, isMyPage)
          .then(() => {
            expect(wrapper.vm.isPowerWithing).toBeFalsy()
            expect(wrapper.vm.isPowerWithouting).toBeTruthy()
            expect(vote.actions.unVote).toHaveBeenCalledWith(
              expect.any(Object),
              {
                prop: 'power_withouts',
                spot,
                target,
                headers,
                route,
                isMyPage
              }
            )
            expect(vote.actions.vote).toHaveBeenCalledWith(expect.any(Object), {
              prop: 'power_withs',
              spot,
              params,
              headers,
              route,
              isMyPage
            })
          })
      })

      // 「電源あるよ」を投票します
      it('isPowerWithouting is false', () => {
        wrapper.setProps({ spot: new Spot(notHasBoth) })

        expect.assertions(4)

        return wrapper.vm
          .powerWithHandler(spot, headers, route, params, isMyPage)
          .then(() => {
            expect(wrapper.vm.isPowerWithing).toBeFalsy()
            expect(wrapper.vm.isPowerWithouting).toBeFalsy()
            expect(vote.actions.unVote).not.toHaveBeenCalled()
            expect(vote.actions.vote).toHaveBeenCalledWith(expect.any(Object), {
              prop: 'power_withs',
              spot,
              params,
              headers,
              route,
              isMyPage
            })
          })
      })
    })

    describe('powerWithoutHandler', () => {
      // 「電源ないよ」の投票があれば処理を終了します
      it('process end', () => {
        wrapper.setProps({ spot: new Spot(hasWithout) })

        expect.assertions(3)

        return wrapper.vm
          .powerWithoutHandler(spot, headers, route, params, isMyPage)
          .then(() => {
            expect(wrapper.vm.isPowerWithouting).toBeTruthy()
            expect(vote.actions.unVote).not.toHaveBeenCalled()
            expect(vote.actions.vote).not.toHaveBeenCalled()
          })
      })

      // 「電源あるよ」の投票があれば、投票を取り消して「電源ないよ」を投票します
      it('isPowerWithing is true', () => {
        wrapper.setProps({ spot: new Spot(hasWith) })
        const target = wrapper.vm.yourPowerWith[0]

        expect.assertions(4)

        return wrapper.vm
          .powerWithoutHandler(spot, headers, route, params, isMyPage)
          .then(() => {
            expect(wrapper.vm.isPowerWithing).toBeTruthy()
            expect(wrapper.vm.isPowerWithouting).toBeFalsy()
            expect(vote.actions.unVote).toHaveBeenCalledWith(
              expect.any(Object),
              {
                prop: 'power_withs',
                spot,
                target,
                headers,
                route,
                isMyPage
              }
            )
            expect(vote.actions.vote).toHaveBeenCalledWith(expect.any(Object), {
              prop: 'power_withouts',
              spot,
              params,
              headers,
              route,
              isMyPage
            })
          })
      })

      // 「電源ないよ」を投票します
      it('isPowerWithouting is false', () => {
        wrapper.setProps({ spot: new Spot(notHasBoth) })

        expect.assertions(4)

        return wrapper.vm
          .powerWithoutHandler(spot, headers, route, params, isMyPage)
          .then(() => {
            expect(wrapper.vm.isPowerWithing).toBeFalsy()
            expect(wrapper.vm.isPowerWithouting).toBeFalsy()
            expect(vote.actions.unVote).not.toHaveBeenCalled()
            expect(vote.actions.vote).toHaveBeenCalledWith(expect.any(Object), {
              prop: 'power_withouts',
              spot,
              params,
              headers,
              route,
              isMyPage
            })
          })
      })
    })
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
