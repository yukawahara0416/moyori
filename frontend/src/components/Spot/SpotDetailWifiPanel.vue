<template>
  <v-card flat outlined class="mb-2">
    <v-expansion-panels flat focusable accordion hover>
      <v-expansion-panel>
        <v-expansion-panel-header>
          <span>
            <v-icon>mdi-wifi</v-icon>
            Wifiサービス：
            <span class="ml-3">
              <span v-if="analyzeVote == 'excellent'">
                <v-icon class="mr-3" color="success">
                  mdi-circle-double
                </v-icon>
                <span>（かなり期待できます^_^）</span>
              </span>
              <span v-else-if="analyzeVote == 'good'">
                <v-icon class="mr-3" color="success">
                  mdi-circle-outline
                </v-icon>
                <span>（そこそこ期待できます^_^）</span>
              </span>
              <span v-else-if="analyzeVote == 'fair'">
                <v-icon class="mr-3" color="primary">
                  mdi-triangle-outline
                </v-icon>
                <span>（もしかしたらなくなってるかも^^;）</span>
              </span>
              <span v-else-if="analyzeVote == 'poor'">
                <v-icon class="mr-3" color="error">
                  mdi-close
                </v-icon>
                <span>（なくなってる可能性大です^^;）</span>
              </span>
              <span v-else>
                <v-icon class="mr-3">mdi-help</v-icon>
                <span>（まだ投票されていません）</span>
              </span>
            </span>
          </span>
        </v-expansion-panel-header>

        <v-expansion-panel-content>
          <p class="ml-3" v-if="compareVote == 'noVote'">
            まだ投票されていません。
          </p>

          <p class="ml-3" v-else-if="compareVote == 'draw'">
            「
            <v-icon class="mr-1" color="success">mdi-wifi</v-icon>
            Wifiあるよ」「
            <v-icon class="mr-1" color="error">mdi-wifi-off</v-icon>
            Wifiないよ」の投票数はおなじです。
            <br />
            直近の投票は「
            <v-icon class="mr-1" :color="latestVote ? 'success' : 'error'">
              {{ latestVote ? 'mdi-wifi' : 'mdi-wifi-off' }}
            </v-icon>
            <span>{{ latestVote ? 'Wifiあるよ' : 'Wifiないよ' }}</span>
            」です。
          </p>

          <p class="ml-3" v-else>
            投票数が多いのは「
            <span v-if="compareVote == 'withs'">
              <v-icon class="mr-1" color="success">
                mdi-wifi
              </v-icon>
              <span>Wifiあるよ</span>
            </span>
            <span v-else-if="compareVote == 'withouts'">
              <v-icon class="mr-1" color="error">
                mdi-wifi-off
              </v-icon>
              <span>Wifiないよ</span>
            </span>
            <span v-else />
            」です。
            <br />
            直近の投票は「
            <v-icon class="mr-1" :color="latestVote ? 'success' : 'error'">
              {{ latestVote ? 'mdi-wifi' : 'mdi-wifi-off' }}
            </v-icon>
            <span>{{ latestVote ? 'Wifiあるよ' : 'Wifiないよ' }}</span>
            」です。
          </p>

          <google-chart-bar-chart
            v-if="
              spot.wifi_withs.length !== 0 || spot.wifi_withouts.length !== 0
            "
            :withs="spot.wifi_withs"
            :withouts="spot.wifi_withouts"
          />
          <google-chart-area-chart
            v-if="
              spot.wifi_withs.length !== 0 || spot.wifi_withouts.length !== 0
            "
            :withs="spot.wifi_withs"
            :withouts="spot.wifi_withouts"
          />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script>
import GoogleChartBarChart from '@/components/Chart/GoogleChartBarChart.vue'
import GoogleChartAreaChart from '@/components/Chart/GoogleChartAreaChart.vue'

export default {
  props: {
    spot: Object
  },

  components: {
    GoogleChartBarChart,
    GoogleChartAreaChart
  },

  computed: {
    compareVote() {
      if (
        this.spot.wifi_withs.length == 0 &&
        this.spot.wifi_withouts.length == 0
      ) {
        return 'noVote'
      } else if (
        this.spot.wifi_withs.length == this.spot.wifi_withouts.length
      ) {
        return 'draw'
      } else {
        if (this.spot.wifi_withs.length > this.spot.wifi_withouts.length) {
          return 'withs'
        } else {
          return 'withouts'
        }
      }
    },

    latestVote() {
      let wifiWiths = []
      for (let i = 0; i < this.spot.wifi_withs.length; i++) {
        wifiWiths.push(Date.parse(this.spot.wifi_withs[i].created_at))
      }

      let wifiWithouts = []
      for (let i = 0; i < this.spot.wifi_withouts.length; i++) {
        wifiWithouts.push(Date.parse(this.spot.wifi_withouts[i].created_at))
      }

      const latestWifiWiths = Math.max.apply(null, wifiWiths)
      const latestWifiWithouts = Math.max.apply(null, wifiWithouts)
      return latestWifiWiths > latestWifiWithouts ? true : false
    },

    analyzeVote() {
      if (this.compareVote == 'withs') {
        if (this.latestVote) {
          return 'excellent'
        } else {
          return 'good'
        }
      } else if (this.compareVote == 'withouts') {
        if (this.latestVote) {
          return 'fair'
        } else {
          return 'poor'
        }
      } else if (this.compareVote == 'draw') {
        if (this.latestVote) {
          return 'fair'
        } else {
          return 'poor'
        }
      } else if (this.compareVote == 'noVote') {
        return 'noVote'
      } else {
        return ''
      }
    }
  }
}
</script>
