import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import Component from '@/components/Map/MapContainer.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(Vuetify)

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
  it('zoom 16 at radius.value is 500', () => {
    expect(wrapper.vm.zoom).toEqual(16)
  })

  it('zoom 15 at radius.value is 1000', () => {
    spot.getters.radius = () => {
      return { name: '1km', value: 1000 }
    }

    store = new Vuex.Store({
      modules: {
        spot,
        map,
        auth
      }
    })

    wrapper = shallowMount(Component, {
      localVue,
      store,
      vuetify,
      stubs: ['gmap-map', 'map-circle', 'map-marker']
    })

    expect(wrapper.vm.zoom).toEqual(15)
  })

  it('zoom 13 at radius.value is 3000', () => {
    spot.getters.radius = () => {
      return { name: '3km', value: 3000 }
    }

    store = new Vuex.Store({
      modules: {
        spot,
        map,
        auth
      }
    })

    wrapper = shallowMount(Component, {
      localVue,
      store,
      vuetify,
      stubs: ['gmap-map', 'map-circle', 'map-marker']
    })

    expect(wrapper.vm.zoom).toEqual(13)
  })
})

describe('methods', () => {
  it('beforeSearch', () => {
    wrapper.vm.beforeSearch()
    expect(dialog.actions.dialogOff).toHaveBeenCalledTimes(3)
    expect(loading.mutations.loadingOn).toHaveBeenCalled()
    expect(spot.mutations.clearSpots).toHaveBeenCalled()
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
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
