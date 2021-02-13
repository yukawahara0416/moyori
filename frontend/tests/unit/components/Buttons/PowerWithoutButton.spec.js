import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import { Spot } from '@/class/Spot.js'
import Component from '@/components/Buttons/PowerWithoutButton.vue'

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

  router = new VueRouter()

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
  describe('powerWithoutHanlder', () => {
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
      return wrapper.vm.powerWithoutHandler(propsData.spot).then(() => {
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
      return wrapper.vm.powerWithoutHandler(propsData.spot).then(() => {
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
    it('isPowerWithing is true', () => {
      wrapper.setProps({ spot: new Spot(hasWith) })

      expect.assertions(3)
      return wrapper.vm.voteHandler().then(() => {
        expect(wrapper.vm.isPowerWithing).toBeTruthy()
        expect(vote.actions.unVote).toHaveBeenCalled()
        expect(vote.actions.vote).toHaveBeenCalled()
      })
    })

    it('isPowerWithing is false', () => {
      wrapper.setProps({ spot: new Spot(notHasWith) })

      expect.assertions(3)
      return wrapper.vm.voteHandler().then(() => {
        expect(wrapper.vm.isPowerWithouting).toBeFalsy()
        expect(wrapper.vm.isPowerWithing).toBeFalsy()
        expect(vote.actions.vote).toHaveBeenCalled()
      })
    })

    it('isPowerWithouting is true', () => {
      wrapper.setProps({ spot: new Spot(hasWithout) })

      expect.assertions(3)
      return wrapper.vm.voteHandler().then(() => {
        expect(wrapper.vm.isPowerWithouting).toBeTruthy()
        expect(vote.actions.unVote).toHaveBeenCalled()
        expect(snackbar.actions.pushSnackbarSuccess).toHaveBeenCalled()
      })
    })
  })

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
    wrapper.setProps({ spot: new Spot(notHasWithout) })
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
