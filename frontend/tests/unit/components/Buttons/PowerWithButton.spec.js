import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import { Spot } from '@/class/Spot.js'
import { placeDetail, postSpot } from '@/plugins/maps.js'
import Component from '@/components/Buttons/PowerWithButton.vue'
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
  power_withs: [
    { id: 1, user_id: 1 },
    { id: 2, user_id: 2 }
  ]
}

const notHasWith = {
  data: { id: 1, place_id: '1234567890test' },
  power_withs: [
    // { id: 1, user_id: 1 },
    { id: 2, user_id: 2 }
  ]
}

const hasWithout = {
  data: { id: 1, place_id: '1234567890test' },
  power_withouts: [
    { id: 1, user_id: 1 },
    { id: 2, user_id: 2 }
  ]
}

const notHasWithout = {
  data: { id: 1, place_id: '1234567890test' },
  power_withouts: [
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
    expect(wrapper.vm.$options.props.spot.required).toBeTruthy()
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
    wrapper.setProps({ spot: new Spot(notHasWith) })
    expect(wrapper.vm.isPowerWithing).toBeFalsy()
  })

  it('isPowerWithouting is true', () => {
    wrapper.setProps({ spot: new Spot(hasWithout) })
    expect(wrapper.vm.isPowerWithouting).toBeTruthy()
  })

  it('isPowerWithouting is false', () => {
    wrapper.setProps({ spot: new Spot(notHasWithout) })
    expect(wrapper.vm.isPowerWithouting).toBeFalsy()
  })

  it('yourPowerWith', () => {
    expect(wrapper.vm.yourPowerWith).toMatchObject([hasWith.power_withs[0]])
  })

  it('yourPowerWithout', () => {
    wrapper.setProps({ spot: new Spot(hasWithout) })
    expect(wrapper.vm.yourPowerWithout).toMatchObject([
      hasWithout.power_withouts[0]
    ])
  })
})

describe('v-on', () => {
  const powerWithHandler = jest.fn()
  const mouseover = jest.fn()
  const mouseleave = jest.fn()

  beforeEach(() => {
    wrapper = mount(Component, {
      localVue,
      propsData,
      store,
      methods: {
        powerWithHandler,
        mouseover,
        mouseleave
      }
    })
  })

  it('click powerWithHandler', () => {
    wrapper.find('.v-btn').trigger('click')
    expect(powerWithHandler).toHaveBeenCalledWith(propsData.spot)
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
  describe('powerWithHandler', () => {
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

      return wrapper.vm.powerWithHandler(propsData.spot).then(() => {
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

    // 未登録のスポットの場合、スポットを登録してから「電源あるよ」します
    it('isPosted is false', () => {
      const spot = new Spot(beforePost)
      propsData = { spot }

      const newSpot = { data: { id: 1 } }

      const params = new FormData()
      params.append('power_with[spot_id]', newSpot.data.id)

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

      return wrapper.vm.powerWithHandler(spot).then(() => {
        expect(!spot.isPosted()).toBeTruthy()
        expect(getNewSpot).toHaveBeenCalledWith(spot.data.place_id)
        expect(voteHandler).toHaveBeenCalledWith(newSpot, params)
        expect(snackbar.actions.pushSnackbarSuccess).toHaveBeenCalledWith(
          expect.any(Object),
          {
            message: '「電源あるよ」を投票しました'
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

    // 「電源ないよ」を取り消してから、「電源あるよ」します
    it('isPowerWithouting is true', () => {
      const spot = new Spot(hasWithout)
      wrapper.setProps({ spot })

      const params = new FormData()
      params.append('power_with[spot_id]', spot.data.id)

      expect.assertions(3)

      return wrapper.vm.voteHandler(spot, params).then(() => {
        expect(wrapper.vm.isPowerWithouting).toBeTruthy()
        expect(vote.actions.unVote).toHaveBeenCalledWith(expect.any(Object), {
          prop: 'power_withouts',
          spot,
          target: wrapper.vm.yourPowerWithout[0],
          headers,
          route,
          isMyPage
        })
        expect(vote.actions.vote).toHaveBeenCalledWith(expect.any(Object), {
          prop: 'power_withs',
          spot,
          params,
          headers,
          route,
          isMyPage,
          vote_id: spot.data.id
        })
      })
    })

    // 「電源あるよ」を取り消します
    it('isPowerWithing is true', () => {
      const spot = new Spot(hasWith)
      wrapper.setProps({ spot })

      const params = new FormData()
      params.append('power_with[spot_id]', spot.data.id)

      expect.assertions(3)

      return wrapper.vm.voteHandler(spot, params).then(() => {
        expect(wrapper.vm.isPowerWithing).toBeTruthy()
        expect(vote.actions.unVote).toHaveBeenCalledWith(expect.any(Object), {
          prop: 'power_withs',
          spot,
          target: wrapper.vm.yourPowerWith[0],
          headers,
          route,
          isMyPage
        })
        expect(snackbar.actions.pushSnackbarSuccess).toHaveBeenCalledWith(
          expect.any(Object),
          {
            message: '「電源あるよ」を取り消しました'
          }
        )
      })
    })

    // 「電源あるよ」します
    it('isPowerWithouting is false', () => {
      const spot = new Spot(notHasWith)
      wrapper.setProps({ spot })

      const params = new FormData()
      params.append('power_with[spot_id]', spot.data.id)

      expect.assertions(3)

      return wrapper.vm.voteHandler(spot, params).then(() => {
        expect(wrapper.vm.isPowerWithouting).toBeFalsy()
        expect(wrapper.vm.isPowerWithing).toBeFalsy()
        expect(vote.actions.vote).toHaveBeenCalledWith(expect.any(Object), {
          prop: 'power_withs',
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
  it('v-if="isPowerWithing"', () => {
    expect(wrapper.find('v-icon-stub').text()).toEqual('mdi-power-plug')
  })

  it('v-else', () => {
    wrapper.setProps({ spot: new Spot(notHasWith) })
    expect(wrapper.find('v-icon-stub').text()).toEqual('mdi-power-plug')
    expect(wrapper.vm.$el).toMatchSnapshot()
  })

  it('Counter has :spot', () => {
    expect(wrapper.find(Counter).props().spot).toMatchObject(propsData.spot)
  })

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
