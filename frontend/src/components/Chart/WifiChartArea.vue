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
import ChartArea from '@/components/Chart/ChartArea.vue'
import { myPlugins, chartOptions } from '@/plugins/chart-area.js'

export default {
  props: {
    spot: Object
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
      const target = this.spot.wifi_withs
      return target.length > 0 ? target.length : 0
    },

    withoutCount() {
      const target = this.spot.wifi_withouts
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

    // removeTimeFromDaytime() {
    //   return function(daytime) {
    //     const indexEnd = daytime.indexOf('T')
    //     return daytime.substring(0, indexEnd)
    //   }
    // },

    chartData() {
      // データ形式を変換して時間で昇順に並べ替えます
      const withsData = this.convertChartData(this.spot.wifi_withs)
      const withoutsData = this.convertChartData(this.spot.wifi_withouts)

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
    firstDay(spot) {
      const arry = [...spot.wifi_withs, ...spot.wifi_withouts]
    },
      const xyData = this.xyData(target)
      const sortedData = this.sortData(xyData)
      return sortedData
    },

    // データ形式を { x: '時間', y: 投票総数 } に変換します
    xyData(target) {
      // グラフの0点に予めデータを配置します
      const arry = [{ x: 0, y: 0 }]

      for (let i = 0; i < target.length; i++) {
        const obj = { x: '', y: null }
        obj.x = target[i].created_at
        obj.y = i + 1
        arry.push(obj)
      }

      return arry
    },

    // 時間を昇順で並べ替えます
    sortData(xyData) {
      const arry = [...xyData]

      arry.sort(function compare(a, b) {
        const dateA = new Date(a.created_at)
        const dateB = new Date(b.created_at)
        return dateA - dateB
      })

      return arry
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
