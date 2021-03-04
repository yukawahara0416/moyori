import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import Component from '@/components/Search/SearchFilter.vue'
import SearchFilterResult from '@/components/Search/SearchFilterResult.vue'
import SearchFilterSwitch from '@/components/Search/SearchFilterSwitch.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(Vuetify)

let wrapper
let store
let spot
let vuetify

beforeEach(() => {
  spot = {
    namespaced: true,
    getters: {
      spots: () => [{ data: { id: 1 } }, { data: { id: 2 } }],
      filteredSpots: () => [{ data: { id: 2 } }]
    }
  }

  store = new Vuex.Store({
    modules: {
      spot
    }
  })

  vuetify = new Vuetify()

  wrapper = shallowMount(Component, {
    localVue,
    store,
    vuetify
  })
})

describe('getters', () => {
  it('spot/spots', () => {
    expect(wrapper.vm.spots).toMatchObject(store.getters['spot/spots'])
  })

  it('spot/filteredSpots', () => {
    expect(wrapper.vm.filteredSpots).toMatchObject(
      store.getters['spot/filteredSpots']
    )
  })
})

describe('template', () => {
  it('md_and_up', () => {
    const mdAndUp = wrapper.vm.$vuetify.breakpoint.thresholds.md + 1
    Object.assign(window, { innerWidth: mdAndUp })

    wrapper = shallowMount(Component, {
      localVue,
      store,
      vuetify
    })

    expect(wrapper.vm.$vuetify.breakpoint.mdAndUp).toBeTruthy()
    expect(wrapper.find('.filter-container').classes()).toContain('md_and_up')
  })

  it('sm_and_down', () => {
    const smAndDown = wrapper.vm.$vuetify.breakpoint.thresholds.sm - 1
    Object.assign(window, { innerWidth: smAndDown })

    wrapper = shallowMount(Component, {
      localVue,
      store,
      vuetify
    })

    expect(wrapper.vm.$vuetify.breakpoint.smAndDown).toBeTruthy()
    expect(wrapper.find('.filter-container').classes()).toContain('sm_and_down')
  })

  describe('SearchFilterResult', () => {
    it('v-if true', () => {
      const smAndUp = wrapper.vm.$vuetify.breakpoint.thresholds.sm + 1
      Object.assign(window, { innerWidth: smAndUp })

      wrapper = shallowMount(Component, {
        localVue,
        store,
        vuetify
      })

      expect(wrapper.vm.$vuetify.breakpoint.smAndUp).toBeTruthy()
      expect(wrapper.find(SearchFilterResult).exists()).toBeTruthy()

      Object.assign(window, { innerWidth: 1024 })
    })

    it('v-if false', () => {
      const xsAndDown = wrapper.vm.$vuetify.breakpoint.thresholds.xs - 1
      Object.assign(window, { innerWidth: xsAndDown })

      wrapper = shallowMount(Component, {
        localVue,
        store,
        vuetify
      })

      expect(wrapper.vm.$vuetify.breakpoint.smAndUp).toBeFalsy()
      expect(wrapper.find(SearchFilterResult).exists()).toBeFalsy()

      Object.assign(window, { innerWidth: 1024 })
    })

    it('has :spots', () => {
      expect(wrapper.find(SearchFilterResult).props().spots).toMatchObject(
        wrapper.vm.spots
      )
    })

    it('has :filteredSpots', () => {
      expect(
        wrapper.find(SearchFilterResult).props().filteredSpots
      ).toMatchObject(wrapper.vm.filteredSpots)
    })
  })

  describe('SearchFilterSwitch', () => {
    it('has :spots', () => {
      expect(wrapper.find(SearchFilterSwitch).props().spots).toEqual(
        wrapper.vm.spots
      )
    })
  })

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
