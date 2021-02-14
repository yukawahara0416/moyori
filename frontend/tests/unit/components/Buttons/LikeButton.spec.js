import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import { Spot } from '@/class/Spot.js'
import { placeDetail, postSpot } from '@/plugins/maps.js'
import Component from '@/components/Buttons/LikeButton.vue'
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

const hasLike = {
  data: { id: 1, place_id: '1234567890test' },
  likes: [
    { id: 1, user_id: 1 },
    { id: 2, user_id: 2 }
  ]
}

const notHasLike = {
  data: { id: 1, place_id: '1234567890test' },
  likes: [
    // { id: 1, user_id: 1 },
    { id: 2, user_id: 2 }
  ]
}

const beforePost = {
  data: { id: null, place_id: '1234567890test' }
}

beforeEach(() => {
  propsData = {
    spot: new Spot(hasLike)
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
    expect(wrapper.vm.spotForm).toEqual(store.getters.spotForm)
  })

  it('map', () => {
    expect(wrapper.vm.map).toEqual(store.getters.map)
  })

  it('headers', () => {
    expect(wrapper.vm.headers).toEqual(store.getters.headers)
  })

  it('currentUser', () => {
    expect(wrapper.vm.currentUser).toEqual(store.getters.currentUser)
  })

  it('isLoggingIn', () => {
    expect(wrapper.vm.isLoggingIn).toBe(store.getters.isLoggingIn)
  })
})

describe('computed', () => {
  it('isLiking is true', () => {
    expect(wrapper.vm.isLiking).toBeTruthy()
  })

  it('isLiking is false', () => {
    wrapper.setProps({ spot: new Spot(notHasLike) })
    expect(wrapper.vm.isLiking).toBeFalsy()
  })

  it('yourLike', () => {
    expect(wrapper.vm.yourLike).toMatchObject([hasLike.likes[0]])
  })
})

describe('v-on', () => {
  const likeHandler = jest.fn()
  const mouseover = jest.fn()
  const mouseleave = jest.fn()

  beforeEach(() => {
    wrapper = mount(Component, {
      localVue,
      propsData,
      store,
      methods: {
        likeHandler,
        mouseover,
        mouseleave
      }
    })
  })

  it('likeHandler', () => {
    wrapper.find('.v-btn').trigger('click')
    expect(likeHandler).toHaveBeenCalledWith(propsData.spot)
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
  describe('likeHandler', () => {
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

      wrapper = shallowMount(Component, {
        localVue,
        propsData,
        store
      })

      expect.assertions(5)

      return wrapper.vm.likeHandler(propsData.spot).then(() => {
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

    // 未登録のスポットの場合、スポットを登録してから「いいね」します
    it('isPosted is false', () => {
      const spot = new Spot(beforePost)
      propsData = { spot }

      const newSpot = { data: { id: 1 } }

      const params = new FormData()
      params.append('like[spot_id]', newSpot.data.id)

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

      return wrapper.vm.likeHandler(spot).then(() => {
        expect(!spot.isPosted()).toBeTruthy()
        expect(getNewSpot).toHaveBeenCalledWith(spot.data.place_id)
        expect(voteHandler).toHaveBeenCalledWith(newSpot, params)
        expect(snackbar.actions.pushSnackbarSuccess).toHaveBeenCalledWith(
          expect.any(Object),
          {
            message: 'いいねしました'
          }
        )
      })
    })
  })

  it('getNewSpot', () => {
    const place_id = propsData.spot.data.place_id

    expect.assertions(4)

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
    // 「いいね」があれば「いいね」を取り消します
    it('isLiking is true', () => {
      expect.assertions(3)

      return wrapper.vm.voteHandler(propsData.spot).then(() => {
        expect(wrapper.vm.isLiking).toBeTruthy()
        expect(vote.actions.unVote).toHaveBeenCalledWith(expect.any(Object), {
          prop: 'likes',
          spot: propsData.spot,
          target: wrapper.vm.yourLike[0],
          headers: auth.getters.headers(),
          route: null,
          isMyPage: false
        })
        expect(snackbar.actions.pushSnackbarSuccess).toHaveBeenCalledWith(
          expect.any(Object),
          {
            message: 'いいねを取り消しました'
          }
        )
      })
    })

    // 「いいね」されていなければ「いいね」します
    it('isLiking is false', () => {
      const spot = new Spot(notHasLike)
      wrapper.setProps({ spot })

      const params = new FormData()
      params.append('like[spot_id]', spot.data.id)

      expect.assertions(2)

      return wrapper.vm.voteHandler(spot, params).then(() => {
        expect(wrapper.vm.isLiking).toBeFalsy()
        expect(vote.actions.vote).toHaveBeenCalledWith(expect.any(Object), {
          prop: 'likes',
          spot,
          params,
          headers: auth.getters.headers(),
          route: null,
          isMyPage: false
        })
      })
    })
  })

  it('mouseover', () => {
    wrapper.vm.mouseover()
    expect(wrapper.vm.icon).toEqual('mdi-heart')
    expect(wrapper.vm.color).toEqual('error')
  })

  it('mouseleave', () => {
    wrapper.vm.mouseleave()
    expect(wrapper.vm.icon).toEqual('mdi-heart')
    expect(wrapper.vm.color).toEqual('#757575')
  })
})

describe('template', () => {
  it('v-if="isLiking"', () => {
    expect(wrapper.find('v-icon-stub').text()).toEqual('mdi-heart')
  })

  it('v-else', () => {
    wrapper.setProps({ spot: new Spot(notHasLike) })
    expect(wrapper.find('v-icon-stub').text()).toEqual('mdi-heart')
    expect(wrapper.vm.$el).toMatchSnapshot()
  })

  it('Counter has :spot', () => {
    expect(wrapper.find(Counter).props().spot).toMatchObject(propsData.spot)
  })

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
