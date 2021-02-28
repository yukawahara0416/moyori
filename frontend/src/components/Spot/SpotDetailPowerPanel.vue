<template>
  <v-card flat outlined class="mb-2">
    <span v-for="(result, key) in results" :key="key">
      <span v-if="analyzeVote === result.name">
        <v-card-actions>
          <v-spacer />
          電源サービスの判定結果：
          <v-icon class="mx-3" :color="result.color">{{ result.icon }}</v-icon>

          <v-spacer />
        </v-card-actions>

        <v-card-actions class="pt-0">
          <v-spacer />

          <strong>
            {{ result.message }}
          </strong>

          <v-spacer />
        </v-card-actions>

        <power-chart-horizontal-bar :spot="spot" />

        <power-chart-area :spot="spot" />
      </span>
    </span>
  </v-card>
</template>

<script>
import { Spot } from '@/class/Spot.js'
import PowerChartHorizontalBar from '@/components/Chart/PowerChartHorizontalBar.vue'
import PowerChartArea from '@/components/Chart/PowerChartArea.vue'

export default {
  props: {
    spot: {
      type: Object,
      default: () => {
        return new Spot()
      },
      required: true
    }
  },

  components: {
    PowerChartHorizontalBar,
    PowerChartArea
  },

  data() {
    return {
      results: [
        {
          name: 'excellent',
          color: 'success',
          icon: 'mdi-circle-double',
          message: 'かなり期待できます^_^'
        },
        {
          name: 'good',
          color: 'success',
          icon: 'mdi-circle-outline',
          message: 'そこそこ期待できます^_^'
        },
        {
          name: 'fair',
          color: 'primary',
          icon: 'mdi-triangle-outline',
          message: 'もしかしたらなくなってるかも^^;'
        },
        {
          name: 'poor',
          color: 'error',
          icon: 'mdi-close',
          message: 'なくなってる可能性大です^^;'
        },
        {
          name: 'noVote',
          color: 'gray',
          icon: 'mdi-help',
          message: 'まだ投票されていません'
        }
      ]
    }
  },

  computed: {
    countVote() {
      const withs = this.spot.power_withs
      const withouts = this.spot.power_withouts

      // 1票も投票がない場合
      if (withs.length + withouts.length === 0) return 'noVote'
      // 票数がおなじ場合
      if (withs.length === withouts.length) return 'sameNumber'
      // 票数がちがう場合
      if (withs.length > withouts.length) return 'withsMany'
      return 'withoutsMany'
    },

    latestVote() {
      const withs = this.spot.power_withs
      const withouts = this.spot.power_withouts
      const latestWiths = Math.max.apply(null, this.pickupDate(withs))
      const latestWithouts = Math.max.apply(null, this.pickupDate(withouts))

      if (latestWiths > latestWithouts) return 'withsNewer'
      return 'withoutsNewer'
    },

    analyzeVote() {
      // 1票も投票がない場合
      if (this.countVote === 'noVote') return 'noVote'

      if (this.countVote === 'withsMany') {
        // withsの投票が多く、最新の投票がwithsなら「最も良い評価」
        if (this.latestVote === 'withsNewer') return 'excellent'
        // withsの投票が多く、最新の投票がwithoutsなら「まあまあの評価」
        if (this.latestVote === 'withoutsNewer') return 'good'
      }

      // withoutsの投票が多ければ、最新の投票がwithsでない限り「最低の評価」
      if (this.latestVote === 'withsNewer') return 'fair'
      return 'poor'
    }
  },

  methods: {
    pickupDate(target) {
      const result = []
      for (let i = 0; i < target.length; i++) {
        result.push(Date.parse(target[i].created_at))
      }
      return result
    }
  }
}
</script>

<style scoped>
strong {
  font-size: 0.9em;
}
</style>
