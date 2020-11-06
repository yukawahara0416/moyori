<template>
  <span>
    <GChart type="AreaChart" :data="countChartData" :options="chartOptions" />
  </span>
</template>

<script>
import { GChart } from 'vue-google-charts'

export default {
  props: {
    withs: Array,
    withouts: Array
  },

  components: {
    GChart
  },

  data() {
    return {
      chartOptions: {
        title: '投票数の推移',
        colors: ['4BAF4F', 'FF5251']
      }
    }
  },

  computed: {
    countChartData() {
      const chartData = [
        ['Year', 'あり', 'なし'],
        ['', 0, 0]
      ]

      let withsCount = 0
      let withoutsCount = 0

      for (let i = 0; i < this.sortChartData.length; i++) {
        let day = this.sortChartData[i].day
        if (this.sortChartData[i].type == 'withs') {
          withsCount += 1
        } else {
          withoutsCount += 1
        }
        chartData.push([day, withsCount, withoutsCount])
      }

      return chartData
    },

    sortChartData() {
      const arry = []

      if (this.withs.length > 0)
        Array.prototype.push.apply(arry, this.withsChartData)

      if (this.withouts.length > 0)
        Array.prototype.push.apply(arry, this.withoutsChartData)

      if (arry.length > 0)
        arry.sort(function(a, b) {
          return a.daytime > b.daytime ? 1 : -1
        })

      return arry
    },

    withsChartData() {
      const arry = []

      for (let i = 0; i < this.withs.length; i++) {
        const chartData = {
          type: 'withs',
          id: this.withs[i].id,
          daytime: this.withs[i].created_at,
          day: this.removeTimeFromDaytime(this.withs[i].created_at)
        }
        arry.push(chartData)
      }

      return arry
    },

    withoutsChartData() {
      const arry = []

      for (let i = 0; i < this.withouts.length; i++) {
        const chartData = {
          type: 'withouts',
          id: this.withouts[i].id,
          daytime: this.withouts[i].created_at,
          day: this.removeTimeFromDaytime(this.withouts[i].created_at)
        }
        arry.push(chartData)
      }

      return arry
    },

    removeTimeFromDaytime() {
      return function(daytime) {
        const indexEnd = daytime.indexOf('T')
        return daytime.substring(0, indexEnd)
      }
    }
  }
}
</script>
