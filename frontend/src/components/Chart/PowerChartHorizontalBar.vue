<template>
  <v-card-actions class="card-action-container pt-0">
    <v-spacer />
    <power-with-button :spot="spot" />
    <chart-bar
      :plugins="plugins"
      :styles="styles"
      :chartData="chartData"
      :options="options"
    />
    <power-without-button :spot="spot" />
    <v-spacer />
  </v-card-actions>
</template>

<script>
import PowerWithButton from '@/components/Buttons/PowerWithButton.vue'
import PowerWithoutButton from '@/components/Buttons/PowerWithoutButton.vue'
import ChartBar from '@/components/Chart/ChartBar.vue'
import { myPlugins, chartOptions } from '@/plugins/chart-bar.js'

export default {
  props: {
    spot: Object
  },

  components: {
    PowerWithButton,
    PowerWithoutButton,
    ChartBar
  },

  data() {
    return {
      styles: {
        height: '36px',
        width: '60%'
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
      return {
        labels: [''],
        datasets: [
          {
            label: 'あり',
            data: this.hasData ? [this.withCount] : [1],
            datalabels: {
              color: 'white',
              display: this.hasData && this.withCount !== 0 ? true : false
            },
            backgroundColor: this.hasData ? '#4CAF4F' : '#CBCBCB',
            barThickness: 20
          },
          {
            label: 'なし',
            data: this.hasData ? [this.withoutCount] : [1],
            datalabels: {
              color: 'white',
              display: this.hasData && this.withoutCount !== 0 ? true : false
            },
            backgroundColor: this.hasData ? '#FF5252' : '#CBCBCB',
            barThickness: 20
          }
        ]
      }
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
