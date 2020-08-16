<template>
  <v-expansion-panels accordion>
    <v-expansion-panel>
      <v-expansion-panel-header>
        <span>
          <v-icon>mdi-wifi</v-icon>
          Wifiサービス：
          <span class="ml-3">
            <v-icon v-if="analyzeVote == 'excellent'" color="success">
              mdi-circle-double
            </v-icon>
            <v-icon v-else-if="analyzeVote == 'good'" color="success">
              mdi-circle-outline
            </v-icon>
            <v-icon v-else-if="analyzeVote == 'fair'" color="primary">
              mdi-triangle-outline
            </v-icon>
            <v-icon v-else-if="analyzeVote == 'poor'" color="error">
              mdi-close
            </v-icon>
            <v-icon v-else>mdi-help</v-icon>
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
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  props: {
    spot: Object
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
