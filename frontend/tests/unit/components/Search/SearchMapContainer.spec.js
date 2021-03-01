import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import Vuetify from 'vuetify'
import Component from '@/components/Search/SearchMapContainer.vue'

const localVue = createLocalVue()
localVue.use(Vuetify)

let wrapper
let vuetify

beforeEach(() => {
  vuetify = new Vuetify()

  wrapper = shallowMount(Component, {
    localVue,
    vuetify
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
  it('v-col has mapHeight_big', () => {
    const mdAndUp = wrapper.vm.$vuetify.breakpoint.thresholds.md + 1
    Object.assign(window, { innerWidth: mdAndUp })

    wrapper = mount(Component, {
      localVue,
      vuetify,
      stubs: ['map-container']
    })

    expect(wrapper.vm.$vuetify.breakpoint.mdAndUp).toBeTruthy()
    expect(wrapper.find('.col').classes()).toContain('mapHeight_big')

    Object.assign(window, { innerWidth: 1024 })
  })

  it('v-col has mapHeight_small', () => {
    const smAndDown = wrapper.vm.$vuetify.breakpoint.thresholds.sm - 1
    Object.assign(window, { innerWidth: smAndDown })

    wrapper = mount(Component, {
      localVue,
      vuetify,
      stubs: ['map-container']
    })

    expect(wrapper.vm.$vuetify.breakpoint.mdAndDown).toBeTruthy()
    expect(wrapper.find('.col').classes()).toContain('mapHeight_small')

    Object.assign(window, { innerWidth: 1024 })
  })

  it('v-col has :style', async () => {
    wrapper = mount(Component, {
      localVue,
      vuetify,
      stubs: ['map-container']
    })

    await wrapper.setData({ height: window.innerHeight })
    expect(wrapper.find('.col').attributes().style).toEqual(
      `--checkbox-height: ${window.innerHeight}px;`
    )
  })

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
