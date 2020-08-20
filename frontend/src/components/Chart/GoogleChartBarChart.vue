<template>
  <GChart type="BarChart" :data="countChartData" :options="chartOptions" />
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
        title: '投票数の比較',
        colors: ['4BAF4F', 'FF5251'],
        isStacked: 'percent'
      }
    }
  },

  computed: {
    countChartData() {
      let chartData = [['Year', 'あり', 'なし']]
      let day = ''
      let withs = this.withs.length
      let withouts = this.withouts.length
      chartData.push([day, withs, withouts])

      return chartData
    }
  }
}
</script>
