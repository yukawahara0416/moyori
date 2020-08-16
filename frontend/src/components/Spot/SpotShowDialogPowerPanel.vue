<template>
  <v-expansion-panels accordion>
    <v-expansion-panel>
      <v-expansion-panel-header>
        <span>
          <v-icon>mdi-power-plug</v-icon>
          電源サービス：
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
          <v-icon class="mr-1" color="success">mdi-power-plug</v-icon>
          電源あるよ」「
          <v-icon class="mr-1" color="error">mdi-power-plug-off</v-icon>
          電源ないよ」の投票数はおなじです。
          <br />
          直近の投票は「
          <v-icon class="mr-1" :color="latestVote ? 'success' : 'error'">
            {{ latestVote ? 'mdi-power-plug' : 'mdi-power-plug-off' }}
          </v-icon>
          <span>{{ latestVote ? '電源あるよ' : '電源ないよ' }}</span>
          」です。
        </p>

        <p class="ml-3" v-else>
          投票数が多いのは「
          <span v-if="compareVote == 'withs'">
            <v-icon class="mr-1" color="success">
              mdi-power-plug
            </v-icon>
            <span>電源あるよ</span>
          </span>
          <span v-else-if="compareVote == 'withouts'">
            <v-icon class="mr-1" color="error">
              mdi-power-plug-off
            </v-icon>
            <span>電源ないよ</span>
          </span>
          <span v-else />
          」です。
          <br />
          直近の投票は「
          <v-icon class="mr-1" :color="latestVote ? 'success' : 'error'">
            {{ latestVote ? 'mdi-power-plug' : 'mdi-power-plug-off' }}
          </v-icon>
          <span>{{ latestVote ? '電源あるよ' : '電源ないよ' }}</span>
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
        this.spot.power_withs.length == 0 &&
        this.spot.power_withouts.length == 0
      ) {
        return 'noVote'
      } else if (
        this.spot.power_withs.length == this.spot.power_withouts.length
      ) {
        return 'draw'
      } else {
        if (this.spot.power_withs.length > this.spot.power_withouts.length) {
          return 'withs'
        } else {
          return 'withouts'
        }
      }
    },

    latestVote() {
      let powerWiths = []
      for (let i = 0; i < this.spot.power_withs.length; i++) {
        powerWiths.push(Date.parse(this.spot.power_withs[i].created_at))
      }

      let powerWithouts = []
      for (let i = 0; i < this.spot.power_withouts.length; i++) {
        powerWithouts.push(Date.parse(this.spot.power_withouts[i].created_at))
      }

      const latestPowerWiths = Math.max.apply(null, powerWiths)
      const latestPowerWithouts = Math.max.apply(null, powerWithouts)
      return latestPowerWiths > latestPowerWithouts ? true : false
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
      } else {
        return 'noVote'
      }
    }
  }
}
</script>
