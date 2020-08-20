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
    sortChartData() {
      let arry = []

      for (let i = 0; i < this.withs.length; i++) {
        let daytime = this.withs[i].created_at
        let id = this.withs[i].id
        let object = { id: id, day: daytime, type: 'withs' }
        arry.push(object)
      }

      for (let i = 0; i < this.withouts.length; i++) {
        let daytime = this.withouts[i].created_at
        let id = this.withouts[i].id
        let object = { id: id, day: daytime, type: 'withouts' }
        arry.push(object)
      }

      arry.sort(function(a, b) {
        return a.day > b.day ? 1 : -1
      })

      for (let i = 0; i < arry.length; i++) {
        let daytime = arry[i].day
        let position = daytime.indexOf('T')
        let day = daytime.substring(0, position)
        arry[i].day = day
      }

      return arry
    },

    countChartData() {
      let chartData = [
        ['Year', 'あり', 'なし'],
        ['', 0, 0]
      ]
      let withs = 0
      let withouts = 0
      for (let i = 0; i < this.sortChartData.length; i++) {
        let data = ['', 0, 0]
        let day = this.sortChartData[i].day
        data[0] = this.sortChartData[i].day
        if (this.sortChartData[i].type == 'withs') {
          withs += 1
          chartData.push([day, withs, withouts])
        } else {
          withouts += 1
          chartData.push([day, withs, withouts])
        }
      }

      let values = []
      return chartData
        .reverse()
        .filter(value => {
          if (values.indexOf(value[0]) === -1) {
            values.push(value[0])
            return value
          }
        })
        .reverse()
    }
  }
}
</script>
