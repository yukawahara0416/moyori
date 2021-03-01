import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import { geolocate, geocodeGenerate, placeIdGenerate } from '@/plugins/maps.js'
import Component from '@/components/Map/MapContainer.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(Vuetify)

jest.mock('@/plugins/maps.js', () => ({
  ...jest.requireActual('@/plugins/maps.js'),
  geolocate: jest.fn().mockResolvedValue({ lat: 123, lng: 456 }),
  geocodeGenerate: jest
    .fn()
    .mockResolvedValue({ address: 'address', lat: 123, lng: 456 }),
  placeIdGenerate: jest.fn().mockReturnValue({ place_id: '1_abcdefgh' })
}))

let wrapper
let store
let auth
let spot
let form
let map
let dialog
let snackbar
let loading

let vuetify

beforeEach(() => {
  spot = {
    namespaced: true,
    getters: {
      spots: () => [{ data: { id: 1 } }, { data: { id: 2 } }],
      radius: () => {
        return { name: '500m', value: 500 }
      },
      type: () => {
        return { name: 'カフェ', value: 'cafe' }
      },
      filteredSpots: () => [{ data: { id: 2 } }]
    },
    mutations: {
      setSpot: jest.fn(),
      clearSpots: jest.fn()
    }
  }

  form = {
    mutations: {
      setSpotForm: jest.fn(),
      clearSpotForm: jest.fn()
    }
  }

  map = {
    mutations: {
      mapMutation: jest.fn(),
      googleMutation: jest.fn()
    }
  }

  auth = {
    getters: {
      currentUser: () => {
        return { data: { id: 1 } }
      },
      isLoggingIn: () => true
    }
  }

  dialog = {
    getters: {
      dialogSpotCreate: () => true
    },
    mutations: {
      dialogOn: jest.fn()
    },
    actions: {
      dialogOff: jest.fn()
    }
  }

  snackbar = {
    actions: {
      pushSnackbarSuccess: jest.fn(),
      pushSnackbarError: jest.fn()
    }
  }

  loading = {
    mutations: {
      loadingOn: jest.fn(),
      loadingOff: jest.fn()
    }
  }

  vuetify = new Vuetify()

  store = new Vuex.Store({
    modules: {
      auth,
      spot,
      form,
      map,
      dialog,
      snackbar,
      loading
    }
  })

  wrapper = shallowMount(Component, {
    localVue,
    store,
    vuetify,
    stubs: ['gmap-map', 'map-circle', 'map-marker']
  })
})

describe('call at mount hook', () => {
  it('demoSearch', () => {
    const demoSearch = jest.fn()

    store = new Vuex.Store({
      modules: {
        spot,
        map,
        auth,
        dialog,
        loading
      }
    })

    wrapper = shallowMount(Component, {
      localVue,
      store,
      vuetify,
      stubs: ['gmap-map', 'map-circle', 'map-marker'],
      methods: {
        demoSearch
      }
    })

    expect(demoSearch).toHaveBeenCalled()
  })
})

describe('getters', () => {
  it('spot/spots', () => {
    expect(wrapper.vm.spots.length).toEqual(2)
  })

  it('spot/radius', () => {
    expect(wrapper.vm.radius).toMatchObject(store.getters['spot/radius'])
  })

  it('spot/type', () => {
    expect(wrapper.vm.type).toMatchObject(store.getters['spot/type'])
  })

  it('spot/filterSpots', () => {
    expect(wrapper.vm.filteredSpots.length).toEqual(1)
  })

  it('currentUser', () => {
    expect(wrapper.vm.currentUser).toMatchObject(store.getters.currentUser)
  })

  it('isLoggingIn', () => {
    expect(wrapper.vm.isLoggingIn).toBeTruthy()
  })
})

describe('computed', () => {
  it('zoom 13', () => {
    spot.getters.radius = () => {
      return { name: '3km', value: 3000 }
    }

    store = new Vuex.Store({
      modules: {
        spot
      }
    })

    wrapper = shallowMount(Component, {
      localVue,
      store,
      stubs: ['gmap-map', 'map-circle', 'map-marker']
    })

    expect(wrapper.vm.radius.value === 3000).toBeTruthy()
    expect(wrapper.vm.zoom).toEqual(13)
  })

  it('zoom 14', () => {
    Object.assign(window, { innerWidth: 599 })

    spot.getters.radius = () => {
      return { name: '1km', value: 1000 }
    }

    store = new Vuex.Store({
      modules: {
        spot
      }
    })

    wrapper = shallowMount(Component, {
      localVue,
      store,
      vuetify,
      stubs: ['gmap-map', 'map-circle', 'map-marker']
    })

    expect(wrapper.vm.radius.value === 1000).toBeTruthy()
    expect(wrapper.vm.$vuetify.breakpoint.smAndDown).toBeTruthy()
    expect(wrapper.vm.zoom).toEqual(14)

    Object.assign(window, { innerWidth: 1024 })
  })

  it('zoom 15', () => {
    Object.assign(window, { innerWidth: 1281 })

    spot.getters.radius = () => {
      return { name: '1km', value: 1000 }
    }

    store = new Vuex.Store({
      modules: {
        spot
      }
    })

    wrapper = shallowMount(Component, {
      localVue,
      store,
      vuetify,
      stubs: ['gmap-map', 'map-circle', 'map-marker']
    })

    expect(wrapper.vm.radius.value === 1000).toBeTruthy()
    expect(wrapper.vm.$vuetify.breakpoint.mdAndUp).toBeTruthy()
    expect(wrapper.vm.zoom).toEqual(15)

    Object.assign(window, { innerWidth: 1024 })
  })

  it('zoom 16', () => {
    expect(wrapper.vm.zoom).toEqual(16)
  })
})

describe('methods', () => {
  it('beforeSearch', () => {
    wrapper.vm.beforeSearch()
    expect(dialog.actions.dialogOff).toHaveBeenCalledWith(
      expect.any(Object),
      'dialogSign'
    )
    expect(dialog.actions.dialogOff).toHaveBeenCalledWith(
      expect.any(Object),
      'dialogSpotCreate'
    )
    expect(dialog.actions.dialogOff).toHaveBeenCalledWith(
      expect.any(Object),
      'dialogSpotEdit'
    )
    expect(loading.mutations.loadingOn).toHaveBeenCalled()
    expect(spot.mutations.clearSpots).toHaveBeenCalled()
  })

  it('panToLocation', () => {
    const position = { lat: 123, lng: 456 }

    const setLocationMarker = jest.fn()
    const panTo = jest.fn()

    wrapper = shallowMount(Component, {
      localVue,
      store,
      vuetify,
      methods: {
        setLocationMarker,
        panTo
      },
      stubs: ['gmap-map', 'map-circle', 'map-marker']
    })

    return wrapper.vm.panToLocation().then(() => {
      expect(loading.mutations.loadingOn).toHaveBeenCalled()
      expect(geolocate).toHaveBeenCalled()
      expect(setLocationMarker).toHaveBeenCalledWith(position)
      expect(panTo).toHaveBeenCalledWith(position)
    })
  })

  describe('openDialogPostSpot', () => {
    const event = 'event'

    it('isLoggingIn is false', () => {
      auth.getters.isLoggingIn = () => false

      store = new Vuex.Store({
        modules: {
          spot,
          auth,
          dialog,
          snackbar
        }
      })

      wrapper = shallowMount(Component, {
        localVue,
        store,
        vuetify,
        stubs: ['gmap-map', 'map-circle', 'map-marker']
      })

      expect.assertions(3)

      return wrapper.vm.openDialogPostSpot(event).then(() => {
        expect(wrapper.vm.isLoggingIn).toBeFalsy()
        expect(snackbar.actions.pushSnackbarError).toHaveBeenCalledWith(
          expect.any(Object),
          {
            message: 'スポットを登録するには、ログインが必要です'
          }
        )
        expect(dialog.mutations.dialogOn).toHaveBeenCalledWith(
          expect.any(Object),
          'dialogSign'
        )
      })
    })

    it('isLoggingIn is true', () => {
      expect.assertions(8)

      return wrapper.vm.openDialogPostSpot(event).then(() => {
        expect(wrapper.vm.isLoggingIn).toBeTruthy()
        expect(form.mutations.clearSpotForm).toHaveBeenCalled()
        expect(geocodeGenerate).toHaveBeenCalledWith(event)
        expect(placeIdGenerate).toHaveBeenCalledWith(
          wrapper.vm.currentUser.data.id
        )
        expect(form.mutations.setSpotForm).toHaveBeenCalledTimes(2)
        expect(form.mutations.setSpotForm).toHaveBeenNthCalledWith(
          1,
          expect.any(Object),
          { address: 'address', lat: 123, lng: 456 }
        )
        expect(form.mutations.setSpotForm).toHaveBeenNthCalledWith(
          2,
          expect.any(Object),
          { place_id: '1_abcdefgh' }
        )
        expect(dialog.mutations.dialogOn).toHaveBeenCalledWith(
          expect.any(Object),
          'dialogSpotCreate'
        )
      })
    })
  })
})

describe('emit', () => {
  it('$emit.nearby-search', () => {
    wrapper.vm.$emit('nearby-search')
    expect(wrapper.emitted()['nearby-search']).toBeTruthy()
  })

  it('$emit.panto-location', () => {
    wrapper.vm.$emit('panto-location')
    expect(wrapper.emitted()['panto-location']).toBeTruthy()
  })
})

describe('template', () => {
  it('gmap-map has :center', () => {
    expect(wrapper.find('gmap-map-stub').attributes().center).toEqual(
      '[object Object]'
    )
  })

  it('gmap-map has :options', () => {
    expect(wrapper.find('gmap-map-stub').attributes().options).toEqual(
      '[object Object]'
    )
  })

  it('gmap-map has :zoom', () => {
    expect(wrapper.find('gmap-map-stub').attributes().zoom).toEqual(
      wrapper.vm.zoom.toString()
    )
  })

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
