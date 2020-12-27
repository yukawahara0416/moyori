import { shallowMount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Spot/SpotDetailPowerPanel.vue'

const localVue = createLocalVue()

let wrapper
let propsData

beforeEach(() => {
  propsData = {
    spot: {
      data: { id: 1 },
      power_withs: [{ id: 2 }, { id: 3 }],
      power_withouts: [{ id: 4 }, { id: 5 }]
    }
  }

  wrapper = shallowMount(Component, {
    localVue,
    propsData
  })
})

describe('props', () => {
  it('spot', () => {
    expect(wrapper.props().spot).toStrictEqual(propsData.spot)
    expect(wrapper.props().spot instanceof Object).toBe(true)
  })
})

describe('computed', () => {
  it('countVote return noVote', () => {
    propsData = {
      spot: {
        data: { id: 1 },
        power_withs: [],
        power_withouts: []
      }
    }

    wrapper = shallowMount(Component, {
      localVue,
      propsData
    })

    expect(wrapper.vm.countVote).toEqual('noVote')
  })

  it('countVote return sameNumber', () => {
    propsData = {
      spot: {
        data: { id: 1 },
        power_withs: [{ id: 2 }],
        power_withouts: [{ id: 3 }]
      }
    }

    wrapper = shallowMount(Component, {
      localVue,
      propsData
    })

    expect(wrapper.vm.countVote).toEqual('sameNumber')
  })

  it('countVote return withsMany', () => {
    propsData = {
      spot: {
        data: { id: 1 },
        power_withs: [{ id: 2 }, { id: 3 }],
        power_withouts: [{ id: 4 }]
      }
    }

    wrapper = shallowMount(Component, {
      localVue,
      propsData
    })

    expect(wrapper.vm.countVote).toEqual('withsMany')
  })

  it('countVote return withoutsMany', () => {
    propsData = {
      spot: {
        data: { id: 1 },
        power_withs: [{ id: 2 }],
        power_withouts: [{ id: 3 }, { id: 4 }]
      }
    }

    wrapper = shallowMount(Component, {
      localVue,
      propsData
    })

    expect(wrapper.vm.countVote).toEqual('withoutsMany')
  })

  it('latestVote return withsNewer', () => {
    propsData = {
      spot: {
        data: { id: 1 },
        power_withs: [{ id: 2, created_at: '2020-12-31T00:00:00.000Z' }],
        power_withouts: [{ id: 3, created_at: '2020-12-01T00:00:00.000Z' }]
      }
    }

    wrapper = shallowMount(Component, {
      localVue,
      propsData
    })

    expect(wrapper.vm.latestVote).toEqual('withsNewer')
  })

  it('latestVote return withoutsNewer', () => {
    propsData = {
      spot: {
        data: { id: 1 },
        power_withs: [{ id: 2, created_at: '2020-12-01T00:00:00.000Z' }],
        power_withouts: [{ id: 3, created_at: '2020-12-31T00:00:00.000Z' }]
      }
    }

    wrapper = shallowMount(Component, {
      localVue,
      propsData
    })

    expect(wrapper.vm.latestVote).toEqual('withoutsNewer')
  })
})
