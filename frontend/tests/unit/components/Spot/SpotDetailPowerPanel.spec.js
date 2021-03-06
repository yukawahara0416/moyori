import { shallowMount, createLocalVue } from '@vue/test-utils'
import { Spot } from '@/class/Spot.js'
import Component from '@/components/Spot/SpotDetailPowerPanel.vue'
import PowerChartHorizontalBar from '@/components/Chart/PowerChartHorizontalBar.vue'
import PowerChartArea from '@/components/Chart/PowerChartArea.vue'

const localVue = createLocalVue()

let wrapper
let propsData

const noVote = {
  data: { id: 1 },
  power_withs: [],
  power_withouts: []
}

const sameNumber = {
  data: { id: 1 },
  power_withs: [{ id: 2 }],
  power_withouts: [{ id: 3 }]
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
    expect(wrapper.vm.$props.spot instanceof Object).toBeTruthy()
    expect(wrapper.vm.$options.props.spot.required).toBeTruthy()
  })
})

describe('computed', () => {
  describe('countVote', () => {
    const withsMany = {
      data: { id: 1 },
      power_withs: [{ id: 2 }],
      power_withouts: []
    }

    const withoutsMany = {
      data: { id: 1 },
      power_withs: [],
      power_withouts: [{ id: 2 }]
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
      power_withs: [{ id: 2, created_at: '2020-12-31T00:00:00.000Z' }],
      power_withouts: [{ id: 3, created_at: '2020-12-01T00:00:00.000Z' }]
    }

    const withoutsNewer = {
      data: { id: 1 },
      power_withs: [{ id: 2, created_at: '2020-12-01T00:00:00.000Z' }],
      power_withouts: [{ id: 3, created_at: '2020-12-31T00:00:00.000Z' }]
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
    // withsの投票が多く、最新の投票がwithsなら「最も良い評価」
    const excellent = {
      data: { id: 1 },
      power_withs: [
        { id: 2, created_at: '2020-12-01T00:00:00.000Z' },
        { id: 3, created_at: '2020-12-31T00:00:00.000Z' }
      ],
      power_withouts: [{ id: 4, created_at: '2020-12-01T00:00:00.000Z' }]
    }

    // withsの投票が多く、最新の投票がwithoutsなら「まあまあの評価」
    const good = {
      data: { id: 1 },
      power_withs: [
        { id: 2, created_at: '2020-12-01T00:00:00.000Z' },
        { id: 3, created_at: '2020-12-01T00:00:00.000Z' }
      ],
      power_withouts: [{ id: 4, created_at: '2020-12-31T00:00:00.000Z' }]
    }

    // withoutsの投票が多く、最新の投票がwithsなら「悪い評価」
    const fair = {
      data: { id: 1 },
      power_withs: [{ id: 2, created_at: '2020-12-31T00:00:00.000Z' }],
      power_withouts: [
        { id: 3, created_at: '2020-12-01T00:00:00.000Z' },
        { id: 4, created_at: '2020-12-01T00:00:00.000Z' }
      ]
    }

    // withoutsの投票が多く、最新の投票がwithoutsなら「最も悪い評価」
    const poor = {
      data: { id: 1 },
      power_withs: [{ id: 2, created_at: '2020-12-01T00:00:00.000Z' }],
      power_withouts: [
        { id: 3, created_at: '2020-12-31T00:00:00.000Z' },
        { id: 4, created_at: '2020-12-31T00:00:00.000Z' }
      ]
    }

    it('analyzeVote return noVote', async () => {
      await wrapper.setProps({ spot: new Spot(noVote) })

      expect(wrapper.vm.analyzeVote).toEqual('noVote')
      expect(wrapper.find('v-icon-stub').text()).toEqual('mdi-help')
      expect(wrapper.find('strong').text()).toEqual('まだ投票されていません')
    })

    it('analyzeVote return excellent', async () => {
      await wrapper.setProps({ spot: new Spot(excellent) })

      expect(wrapper.vm.analyzeVote).toEqual('excellent')
      expect(wrapper.find('v-icon-stub').text()).toEqual('mdi-circle-double')
      expect(wrapper.find('strong').text()).toEqual('かなり期待できます^_^')
    })

    it('analyzeVote return good', async () => {
      await wrapper.setProps({ spot: new Spot(good) })

      expect(wrapper.vm.analyzeVote).toEqual('good')
      expect(wrapper.find('v-icon-stub').text()).toEqual('mdi-circle-outline')
      expect(wrapper.find('strong').text()).toEqual('そこそこ期待できます^_^')
    })

    it('analyzeVote return fair', async () => {
      await wrapper.setProps({ spot: new Spot(fair) })

      expect(wrapper.vm.analyzeVote).toEqual('fair')
      expect(wrapper.find('v-icon-stub').text()).toEqual('mdi-triangle-outline')
      expect(wrapper.find('strong').text()).toEqual(
        'もしかしたらなくなってるかも^^;'
      )
    })

    it('analyzeVote return poor', async () => {
      await wrapper.setProps({ spot: new Spot(poor) })

      expect(wrapper.vm.analyzeVote).toEqual('poor')
      expect(wrapper.find('v-icon-stub').text()).toEqual('mdi-close')
      expect(wrapper.find('strong').text()).toEqual(
        'なくなってる可能性大です^^;'
      )
    })

    describe('methods', () => {
      it('pickupDate', async () => {
        await wrapper.setProps({ spot: new Spot(poor) })

        const result = wrapper.vm.pickupDate(wrapper.vm.$props.spot.power_withs)
        expect(result).toMatchObject([1606780800000])
      })
    })
  })
})

describe('template', () => {
  it('PowerChartHorizontalBar has :spot', () => {
    expect(wrapper.find(PowerChartHorizontalBar).props().spot).toEqual(
      wrapper.vm.$props.spot
    )
  })

  it('PowerChartArea has :spot', () => {
    expect(wrapper.find(PowerChartArea).props().spot).toEqual(
      wrapper.vm.$props.spot
    )
  })

  it('snapshot', () => {
    expect(wrapper.vm.$el).toMatchSnapshot()
  })
})
