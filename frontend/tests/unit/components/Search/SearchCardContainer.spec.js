import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import Component from '@/components/Search/SearchCardContainer.vue'
import CardContainer from '@/components/Card/CardContainer.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(Vuetify)

let wrapper
let spot
let store
let vuetify

beforeEach(() => {
  spot = {
    namespaced: true,
    getters: {
      filteredSpots: () => [{ data: { id: 1 } }, { data: { id: 2 } }]
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
  it('spots', () => {
    expect(wrapper.vm.spots).toEqual(store.getters.spots)
  })
})

describe('computed', () => {
  it('styleVariables', async () => {
    await wrapper.setData({ height: window.innerHeight })
    expect(wrapper.vm.styleVariables).toMatchObject({
      '--checkbox-height': `${wrapper.vm.height}px`
    })
  })
})

describe('methods', () => {
  it('handleResize', async () => {
    await wrapper.setData({ height: 100 })
    wrapper.vm.handleResize()
    expect(wrapper.vm.height).toEqual(window.innerHeight)
  })
})

describe('template', () => {
  it('v-container class indexHeight_big', () => {
    const mdAndUp = wrapper.vm.$vuetify.breakpoint.thresholds.md + 1
    Object.assign(window, { innerWidth: mdAndUp })

    wrapper = mount(Component, {
      localVue,
      store,
      vuetify,
      stubs: ['card-container']
    })

    expect(wrapper.vm.$vuetify.breakpoint.mdAndUp).toBeTruthy()
    expect(wrapper.find('.container').classes()).toContain('indexHeight_big')

    Object.assign(window, { innerWidth: 1024 })
  })

  it('v-container class indexHeight_small', () => {
    const smAndDown = wrapper.vm.$vuetify.breakpoint.thresholds.sm - 1
    Object.assign(window, { innerWidth: smAndDown })

    wrapper = mount(Component, {
      localVue,
      store,
      vuetify,
      stubs: ['card-container']
    })

    expect(wrapper.vm.$vuetify.breakpoint.mdAndDown).toBeTruthy()
    expect(wrapper.find('.container').classes()).toContain('indexHeight_small')

    Object.assign(window, { innerWidth: 1024 })
  })

  it('v-container has :style', async () => {
    wrapper = mount(Component, {
      localVue,
      store,
      vuetify,
      stubs: ['card-container']
    })

    await wrapper.setData({ height: window.innerHeight })
    expect(wrapper.find('.container').attributes().style).toEqual(
      `--checkbox-height: ${window.innerHeight}px;`
    )
  })

  it('card-container has :spots', () => {
    expect(wrapper.find(CardContainer).props().spots).toMatchObject(
      wrapper.vm.filteredSpots
    )
  })

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
