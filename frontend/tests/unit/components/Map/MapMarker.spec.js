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
    expect(wrapper.vm.$props.spots).toStrictEqual(propsData.spots)
    expect(wrapper.vm.$props.spots instanceof Array).toBeTruthy()
    expect(wrapper.vm.$options.props.spots.required).toBeTruthy()
  })
})

describe('computed', () => {
  it('iconFileName = spotlight', () => {
    expect(wrapper.vm.iconFileName(wrapper.vm.$props.spots[0])).toEqual(
      'spotlight'
    )
  })

  it('iconFileName = cafe', () => {
    expect(wrapper.vm.iconFileName(wrapper.vm.$props.spots[1])).toEqual('cafe')
  })

  it('iconFileName = starbucks', () => {
    expect(wrapper.vm.iconFileName(wrapper.vm.$props.spots[2])).toEqual(
      'starbucks'
    )
  })
})

describe('template', () => {
  it('gmap-marker count 3', () => {
    expect(wrapper.findAll('gmap-marker-stub').length).toEqual(3)
  })

  it('gmap-marker has :icon', () => {
    expect(
      wrapper
        .findAll('gmap-marker-stub')
        .at(0)
        .attributes().icon
    ).toEqual(wrapper.vm.icon(wrapper.vm.$props.spots[0]))
  })

  it('gmap-marker has :title', () => {
    expect(
      wrapper
        .findAll('gmap-marker-stub')
        .at(0)
        .attributes().title
    ).toEqual(wrapper.vm.$props.spots[0].data.name)
  })

  it('gmap-marker has :position', () => {
    expect(
      wrapper
        .findAll('gmap-marker-stub')
        .at(0)
        .attributes().position
    ).toEqual(wrapper.vm.$props.spots[0].data.position.toString())
  })

  it('gmap-marker has :zIndex', () => {
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
