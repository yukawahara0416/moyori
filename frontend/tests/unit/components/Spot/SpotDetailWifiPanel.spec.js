import { shallowMount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Spot/SpotDetailWifiPanel.vue'

const localVue = createLocalVue()

let wrapper
let propsData

beforeEach(() => {
  propsData = {
    spot: {
      data: { id: 1 },
      wifi_withs: [{ id: 2 }, { id: 3 }],
      wifi_withouts: [{ id: 4 }, { id: 5 }]
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
        wifi_withs: [],
        wifi_withouts: []
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
        wifi_withs: [{ id: 2 }],
        wifi_withouts: [{ id: 3 }]
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
        wifi_withs: [{ id: 2 }, { id: 3 }],
        wifi_withouts: [{ id: 4 }]
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
        wifi_withs: [{ id: 2 }],
        wifi_withouts: [{ id: 3 }, { id: 4 }]
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
        wifi_withs: [{ id: 2, created_at: '2020-12-31T00:00:00.000Z' }],
        wifi_withouts: [{ id: 3, created_at: '2020-12-01T00:00:00.000Z' }]
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
        wifi_withs: [{ id: 2, created_at: '2020-12-01T00:00:00.000Z' }],
        wifi_withouts: [{ id: 3, created_at: '2020-12-31T00:00:00.000Z' }]
      }
    }

    wrapper = shallowMount(Component, {
      localVue,
      propsData
    })

    expect(wrapper.vm.latestVote).toEqual('withoutsNewer')
  })

  it('analyzeVote return noVote', () => {
    propsData = {
      spot: {
        data: { id: 1 },
        wifi_withs: [],
        wifi_withouts: []
      }
    }

    wrapper = shallowMount(Component, {
      localVue,
      propsData
    })

    expect(wrapper.vm.analyzeVote).toEqual('noVote')
    expect(wrapper.find('v-icon-stub').text()).toEqual('mdi-help')
    expect(wrapper.find('strong').text()).toEqual('まだ投票されていません')
    expect(wrapper.vm.$el).toMatchSnapshot()
  })

  it('analyzeVote return excellent', () => {
    propsData = {
      spot: {
        data: { id: 1 },
        wifi_withs: [
          { id: 2, created_at: '2020-12-01T00:00:00.000Z' },
          { id: 3, created_at: '2020-12-31T00:00:00.000Z' }
        ],
        wifi_withouts: [{ id: 4, created_at: '2020-12-01T00:00:00.000Z' }]
      }
    }

    wrapper = shallowMount(Component, {
      localVue,
      propsData
    })

    expect(wrapper.vm.analyzeVote).toEqual('excellent')
    expect(wrapper.find('v-icon-stub').text()).toEqual('mdi-circle-double')
    expect(wrapper.find('strong').text()).toEqual('かなり期待できます^_^')
    expect(wrapper.vm.$el).toMatchSnapshot()
  })

  it('analyzeVote return good', () => {
    propsData = {
      spot: {
        data: { id: 1 },
        wifi_withs: [
          { id: 2, created_at: '2020-12-01T00:00:00.000Z' },
          { id: 3, created_at: '2020-12-01T00:00:00.000Z' }
        ],
        wifi_withouts: [{ id: 4, created_at: '2020-12-31T00:00:00.000Z' }]
      }
    }

    wrapper = shallowMount(Component, {
      localVue,
      propsData
    })

    expect(wrapper.vm.analyzeVote).toEqual('good')
    expect(wrapper.find('v-icon-stub').text()).toEqual('mdi-circle-outline')
    expect(wrapper.find('strong').text()).toEqual('そこそこ期待できます^_^')
    expect(wrapper.vm.$el).toMatchSnapshot()
  })

  it('analyzeVote return fair', () => {
    propsData = {
      spot: {
        data: { id: 1 },
        wifi_withs: [{ id: 2, created_at: '2020-12-31T00:00:00.000Z' }],
        wifi_withouts: [
          { id: 3, created_at: '2020-12-01T00:00:00.000Z' },
          { id: 4, created_at: '2020-12-01T00:00:00.000Z' }
        ]
      }
    }

    wrapper = shallowMount(Component, {
      localVue,
      propsData
    })

    expect(wrapper.vm.analyzeVote).toEqual('fair')
    expect(wrapper.find('v-icon-stub').text()).toEqual('mdi-triangle-outline')
    expect(wrapper.find('strong').text()).toEqual(
      'もしかしたらなくなってるかも^^;'
    )
    expect(wrapper.vm.$el).toMatchSnapshot()
  })

  it('analyzeVote return poor', () => {
    propsData = {
      spot: {
        data: { id: 1 },
        wifi_withs: [{ id: 2, created_at: '2020-12-01T00:00:00.000Z' }],
        wifi_withouts: [
          { id: 3, created_at: '2020-12-31T00:00:00.000Z' },
          { id: 4, created_at: '2020-12-31T00:00:00.000Z' }
        ]
      }
    }

    wrapper = shallowMount(Component, {
      localVue,
      propsData
    })

    expect(wrapper.vm.analyzeVote).toEqual('poor')
    expect(wrapper.find('v-icon-stub').text()).toEqual('mdi-close')
    expect(wrapper.find('strong').text()).toEqual('なくなってる可能性大です^^;')
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})

describe('methods', () => {
  it('pickupDate', () => {
    propsData = {
      spot: {
        data: { id: 1 },
        wifi_withs: [{ id: 2, created_at: '2020-12-01T00:00:00.000Z' }],
        wifi_withouts: [
          { id: 3, created_at: '2020-12-31T00:00:00.000Z' },
          { id: 4, created_at: '2020-12-31T00:00:00.000Z' }
        ]
      }
    }

    wrapper = shallowMount(Component, {
      localVue,
      propsData
    })

    const result = wrapper.vm.pickupDate(propsData.spot.wifi_withs)
    expect(result).toMatchObject([1606780800000])
  })
})

describe('template', () => {
  it('wifi-chart-horizontal-bar has :spot', () => {
    expect(
      wrapper.find('wifi-chart-horizontal-bar-stub').attributes().spot
    ).toEqual('[object Object]')
  })

  it('wifi-chart-area has :spot', () => {
    expect(wrapper.find('wifi-chart-area-stub').attributes().spot).toEqual(
      '[object Object]'
    )
  })

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
