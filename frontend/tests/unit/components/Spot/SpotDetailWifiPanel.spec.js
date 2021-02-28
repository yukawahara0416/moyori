import { shallowMount, createLocalVue } from '@vue/test-utils'
import { Spot } from '@/class/Spot.js'
import Component from '@/components/Spot/SpotDetailWifiPanel.vue'
import WifiChartHorizontalBar from '@/components/Chart/WifiChartHorizontalBar.vue'
import WifiChartArea from '@/components/Chart/WifiChartArea.vue'

const localVue = createLocalVue()

let wrapper
let propsData

const noVote = {
  data: { id: 1 },
  wifi_withs: [],
  wifi_withouts: []
}

const sameNumber = {
  data: { id: 1 },
  wifi_withs: [{ id: 2 }],
  wifi_withouts: [{ id: 3 }]
}

beforeEach(() => {
  propsData = {
    spot: new Spot(sameNumber)
  }

  wrapper = shallowMount(Component, {
    localVue,
    propsData
  })
})

describe('props', () => {
  it('spot', () => {
    expect(wrapper.vm.$props.spot).toStrictEqual(propsData.spot)
    expect(wrapper.vm.$props.spot instanceof Spot).toBeTruthy()
    expect(wrapper.vm.$options.props.spot.required).toBeTruthy()
  })
})

describe('computed', () => {
  describe('countVote', () => {
    const withsMany = {
      data: { id: 1 },
      wifi_withs: [{ id: 2 }],
      wifi_withouts: []
    }

    const withoutsMany = {
      data: { id: 1 },
      wifi_withs: [],
      wifi_withouts: [{ id: 2 }]
    }

    it('countVote return noVote', async () => {
      await wrapper.setProps({ spot: new Spot(noVote) })
      expect(wrapper.vm.countVote).toEqual('noVote')
    })

    it('countVote return sameNumber', async () => {
      await wrapper.setProps({ spot: new Spot(sameNumber) })
      expect(wrapper.vm.countVote).toEqual('sameNumber')
    })

    it('countVote return withsMany', async () => {
      await wrapper.setProps({ spot: new Spot(withsMany) })
      expect(wrapper.vm.countVote).toEqual('withsMany')
    })

    it('countVote return withoutsMany', async () => {
      await wrapper.setProps({ spot: new Spot(withoutsMany) })
      expect(wrapper.vm.countVote).toEqual('withoutsMany')
    })
  })

  describe('latestVote', () => {
    const withsNewer = {
      data: { id: 1 },
      wifi_withs: [{ id: 2, created_at: '2020-12-31T00:00:00.000Z' }],
      wifi_withouts: [{ id: 3, created_at: '2020-12-01T00:00:00.000Z' }]
    }

    const withoutsNewer = {
      data: { id: 1 },
      wifi_withs: [{ id: 2, created_at: '2020-12-01T00:00:00.000Z' }],
      wifi_withouts: [{ id: 3, created_at: '2020-12-31T00:00:00.000Z' }]
    }

    it('latestVote return withsNewer', async () => {
      await wrapper.setProps({ spot: new Spot(withsNewer) })
      expect(wrapper.vm.latestVote).toEqual('withsNewer')
    })

    it('latestVote return withoutsNewer', async () => {
      await wrapper.setProps({ spot: new Spot(withoutsNewer) })
      expect(wrapper.vm.latestVote).toEqual('withoutsNewer')
    })
  })

  describe('analyzeVote', () => {
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
      expect(wrapper.find('strong').text()).toEqual(
        'なくなってる可能性大です^^;'
      )
      expect(wrapper.vm.$el).toMatchSnapshot()
    })
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
  it('WifiChartHorizontalBar has :spot', () => {
    expect(wrapper.find(WifiChartHorizontalBar).props().spot).toEqual(
      wrapper.vm.$props.spot
    )
  })

  it('WifiChartArea has :spot', () => {
    expect(wrapper.find(WifiChartArea).props().spot).toEqual(
      wrapper.vm.$props.spot
    )
  })

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
