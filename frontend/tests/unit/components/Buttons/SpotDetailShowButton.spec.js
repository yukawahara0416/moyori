import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import { Spot } from '@/class/Spot.js'
import { placeDetail } from '@/plugins/maps.js'
import Component from '@/components/Buttons/SpotDetailShowButton.vue'
import SpotDetail from '@/components/Spot/SpotDetail.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(Vuetify)

jest.mock('@/plugins/maps.js', () => ({
  ...jest.requireActual('@/plugins/maps.js'),
  placeDetail: jest.fn().mockResolvedValue({ data: { id: null } })
}))

let wrapper
let propsData

let store
let spot
let user
let map
let tab
let snackbar

let $route

let vuetify

const databaseSpot = {
  data: { id: 1, place_id: '123456789' }
}

const gmapSpot = {
  data: { id: 1, place_id: '1234567890test' }
}

beforeEach(() => {
  propsData = {
    spot: new Spot(gmapSpot)
  }

  spot = {
    namespaced: true,
    mutations: {
      updateSpot: jest.fn()
    }
  }

  user = {
    namespaced: true,
    mutations: {
      updateSpot: jest.fn()
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
      profileTab: () => {
        return 'posts'
      }
    }
  }

  snackbar = {
    actions: {
      pushSnackbarError: jest.fn()
    }
  }

  store = new Vuex.Store({
    modules: {
      spot,
      user,
      map,
      tab,
      snackbar
    }
  })

  $route = {
    name: null
  }

  vuetify = new Vuetify()

  wrapper = shallowMount(Component, {
    localVue,
    propsData,
    store,
    vuetify,
    mocks: {
      $route
    }
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
  it('map', () => {
    expect(wrapper.vm.map).toMatchObject(store.getters.map)
  })

  it('profileTab', () => {
    expect(wrapper.vm.profileTab).toEqual(store.getters.profileTab)
  })
})

describe('v-on', () => {
  it('placeDetail, openDialog', () => {
    const placeDetail = jest.fn()
    const openDialog = jest.fn()

    wrapper = mount(Component, {
      localVue,
      vuetify,
      propsData,
      methods: {
        placeDetail,
        openDialog
      },
      stubs: ['v-dialog', 'spot-detail']
    })

    wrapper.find('.v-btn').trigger('click')
    expect(placeDetail).toHaveBeenCalledWith(propsData.spot)
    expect(openDialog).toHaveBeenCalled()
  })
})

describe('methods', () => {
  it('openDialog', () => {
    wrapper.vm.openDialog()
    expect(wrapper.vm.dialog).toBeTruthy()
  })

  it('closeDialog', () => {
    wrapper.vm.dialog = true
    wrapper.vm.closeDialog()
    expect(wrapper.vm.dialog).toBeFalsy()
  })

  describe('placeDetail', () => {
    // GoogleMaps固有のスポットでなければ、PlaceDetailしない
    it('isGmapSpot is false', () => {
      const spot = new Spot(databaseSpot)
      wrapper.setProps({ spot })

      expect.assertions(1)

      return wrapper.vm.placeDetail(spot).then(() => {
        expect(placeDetail).not.toHaveBeenCalled()
      })
    })

    // GoogleMaps固有のスポットであれば、PlaceDetailする
    it('isGmapSpot is true && route.name is profile', () => {
      const place_id = propsData.spot.data.place_id
      wrapper.vm.$route.name = 'profile'

      expect.assertions(2)

      return wrapper.vm.placeDetail(propsData.spot).then(() => {
        expect(placeDetail).toHaveBeenCalledWith({
          map: map.getters.map(),
          place_id
        })
        expect(user.mutations.updateSpot).toHaveBeenCalledWith(
          expect.any(Object),
          {
            place_id,
            updated: { data: { id: null } },
            tab: tab.getters.profileTab()
          }
        )
      })
    })

    // GoogleMaps固有のスポットであれば、PlaceDetailする
    it('isGmapSpot is true && route.name is search', () => {
      const place_id = propsData.spot.data.place_id
      wrapper.vm.$route.name = 'search'

      expect.assertions(2)

      return wrapper.vm.placeDetail(propsData.spot).then(() => {
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
      })
    })
  })
})

describe('emit', () => {
  it('closeDialog', () => {
    wrapper.vm.$emit('closeDialog')
    expect(wrapper.emitted().closeDialog).toBeTruthy()
  })
})

describe('template', () => {
  it('spot-detail has :spot', () => {
    expect(wrapper.find(SpotDetail).props().spot).toMatchObject(propsData.spot)
  })

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
