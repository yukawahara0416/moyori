import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/components/Map/MapMarker.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let propsData
let spot
let store

beforeEach(() => {
  propsData = {
    spots: [
      {
        data: {
          id: 1,
          name: 'test1',
          position: { lat: 36.204824, lng: 138.252923 },
          on: true,
          zIndex: 10
        }
      },
      {
        data: {
          id: 2,
          name: 'test2',
          position: { lat: 37.204824, lng: 139.252923 },
          on: false,
          zIndex: 10
        }
      },
      {
        data: {
          id: 3,
          name: 'testスターバックスtest',
          position: { lat: 37.204824, lng: 139.252923 },
          on: false,
          zIndex: 10
        }
      }
    ]
  }

  spot = {
    namespaced: true,
    actions: {
      spotlight: jest.fn()
    }
  }

  store = new Vuex.Store({
    modules: {
      spot
    }
  })

  wrapper = shallowMount(Component, {
    localVue,
    propsData,
    computed: {
      icon: () => jest.fn()
    },
    store,
    stubs: ['gmap-marker']
  })
})

describe('props', () => {
  it('spots', () => {
    expect(wrapper.props().spots).toStrictEqual(propsData.spots)
    expect(wrapper.props().spots instanceof Array).toBe(true)
  })
})

describe('computed', () => {
  it('iconFileName = spotlight', () => {
    expect(wrapper.vm.iconFileName(propsData.spots[0])).toEqual('spotlight')
  })

  it('iconFileName = cafe', () => {
    expect(wrapper.vm.iconFileName(propsData.spots[1])).toEqual('cafe')
  })

  it('iconFileName = starbucks', () => {
    expect(wrapper.vm.iconFileName(propsData.spots[2])).toEqual('starbucks')
  })
})

describe('actions', () => {
  it('spot/spotlight', () => {
    wrapper.vm.spotlight()
    expect(spot.actions.spotlight).toHaveBeenCalled()
  })
})

describe('template', () => {
  it(':title', () => {
    expect(
      wrapper
        .findAll('gmap-marker-stub')
        .at(0)
        .attributes().title
    ).toEqual('test1')
  })

  it(':zIndex', () => {
    expect(
      wrapper
        .findAll('gmap-marker-stub')
        .at(0)
        .attributes().zindex
    ).toEqual('10')
  })

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
