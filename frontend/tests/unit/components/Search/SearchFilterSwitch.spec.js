import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/components/Search/SearchFilterSwitch.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let wrapper
let propsData
let store
let spot

beforeEach(() => {
  propsData = {
    spots: [{ data: { id: 1 } }, { data: { id: 2 } }]
  }

  spot = {
    namespaced: true,
    getters: {
      filterQuery: () => [
        {
          name: 'Wifi',
          icon: 'mdi-wifi',
          color: 'success',
          value: 'wifi_withs'
        }
      ]
    },
    mutations: {
      setFilterQuery: jest.fn()
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
    store
  })
})

describe('props', () => {
  it('spots', () => {
    expect(wrapper.props().spots).toStrictEqual(propsData.spots)
    expect(wrapper.props().spots instanceof Array).toBeTruthy()
  })
})

describe('getters', () => {
  it('filterQuery', () => {
    expect(wrapper.vm.filterQuery).toMatchObject(
      store.getters['spot/filterQuery']
    )
  })
})

describe('computed', () => {
  it('select/get', () => {
    expect(wrapper.vm.select).toEqual(store.getters['spot/filterQuery'])
  })

  it('select/set', () => {
    wrapper.vm.select = 'update'
    expect(spot.mutations.setFilterQuery).toHaveBeenCalled()
  })
})

describe('template', () => {
  it('v-select has :items', () => {
    expect(wrapper.find('v-select-stub').attributes().items).toEqual(
      '[object Object],[object Object],[object Object],[object Object]'
    )
  })

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
