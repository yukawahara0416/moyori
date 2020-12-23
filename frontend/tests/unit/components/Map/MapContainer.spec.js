import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/components/Map/MapContainer.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let store
let spot
let map
let auth
// let post
// let format
let getters
let actions

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
      filteredSpots: () => []
    },
    actions: {
      clearSpotsStore: jest.fn()
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

  // map = {
  //   namespaced: true,
  //   actions: {
  //     geolocate: jest.fn(),
  //     nearbySearch: jest.fn(),
  //     textSearch: jest.fn(),
  //     addSpotsStore: jest.fn(),
  //     collateSpot: jest.fn()
  //   }
  // }

  // post = {
  //   namespaced: true,
  //   actions: {
  //     nearbySearch: jest.fn(),
  //     addSpotsStore: jest.fn(),
  //     postSpot: jest.fn(),
  //     unshiftSpotsStore: jest.fn(),
  //     placeIdGenerator: jest.fn()
  //   }
  // }

  // format = {
  //   namespaced: true,
  //   actions: {
  //     newSpotFormat: jest.fn(),
  //     postedSpotFormat: jest.fn()
  //   }
  // }

  getters = {
    currentUser: () => ({ data: { id: 1 } }),
    dialogSign: () => true,
    dialogSpotCreate: () => true
  }

  actions = {
    loadingOn: jest.fn(),
    loadingOff: jest.fn(),
    dialogOff: jest.fn()
  }

  store = new Vuex.Store({
    modules: {
      spot,
      map,
      auth
      // post,
      // format
    },
    getters,
    actions
  })

  wrapper = shallowMount(Component, {
    localVue,
    store,
    stubs: [
      'map-nearby-button',
      'map-panto-button',
      'gmap-map',
      'map-circle',
      'map-marker',
      'spot-post-dialog'

      // 'map-container-toolbar',
      // 'gmap-map',
      // 'map-container-circle',
      // 'map-container-marker',
      // 'spot-dialog'
    ],
    methods: {
      autoNearbySearch: jest.fn()
    }
  })
})

// describe('actions', () => {
//   it('spot/clearSpotsStore', () => {
//     wrapper.vm.clearSpotsStore()
//     expect(spot.actions.clearSpotsStore).toHaveBeenCalled()
//   })
//   it('map/geolocate', () => {
//     wrapper.vm.geolocate()
//     expect(map.actions.geolocate).toHaveBeenCalled()
//   })
//   it('map/nearbySearch', () => {
//     wrapper.vm.nearbySearchMap()
//     expect(map.actions.nearbySearch).toHaveBeenCalled()
//   })
//   it('map/textSearch', () => {
//     wrapper.vm.textSearchMap()
//     expect(map.actions.textSearch).toHaveBeenCalled()
//   })
//   it('map/addSpotsStore', () => {
//     wrapper.vm.addSpotsMap()
//     expect(map.actions.addSpotsStore).toHaveBeenCalled()
//   })
//   it('map/collateSpot', () => {
//     wrapper.vm.collateSpot()
//     expect(map.actions.collateSpot).toHaveBeenCalled()
//   })
//   it('form/nearbySearch', () => {
//     wrapper.vm.nearbySearchPost()
//     expect(post.actions.nearbySearch).toHaveBeenCalled()
//   })
//   // it('form/textSearch', () => {
//   //   wrapper.vm.textSearchPost()
//   //   expect(post.actions.textSearch).toHaveBeenCalled()
//   // })
//   it('form/addSpotsStore', () => {
//     wrapper.vm.addSpotsPost()
//     expect(post.actions.addSpotsStore).toHaveBeenCalled()
//   })
//   it('form/postSpot', () => {
//     wrapper.vm.postSpot()
//     expect(post.actions.postSpot).toHaveBeenCalled()
//   })
//   it('form/unshiftSpotsStore', () => {
//     wrapper.vm.unshiftSpotsStore()
//     expect(post.actions.unshiftSpotsStore).toHaveBeenCalled()
//   })
//   it('form/placeIdGenerator', () => {
//     wrapper.vm.placeIdGenerator()
//     expect(post.actions.placeIdGenerator).toHaveBeenCalled()
//   })
//   it('format/newSpotFormat', () => {
//     wrapper.vm.formatNewSpot()
//     expect(format.actions.newSpotFormat).toHaveBeenCalled()
//   })
//   it('format/postedSpotFormat', () => {
//     wrapper.vm.formatPostSpot()
//     expect(format.actions.postedSpotFormat).toHaveBeenCalled()
//   })
//   it('loadingOn', () => {
//     wrapper.vm.loadingOn()
//     expect(actions.loadingOn).toHaveBeenCalled()
//   })
//   it('loadingOff', () => {
//     wrapper.vm.loadingOff()
//     expect(actions.loadingOff).toHaveBeenCalled()
//   })
//   it('dialogOff', () => {
//     wrapper.vm.dialogOff()
//     expect(actions.dialogOff).toHaveBeenCalled()
//   })
// })

// describe('v-on', () => {
//   it('nearbySearch', () => {
//     wrapper.setMethods({ nearbySearch: jest.fn() })
//     wrapper.vm.$emit('nearbySearch')
//     expect(wrapper.emitted().nearbySearch).toBeTruthy()
//   })
//   it('textSearch', () => {
//     wrapper.setMethods({ textSearch: jest.fn() })
//     wrapper.vm.$emit('textSearch')
//     expect(wrapper.emitted().textSearch).toBeTruthy()
//   })
//   it('panToLocation', () => {
//     wrapper.setMethods({ panToLocation: jest.fn() })
//     wrapper.vm.$emit('panToLocation')
//     expect(wrapper.emitted().panToLocation).toBeTruthy()
//   })
//   it('demoSearch', () => {
//     wrapper.setMethods({ demoSearch: jest.fn() })
//     wrapper.vm.$emit('demoSearch')
//     expect(wrapper.emitted().demoSearch).toBeTruthy()
//   })
//   it('createSpot', () => {
//     const event = jest.fn()
//     wrapper.setMethods({ createSpot: event })
//     wrapper.vm.createSpot()
//     expect(event).toHaveBeenCalledTimes(1)
//   })
// })

// describe('getters', () => {
//   it('spot/spots', () => {
//     expect(wrapper.vm.spots).toEqual(spot.getters.spots())
//   })
//   it('currentUser', () => {
//     expect(wrapper.vm.currentUser).toEqual(getters.currentUser())
//   })
//   it('dialogSign', () => {
//     expect(wrapper.vm.dialogSign).toEqual(getters.dialogSign())
//   })
//   it('dialogSpotCreate', () => {
//     expect(wrapper.vm.dialogSpotCreate).toEqual(getters.dialogSpotCreate())
//   })
// })

describe('template', () => {
  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
