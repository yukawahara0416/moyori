import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import { Spot } from '@/class/Spot.js'
import Component from '@/components/Buttons/LikeButton.vue'
import Counter from '@/components/Buttons/Counter.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)

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

beforeEach(() => {
  // currentUserがログインしています
  // propsのspotはcurrentUserによって「いいね」されています
  options = {
    data: { id: 1, place_id: '1234567890test' },
    likes: [
      { id: 1, user_id: 1 },
      { id: 2, user_id: 2 }
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
    getters: {
      profileTab: () => 'posts'
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
    options = {
      data: { id: 1 },
      likes: [
        { id: 1, user_id: 2 },
        { id: 2, user_id: 2 }
      ]
    }

    wrapper.setProps({ spot: new Spot(options) })
    expect(wrapper.vm.isLiking).toBeFalsy()
  })

  it('yourLike', () => {
    expect(wrapper.vm.yourLike).toMatchObject([options.likes[0]])
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
    expect(likeHandler).toHaveBeenCalled()
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
    options = {
      data: { id: 1 },
      likes: [
        { id: 1, user_id: 2 },
        { id: 2, user_id: 2 }
      ]
    }

    wrapper.setProps({ spot: new Spot(options) })
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
