<script>
import { HorizontalBar, mixins } from 'vue-chartjs'

export default {
  extends: HorizontalBar,
  mixins: [mixins.reactiveProp],
  props: {
    options: Object
  },

  mounted() {
    this.renderChart(this.chartData, this.options)
  }
}
</script>
