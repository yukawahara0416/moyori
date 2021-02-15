<template>
  <div>
    <v-card-actions class="pb-0">
      <v-spacer />
      <span>WiFiはありますか？</span>
      <v-spacer />
    </v-card-actions>

    <wifi-chart-horizontal-bar :spot="spot" />

    <v-card-actions class="py-0">
      <v-spacer />
      <span>充電はできますか？</span>
      <v-spacer />
    </v-card-actions>

    <power-chart-horizontal-bar :spot="spot" />

    <v-card-actions>
      <v-spacer />
      <spot-detail-show-button :spot="spot" />
      <v-spacer />
    </v-card-actions>
  </div>
</template>

<script>
import { Spot } from '@/class/Spot.js'
import WifiChartHorizontalBar from '@/components/Chart/WifiChartHorizontalBar.vue'
import PowerChartHorizontalBar from '@/components/Chart/PowerChartHorizontalBar.vue'
import SpotDetailShowButton from '@/components/Buttons/SpotDetailShowButton.vue'

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
    WifiChartHorizontalBar,
    PowerChartHorizontalBar,
    SpotDetailShowButton
  }
}
</script>

<style scoped>
span {
  font-size: 0.8em;
}
</style>
