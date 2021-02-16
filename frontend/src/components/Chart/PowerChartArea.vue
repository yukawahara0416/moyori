<template>
  <v-card-actions class="card-action-container mx-2 pt-0">
    <chart-area
      :plugins="plugins"
      :styles="styles"
      :chartData="chartData"
      :options="options"
    />
  </v-card-actions>
</template>

<script>
import { Spot } from '@/class/Spot.js'
import { myPlugins, chartOptions } from '@/plugins/chart-area.js'
import min from 'lodash/min'
import ChartArea from '@/components/Chart/ChartArea.vue'

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
    ChartArea
  },

  data() {
    return {
      styles: {
        height: '150px',
        width: '90%'
      }
    }
  },

  computed: {
    withCount() {
      const target = this.spot.power_withs
      return target.length > 0 ? target.length : 0
    },

    withoutCount() {
      const target = this.spot.power_withouts
      return target.length > 0 ? target.length : 0
    },

    hasData() {
      return this.withCount + this.withoutCount > 0
    },

    plugins() {
      return myPlugins
    },

    options() {
      return chartOptions
    },

    chartData() {
      // データ形式を変換して時間で昇順に並べ替えます
      const firstDay = this.firstDay(this.spot)
      const withsData = this.convertChartData(this.spot.power_withs, firstDay)
      const withoutsData = this.convertChartData(
        this.spot.power_withouts,
        firstDay
      )

      return {
        datasets: [
          {
            label: 'あり',
            data: withsData,
            pointRadius: 2,
            borderWidth: 2,
            borderColor: '#4CAF4F',
            fill: false
          },
          {
            label: 'なし',
            data: withoutsData,
            pointRadius: 2,
            borderWidth: 2,
            borderColor: '#FF5252',
            fill: false
          }
        ]
      }
    }
  },

  methods: {
    // 最もむかしの投票日の１日前を返します（Chartの０点に設定するためです）
    firstDay(spot) {
      const arry = [...spot.power_withs, ...spot.power_withouts]
      const dates = []
      let firstDay = 0

      if (arry.length === 0) return firstDay

      for (let i = 0; i < arry.length; i++) {
        const date = new Date(arry[i].created_at)
        dates.push(date)
      }

      firstDay = min(dates)
      firstDay.setDate(firstDay.getDate() - 1)

      return firstDay.toISOString()
    },

    // 投票データをChart.js用に変換します
    convertChartData(target, firstDay) {
      const xyData = this.xyData(target)
      const sortedData = this.sortData(xyData, firstDay)
      const countedData = this.countData(sortedData)
      return countedData
    },

    // データ形式を { x: '時間', y: '投票総数' } に変換します
    xyData(target) {
      // グラフの0点に予めデータを配置します
      const arry = []

      for (let i = 0; i < target.length; i++) {
        const obj = { x: '', y: null }
        obj.x = target[i].created_at
        arry.push(obj)
      }

      return arry
    },

    // 時間を昇順で並べ替えます
    sortData(xyData, firstDay) {
      const arry = [...xyData]
      arry.unshift({ x: firstDay, y: null })

      arry.sort(function compare(a, b) {
        const dateA = new Date(a.x)
        const dateB = new Date(b.x)
        return dateA - dateB
      })

      return arry
    },

    // 投票総数を集計します
    countData(sortedData) {
      for (let i = 0; i < sortedData.length; i++) {
        sortedData[i].y = i
      }
      return sortedData
    }
  }
}
</script>

<style scoped>
.card-action-container {
  position: relative;
  width: 100%;
}
</style>
